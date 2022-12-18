from django.db import models
from django.conf import settings
from datetime import datetime  

class Note(models.Model):
    """Note object"""
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    tag = models.CharField(max_length=255)
    date = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title
