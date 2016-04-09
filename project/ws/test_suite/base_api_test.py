from flask.ext.testing import TestCase
from api.core import db, api
from api.factory import app_factory
from flask import current_app

class BaseAPITest(TestCase):
    """A base test case for API Testing."""

    def create_app(self):
        return app_factory('app.settings.TestingConfiguration')

    def setUp(self):
        self.db = db
        self.api = api

    def tearDown(self):
        db.connection.drop_database(current_app.config['MONGODB_SETTINGS']['db'])