import logging

from flask import jsonify, request, current_app
import requests
from flask_restful import Resource
import json
from api.users.models import User
from api.users.fields import UserSchema, AuthorizeSchema
import api.exceptions as exceptions

logger = logging.getLogger('ws_python')


class AuthorizedEP(Resource):
    def __init__(self):
        self.user_schema = UserSchema()
        self.authorize_schema = AuthorizeSchema()
        super(AuthorizedEP, self).__init__()

    def post(self):
        args = self.authorize_schema.load(request.get_json())
        if args.errors:
            raise exceptions.FacebookError("Facebook Login Failed")
        params = {
            'client_id': args.data['clientId'],
            'redirect_uri': args.data['redirectUri'],
            'client_secret': current_app.config['OAUTH_CREDENTIALS']['facebook']['secret'],
            'code': args.data['code']
        }
        r = requests.get(current_app.config['FACEBOOK_ENDPOINTS']['access_token_url'],
                         params=params)
        access_token = json.loads(r.text)
        r = requests.get(current_app.config['FACEBOOK_ENDPOINTS']['login_url'], params=access_token)
        response_data = json.loads(r.text)
        try:
            user = User.objects.get(email=response_data['email'])
            logger.debug("User fetched for " + str(user.uid))
        except User.DoesNotExist:
            user = User.objects.create(
                name=response_data['name'],
                email=response_data['email'],
            )
            logger.debug("User created for " + str(user.uid))
        user.facebook_token = str(access_token)
        user.token = user.generate_auth_token()
        user.profile_picture_url = response_data['picture']['data']['url']
        user.save()
        result = self.user_schema.dump(user)
        return jsonify(result.data)
