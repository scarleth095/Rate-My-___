from frontend import frontend
from flask import make_response

@frontend.route('/')
@frontend.route('/login')
@frontend.route('/dashboard')
@frontend.route('/post/<postid>')
@frontend.route('/create')
@frontend.route('/profile')
@frontend.route('/404')

def page(**kwargs):
    return make_response(open('frontend/templates/index.html').read())


