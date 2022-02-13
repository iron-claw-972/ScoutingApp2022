from django.db import models
from django.utils.translation import gettext_lazy as _
from solo.models import SingletonModel

class LatestData(SingletonModel):
    next_match = models.JSONField(default=dict)
    
    def __str__(self):
        return "Latest Data"

    class Meta:
        verbose_name = "Latest Data"

class Notification(models.Model):
    payload = models.JSONField()
    created = models.DateTimeField(auto_now_add=True)