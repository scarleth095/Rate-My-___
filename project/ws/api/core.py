from flask.ext.mongoengine import MongoEngine
from flask_restful import Api
from flask_marshmallow import Marshmallow
from flask_oauthlib.client import OAuth

db = MongoEngine()
api = Api(prefix='/api')
ma = Marshmallow()
oauth = OAuth()
