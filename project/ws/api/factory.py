# Initializing app
def api_app_factory(config_filename):
    """
    Method to build an app with different configurations.
    Used to build testing, develop, and production app.
    NOTE: THE ORDER OF IMPORTS IS IMPORTANT B/C CIRCULAR IMPORTS.
    IMPORT ENDPOINTS AFTER THE SETUP!
    """
    from flask import Flask
    from api.core import db, api, ma, oauth
    import logging
    import logging.config
    from api.exceptions import register_error_handlers

    # =====================SETUP====================================== #

    # BUILD AND CONFIG APP
    app = Flask(__name__)
    app.config.from_object(config_filename)
    # CONFIG LOGGING
    logging.config.dictConfig(app.config['LOGGING'])
    # INITIALIZE DB
    db.init_app(app)
    # INITIALIZE MARSHALLING
    ma.init_app(app)
    # INITIALIZE OAUTH
    oauth.init_app(app)
    # REGISTER CUSTOM ERROR HANDLERS
    register_error_handlers(app)

    # =====================ROUTING SETUP============================= #

    from api.users.views import AuthorizedEP
    from api.posts.views import PostEP, PostsEP

    # REGISTER API ROUTES
    api.add_resource(AuthorizedEP, '/auth/facebook')
    api.add_resource(PostEP, '/posts/post/<int:id>')
    api.add_resource(PostsEP, '/posts/post/')
    api.init_app(app)
    return app
