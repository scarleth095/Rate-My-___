from flask import jsonify

class ErrorCodes(object):
    INVALID_CREDENTIALS = -1
    INVALID_REQUEST = -2
    INVALID_TOKEN = -3
    USER_DOES_NOT_EXIST = -5
    THREAT_DOES_NOT_EXIST = -6
    INDEX_OUT_OF_BOUNDS = -7

class APIException(Exception):
    def __init__(self, message, status_code, error_code):
        super(APIException, self).__init__()
        self.message = message
        self.status_code = status_code
        self.code = error_code

    def to_dict(self):
        return {'message': self.message, 'code': self.code}

class InvalidCredentials(APIException):
    def __init__(self, message):
        super(InvalidCredentials, self).__init__(message, 401, ErrorCodes.INVALID_CREDENTIALS)

class InvalidRequest(APIException):
    def __init__(self, message):
        super(InvalidRequest, self).__init__(message, 400, ErrorCodes.INVALID_REQUEST)

class InvalidToken(APIException):
    def __init__(self, message):
        super(InvalidToken, self).__init__(message, 401, ErrorCodes.INVALID_TOKEN)

class UserDoesNotExist(APIException):
    def __init__(self, message):
        super(UserDoesNotExist, self).__init__(message, 404, ErrorCodes.USER_DOES_NOT_EXIST)

class IndexOutOfBounds(APIException):
    def __init__(self, message):
        super(IndexOutOfBounds, self).__init__(message, 404, ErrorCodes.INDEX_OUT_OF_BOUNDS)

def register_error_handlers(app):
    @app.errorhandler(APIException)
    def handle_exception(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

