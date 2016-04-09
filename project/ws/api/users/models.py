import logging

from api.core import db
from flask import request, current_app
from flask_oauthlib.client import OAuthException
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)
import api.exceptions as exceptions

logger = logging.getLogger('ws_python')


class User(db.Document):
    """
    """
    uid = db.StringField(required=True, unique=True)  # facebook id
    name = db.StringField(required=True)
    profile_picture_url = db.StringField()
    email = db.StringField()
    token = db.StringField()
    facebook_token = db.StringField()

    def generate_auth_token(self, expiration=7200):
        s = Serializer(current_app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'uid': self.uid})

    @staticmethod
    def verify_auth_token(token, uid):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            raise exceptions.InvalidToken("The token has expired.")
        except BadSignature:
            raise exceptions.InvalidToken("The Token is incorrect")
        try:
            user = User.objects.get(uid=uid)
        except User.DoesNotExist:
            raise exceptions.InvalidToken("The token was valid but the user "
                                          + uid +
                                          " was deleted and no longer exist.")
        if uid != data['uid']:
            raise exceptions.InvalidToken(
                'token was not issued for current user')
        elif user.token != token:
            raise exceptions.InvalidToken('User Token is not current')
        return user

