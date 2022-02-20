from webbrowser import get
from django.db import models
from django.utils.translation import gettext_lazy as _
from solo.models import SingletonModel

from django.conf import settings

class Team(models.Model):
    team_number = models.PositiveSmallIntegerField(primary_key=True)

class Event(models.Model):
    event_key = models.CharField(primary_key=True, max_length=20)

class Match(models.Model):
    event = models.ForeignKey("Event", on_delete=models.CASCADE)
    match_key = models.CharField(primary_key=True, max_length=20)

class MatchData(models.Model):
    id = models.UUIDField(primary_key=True)
    event = models.ForeignKey("Event", on_delete=models.PROTECT)
    match = models.ForeignKey("Match", on_delete=models.PROTECT)
    team = models.ForeignKey("Team", on_delete=models.PROTECT)
    data = models.JSONField()

class PitData(models.Model):
    id = models.UUIDField(primary_key=True)
    event = models.ForeignKey("Event", on_delete=models.PROTECT)
    team = models.ForeignKey("Team", on_delete=models.PROTECT)
    data = models.JSONField()

class FormSchemas(SingletonModel):
    match_form_schema = models.JSONField(default=list)
    pit_form_schema = models.JSONField(default=list)
    
    def __str__(self):
        return "Form Schemas"

    class Meta:
        verbose_name = "Form Schemas"

class Settings(SingletonModel):
    current_event = models.OneToOneField("Event", null=True, blank=True, on_delete=models.PROTECT)
    
    def __str__(self):
        return "Settings"

    def save(self, *args, **kwargs):
        if self.current_event is None:
            self.current_event, _ = Event.objects.get_or_create(event_key=settings.DEFAULT_CURRENT_EVENT_KEY)
        super(Settings, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Settings"