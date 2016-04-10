import logging

from flask import jsonify, request
from flask_restful import Resource
import json
import api.exceptions as exceptions
from fields import PostSchema, PostRequest
from models import Post, Tag
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
    def post(self):
        args = self.post_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        uid = request.headers['UID']
        post_object = Post.objects.create(
                uid=uid,
                title=args.data['title'],
                url=args.data['url'],
                description=args.data['description'],
                tags=[Tag.get_or_create(tag['text']) for tag in args.data['tags']]
            )
        user_object = User.objects.get(uid=uid)
        response_post = self.post_schema.dump(post_object)
        response_user = self.user_schema.dump(user_object)

        return jsonify({"post": response_post.data, "user": response_user.data})

    def patch(self):
        pass

    @Auth.authentication_required()
    def get(self, id):
        try:
            post_object = Post.objects.get(pid=id)
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        user_object = User.objects.get(uid=post_object.uid)
        response_post = self.post_schema.dump(post_object)
        response_user = self.user_schema.dump(user_object)

        return jsonify({"post": response_post.data, "user": response_user.data})

    def delete(self):
        pass