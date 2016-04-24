from marshmallow import fields, validate

from api.core import ma
from api.users.fields import PublicUserSchema


class TagSchema(ma.Schema):
    text = fields.String(required=True, validate=[validate.Length(min=1)])


class PostRequest(ma.Schema):
    title = fields.String(required=True, validate=[validate.Length(min=1)])
    url = fields.Url()
    description = fields.String(required=True, validate=[validate.Length(min=1)])
    tags = fields.Nested(TagSchema, many=True)


class RatingSchema(ma.Schema):
    pid = fields.Integer()
    uid = fields.Integer()
    rating = fields.Integer()


class CommentRequest(ma.Schema):
    pid = fields.Integer()
    comment = fields.String()


class SearchRequest(ma.Schema):
    search_field = fields.String()
    page = fields.Integer(validate=lambda n: 0 < n, required=True)


class CommentSchema(ma.Schema):
    user = fields.Nested(PublicUserSchema)
    pid = fields.Integer()
    comment = fields.String()
    created = fields.DateTime()


class PostSchema(ma.Schema):
    user = fields.Nested(PublicUserSchema)
    pid = fields.Integer()
    title = fields.String()
    created = fields.DateTime()
    url = fields.Url()
    description = fields.String()
    tags = fields.Nested(TagSchema, many=True)
    comments = fields.Nested(CommentSchema, many=True)


class PostSearchSchema(ma.Schema):
    user = fields.Nested(PublicUserSchema)
    pid = fields.Integer()
    title = fields.String()
    created = fields.DateTime()
    url = fields.Url()


class RatingRequest(ma.Schema):
    pid = fields.Integer(required=True)
    rating = fields.Integer(validate=lambda n: 0 <= n <= 5)


