import os
from api.factory import api_app_factory
from frontend.factory import frontend_app_factory

if os.environ['APP'] == "API":
    if os.environ['ENV'] == 'Production':
        app = api_app_factory('api.settings.ProductionConfiguration')

    if os.environ['ENV'] == 'Develop':
        app = api_app_factory('api.settings.DevelopConfiguration')

elif os.environ['APP'] == "Frontend":
        app = frontend_app_factory()

