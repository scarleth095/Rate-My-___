import logging

from flask import jsonify, request
import requests
from flask_restful import Resource
import json

from models import User
from fields import UserSchema, AuthorizeSchema
import exceptions
import auth

logger = logging.getLogger('ws_python')

class AuthorizedEP(Resource):
    def __init__(self):
        self.user_schema = UserSchema()
        self.authorize_schema = AuthorizeSchema()
        super(AuthorizedEP, self).__init__()

    def post(self):
        args = self.authorize_schema.load(request.get_json())
        if args.errors:
            raise exceptions.InvalidRequest(args.errors)
        params = {
        'client_id': args.data['clientId'],
        'redirect_uri': args.data['redirectUri'],
        'client_secret': auth.OAUTH_CREDENTIALS['facebook']['secret'],
        'code': args.data['code']
        }
        r = requests.get(auth.FACEBOOK_ENDPOINTS['access_token_url'],
                         params=params)
        access_token = json.loads(r.text)
        r = requests.get(auth.FACEBOOK_ENDPOINTS['login_url'], params=access_token)
        response_data = json.loads(r.text)
        try:
            user = User.objects.get(uid=response_data['id'])
            logger.debug("User fetched for " + response_data['id'])
        except User.DoesNotExist:
            user = User.objects.create(
                uid=response_data['id'],
                name=response_data['name'],
                email=response_data['email'],
            )
            logger.debug("User created for " + response_data['id'])
        user.facebook_token = str(access_token)
        user.token = user.generate_auth_token()
        user.profile_picture_url = response_data['picture']['data']['url']
        user.save()
        result = self.user_schema.dump(user)
        return jsonify(result.data)
