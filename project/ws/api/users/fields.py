from marshmallow import fields

from api.core import ma


class UserSchema(ma.Schema):
    uid = fields.Integer()
    name = fields.String()
    token = fields.String()
    profile_picture_url = fields.String()


class PublicUserSchema(ma.Schema):
    uid = fields.Integer()
    first_name = fields.String()
    last_name = fields.String()


class AuthorizeSchema(ma.Schema):
    clientId = fields.String(required=True)
    redirectUri = fields.String(required=True)
    code = fields.String(required=True)


