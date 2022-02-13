from django.db import models
from django.utils.translation import gettext_lazy as _

class Team(models.Model):
    team_number = models.PositiveSmallIntegerField()

class Event(models.Model):
    event_key = models.CharField(max_length=20)

class Match(models.Model):
    match_key = models.CharField(max_length=20)

class MatchData(models.Model):
    id = models.UUIDField(primary_key=True)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)
    match = models.ForeignKey("Match", on_delete=models.CASCADE)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    data = models.JSONField()

class RobotData(models.Model):
    id = models.UUIDField(primary_key=True)
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    data = models.JSONField()
