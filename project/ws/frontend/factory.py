# Initializing app
def frontend_app_factory():
    """
    Method to build an app with different configurations. Used to build testing, develop, and production app.
    NOTE: THE ORDER OF IMPORTS IS IMPORTANT B/C CIRCULAR IMPORTS. IMPORT ENDPOINTS AFTER THE SETUP!
    """
    from flask import Flask
    import os

    # =====================SETUP====================================== #

    # SET DIRECTORY PATHS
    template_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
    # BUILD AND CONFIG APP
    app = Flask(__name__, template_folder=template_dir)

    # =====================ROUTING SETUP============================= #

    from frontend import frontend
    # REGISTER API ROUTES
    app.register_blueprint(frontend)
    return app
