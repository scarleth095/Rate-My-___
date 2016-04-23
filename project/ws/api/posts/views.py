import logging

from flask import jsonify, request
from flask_restful import Resource
import api.exceptions as exceptions
from api.posts.fields import PostSchema, PostSearchSchema, PostRequest, RatingRequest, RatingSchema, CommentRequest, CommentSchema, SearchRequest
from api.posts.models import Post, Tag, Rating
from api.users.models import User
from api.users.auth import Auth
from api.users.fields import PublicUserSchema

logger = logging.getLogger('ws_python')


class PostEP(Resource):
    def __init__(self):
        self.post_schema = PostSchema()
        self.post_request = PostRequest()
        self.user_schema = PublicUserSchema()
        super(PostEP, self).__init__()

    @Auth.authentication_required()
    def patch(self, id):
        args = self.post_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        try:
            post_object = Post.objects.get(pid=id)
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        post_object.update(title=args.data['title'])
        post_object.update(description=args.data['description'])
        post_object.update(tags=[Tag.get_or_create(tag['text']) for tag in args.data['tags']])
        post_object.update(url=args.data['url'])
        post_object.save()
        post_object.reload()

        response_post = self.post_schema.dump(post_object)
        return jsonify({"post": response_post.data})

    @Auth.authentication_required()
    def get(self, id):
        try:
            post_object = Post.objects.get(pid=id)
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        response_post = self.post_schema.dump(post_object)
        response_rating = post_object.get_rating()
        return jsonify({"post": response_post.data, "rating": response_rating})

    @Auth.authentication_required()
    def delete(self, id):
        try:
            post_object = Post.objects.get(pid=id)
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        post_object.delete()
        return jsonify({})


class PostsEP(Resource):
    def __init__(self):
        self.post_schema = PostSchema()
        self.post_search_schema = PostSearchSchema(many=True)
        self.post_request = PostRequest()
        self.user_schema = PublicUserSchema()
        self.search_request = SearchRequest()
        self.items_per_page = 6
        super(PostsEP, self).__init__()

    @Auth.authentication_required()
    def post(self):
        args = self.post_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        uid = request.headers['UID']
        try:
            user_object = User.objects.get(uid=uid)
        except User.DoesNotExist:
            raise exceptions.UserDoesNotExist("User Does Not Exist")
        if "url" in args.data:
            post_object = Post.objects.create(
                    user=user_object,
                    title=args.data['title'],
                    url=args.data['url'],
                    description=args.data['description'],
                    tags=[Tag.get_or_create(tag['text']) for tag in args.data['tags']]
                )
        else:
            post_object = Post.objects.create(
                            user=user_object,
                            title=args.data['title'],
                            description=args.data['description'],
                            tags=[Tag.get_or_create(tag['text']) for tag in args.data['tags']]
                        )
        response_post = self.post_schema.dump(post_object)
        return jsonify({"post": response_post.data})

    @Auth.authentication_required()
    def get(self):
        args = self.search_request.load(request.args)
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        if "search_field" in args.data:
            search_text = args.data['search_field']
            search_result = Post.objects.search_text(search_text).order_by('$weights')
            offset = (args.data['page'] - 1) * self.items_per_page
            paginate_search_results = search_result.skip(offset).limit(self.items_per_page)
            response_posts = self.post_search_schema.dump(paginate_search_results)
            return jsonify({"posts": response_posts})
        else:
            offset = (args.data['page'] - 1) * self.items_per_page
            paginate_search_results = Post.objects.order_by('-created').skip(offset).limit(self.items_per_page)
            response_posts = self.post_search_schema.dump(paginate_search_results)
            return jsonify({"posts": response_posts})



class RatingEP(Resource):
    def __init__(self):
        self.rating_request = RatingRequest()
        self.rating_schema = RatingSchema()
        super(RatingEP, self).__init__()

    def post(self):
        args = self.rating_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        try:
            post_object = Post.objects.get(pid=args.data['pid'])
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        uid = request.headers['UID']
        rating = post_object.ratings.filter(uid=uid)
        logger.debug(rating.count())
        if rating.count() == 0:
            rating = post_object.ratings.create(uid=uid, pid=args.data['pid'], rating=args.data['rating'])
        else:
            rating.update(rating=args.data['rating'])
            rating.save()
            rating = rating[0]
        post_object.save()
        response_my_rating = self.rating_schema.dump(rating)
        response_post_rating = post_object.get_rating()
        return jsonify({"my_rating": response_my_rating.data, "post_rating": response_post_rating})

    def get(self):
        args = self.rating_request.load(request.args)
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        try:
            post_object = Post.objects.get(pid=args.data['pid'])
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        uid = request.headers['UID']
        rating = post_object.ratings.filter(uid=uid)
        logger.debug(rating.count())
        if rating.count() == 0:
            rating = -1
        else:
            rating = rating[0].rating
        return jsonify({'rating': rating})


class CommentEP(Resource):
    def __init__(self):
        self.comment_request = CommentRequest()
        self.comment_schema = CommentSchema()
        super(CommentEP, self).__init__()

    def post(self):
        args = self.comment_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        try:
            post_object = Post.objects.get(pid=args.data['pid'])
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        uid = request.headers['UID']
        try:
            user_object = User.objects.get(uid=uid)
        except User.DoesNotExist:
            raise exceptions.UserDoesNotExist("User Does Not Exist")
        comment = post_object.comments.create(user=user_object, pid=args.data['pid'], rating=args.data['comment'])
        post_object.save()
        response_comment = self.comment_schema.dump(comment)
        return jsonify({"comment": response_comment})

