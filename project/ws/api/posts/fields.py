from marshmallow import fields

from api.core import ma


class TagSchema(ma.Schema):
    text = fields.String()


class PostRequest(ma.Schema):
    title = fields.String(required=True)
    url = fields.String()
    description = fields.String(required=True)
    tags = fields.Nested(TagSchema, many=True)


class PostSchema(ma.Schema):
    pid = fields.Integer()
    uid = fields.Integer()
    title = fields.String()
    url = fields.String()
    description = fields.String()
    tags = fields.Nested(TagSchema, many=True)