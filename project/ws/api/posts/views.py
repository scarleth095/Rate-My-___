import logging

from flask import jsonify, request
from flask_restful import Resource
import json
import api.exceptions as exceptions
from fields import PostSchema, PostRequest
from models import Post, Tag
from api.users.auth import Auth

logger = logging.getLogger('ws_python')



class PostEP(Resource):
    def __init__(self):
        self.post_schema = PostSchema()
        self.post_request = PostRequest()
        super(PostEP, self).__init__()

    @Auth.authentication_required()
    def post(self):
        args = self.post_request.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        uid = request.headers['UID']
        post = Post.objects.create(
                uid=uid,
                title=args.data['title'],
                url=args.data['url'],
                description=args.data['description'],
                tags=[Tag.get_or_create(tag['text']) for tag in args.data['tags']]
            )
        response = self.post_schema.dump(post)
        return jsonify(response.data)

    def patch(self):
        pass

    @Auth.authentication_required()
    def get(self,id):
        try:
            post=Post.objects(pid=id)
        except Post.DoesNotExist:
            raise exceptions.PostDoesNotExist("Post Does Not Exist")
        response = self.post_schema.dump(post)
        return jsonify(response.data)
        
        

    def delete(self):
        pass