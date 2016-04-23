import logging

from api.core import db
import api.utils as utils
from api.users.models import User

logger = logging.getLogger('ws_python')


class Rating(db.EmbeddedDocument):
    uid = db.IntField(required=True)
    pid = db.IntField(required=True)
    rating = db.IntField(required=True)


class Tag(db.Document):
    text = db.StringField(unique=True)

    # mongoengine removed get_or_create function b/c threading concerns so this is an alternative
    # http://stackoverflow.com/questions/25846462/mongoengine-replacing-get-or-create-with-upsert-update-one/25863633#25863633
    @staticmethod
    def get_or_create(tag_text):
        tag_text = tag_text.lower()
        return Tag.objects(text=tag_text).modify(
            upsert=True, new=True, set_on_insert__text=tag_text.lower()
        )


class Comment(db.EmbeddedDocument):
    user = db.ReferenceField(User, required=True)
    pid = db.IntField(required=True)
    comment = db.StringField()
    created = db.DateTimeField(default=utils.time_now, required=True)


class Post(db.Document):
    """
    """
    user = db.ReferenceField(User, required=True)
    pid = db.SequenceField(required=True, unique=True)
    description = db.StringField()
    title = db.StringField(required=True)
    created = db.DateTimeField(default=utils.time_now, required=True)
    updated = db.DateTimeField(default=utils.time_now, required=True)
    tags = db.ListField(db.ReferenceField(Tag), default=[])
    ratings = db.EmbeddedDocumentListField(Rating, default=[])
    comments = db.EmbeddedDocumentListField(Comment, default=[])
    url = db.URLField()

    def get_rating(self):
        aggregate_rating = 0
        count = 0
        for r in self.ratings:
            aggregate_rating += r.rating
            count += 1
        if count == 0:
            return 0
        else:
            return aggregate_rating/count

