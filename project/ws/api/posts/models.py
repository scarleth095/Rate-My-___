import logging

from api.core import db
import api.utils as utils
from flask import current_app
import api.exceptions as exceptions

logger = logging.getLogger('ws_python')


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


class Post(db.Document):
    """
    """
    uid = db.IntField(required=True)
    pid = db.SequenceField(required=True, unique=True)
    description = db.StringField()
    title = db.StringField(required=True)
    created = db.DateTimeField(default=utils.time_now, required=True)
    updated = db.DateTimeField(default=utils.time_now, required=True)
    tags = db.ListField(db.ReferenceField(Tag), default=[])
    url = db.URLField()

