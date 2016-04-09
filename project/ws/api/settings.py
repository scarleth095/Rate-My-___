import os
import sys
# ===============================================APP SETTINGS===========================================================


class BaseConfiguration(object):
    APP_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # refers to application_top
    DEBUG = False
    TESTING = False
    SECRET_KEY = '\xe8-~cf\xb9\xfb\xe3\xf9\x1aUdG\xd1\xebQ\x14\xee\xef\xde~o\xb8i'
    # REST API SETTINGS
    BUNDLE_ERRORS = True
    OAUTH_CREDENTIALS = {
        'facebook': {
            'secret': 'a86403feedb02cbfd069b191bdc008d2',
        }
    }
    FACEBOOK_ENDPOINTS = {
    'login_url':
    'https://graph.facebook.com/v2.5/me?locale=en_US&fields=name,email,picture.width(800).height(800)',
    'access_token_url': 'https://graph.facebook.com/v2.3/oauth/access_token'
    }

class DevelopConfiguration(BaseConfiguration):
    DEBUG = True
    # DB SETTINGS
    if 'DB_PORT' in os.environ:
        MONGODB_SETTINGS = {
            'db': '',
            'host': os.environ['DB_PORT_27017_TCP_ADDR']+':' + os.environ['DB_PORT_27017_TCP_PORT']
        }
    else:
        MONGODB_SETTINGS = {
            'db': ''
        }
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'simple': {
                'format': '[%(filename)s:%(lineno)s - %(funcName)s() ] %(message)s'
                },
        },
        'handlers': {
            'stderr': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'stream': sys.stderr,
                'formatter': 'simple'
            }
        },
        'loggers': {
            'ws_python': {
                'handlers': ['stderr'],
                'level': 'DEBUG',
                'propagate': True,
            }
        }
    }


class TestingConfiguration(BaseConfiguration):
    DEBUG = True
    TESTING = True
    # DB SETTINGS
    if 'DB_PORT' in os.environ:
        MONGODB_SETTINGS = {
            'db': 'test_db',
            'host': os.environ['DB_PORT_27017_TCP_ADDR']+':' + os.environ['DB_PORT_27017_TCP_PORT']
            }
    else:
        MONGODB_SETTINGS = {
            'db': 'local_test_db',
            }
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'simple': {
                'format': '[%(filename)s:%(lineno)s - %(funcName)s() ] %(message)s'
                },
        },
        'handlers': {
            'stderr': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'stream': sys.stderr,
                'formatter': 'simple'
            }
        },
        'loggers': {
            'ws_python': {
                'handlers': ['stderr'],
                'level': 'DEBUG',
                'propagate': True,
            }
        }
    }


class ProductionConfiguration(BaseConfiguration):
    # DB SETTINGS
    PROPAGATE_EXCEPTIONS = True
    if 'DB_PORT' in os.environ:
        MONGODB_SETTINGS = {
            'db': 'ws_production',
            'host': os.environ['DB_PORT_27017_TCP_ADDR']+':' + os.environ['DB_PORT_27017_TCP_PORT']
        }
    else:
        MONGODB_SETTINGS = {
            'db': 'ws_production',
        }

    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'simple': {
                'format': '[%(filename)s:%(lineno)s - %(funcName)s() ] %(message)s'
                },
        },
        'handlers': {
            'stderr': {
                'level': 'DEBUG',
                'class': 'logging.StreamHandler',
                'stream': sys.stderr,
                'formatter': 'simple'
            }
        },
        'loggers': {
            'ws_python': {
                'handlers': ['stderr'],
                'level': 'DEBUG',
                'propagate': True,
            }
        }
    }
