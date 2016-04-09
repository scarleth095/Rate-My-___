from . import frontend
from flask import make_response

@frontend.route('/')
@frontend.route('/login')
@frontend.route('/dashboard')
@frontend.route('/threat/<threatid>')
@frontend.route('/threats')

def page(**kwargs):
    return make_response(open('frontend/templates/index.html').read())


