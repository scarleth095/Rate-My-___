from marshmallow import fields, validate

from api.core import ma


class TagSchema(ma.Schema):
    text = fields.String(required=True, validate=[validate.Length(min=1)])


class PostRequest(ma.Schema):
    title = fields.String(required=True, validate=[validate.Length(min=1)])
    url = fields.Url()
    description = fields.String(required=True, validate=[validate.Length(min=1)])
    tags = fields.Nested(TagSchema, many=True)


class PostSchema(ma.Schema):
    pid = fields.Integer()
    title = fields.String()
    created = fields.DateTime()
    url = fields.Url()
    description = fields.String()
    tags = fields.Nested(TagSchema, many=True)