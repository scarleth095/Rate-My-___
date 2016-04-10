from functools import wraps
import logging

from flask import request

import api.exceptions as exceptions
from api.users.models import User

logger = logging.getLogger('abcss_ws_python')


class Auth(object):
    """
    Authentication wrappers for API endpoints auth token is in the Authorization header
    """

    @staticmethod
    def authentication_required():
        def decorator(f):
            @wraps(f)
            def decorated(*args, **kwargs):
                token = None
                uid = None
                if 'Authorization' in request.headers and 'UID' in request.headers:
                    token = request.headers['Authorization']
                    uid = int(request.headers['UID'])
                if not token or not uid:
                    raise exceptions.InvalidToken('Token or UID Not supplied in header')
                User.verify_auth_token(token, uid)
                return f(*args, **kwargs)
            return decorated
        return decorator