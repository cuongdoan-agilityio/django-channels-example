from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4
from django.db import models


class Engagement(models.Model):
    uuid = models.UUIDField(unique=True, db_index=True, null=True, default=uuid4)
    name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("date_created",)


class Room(models.Model):
    uuid = models.UUIDField(unique=True, db_index=True, null=True, default=uuid4)

    name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("date_created",)


class Message(models.Model):
    uuid = models.UUIDField(unique=True, db_index=True, null=True, default=uuid4)
    room = models.ForeignKey(Room, related_name="messages", on_delete=models.CASCADE)
    engagement = models.ForeignKey(Engagement, on_delete=models.CASCADE)
    content = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("date_added",)
