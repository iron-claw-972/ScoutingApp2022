from django.db import models
from django.utils.translation import gettext_lazy as _
from solo.models import SingletonModel
import json

DEFAULT_MATCH_FORM_SCHEMA = """
[{"id":"match_key","label":"Match Key","type":"text","validationType":"string","validations":[{"type":"required","params":["Match key is required"]}]},{"id":"event_key","label":"Event Key","type":"text","validationType":"string","validations":[{"type":"required","params":["Event key is required"]}]},{"id":"scouter_name","label":"Scouter Name","type":"text","validationType":"string","validations":[{"type":"required","params":["Scouter name is required"]}]},{"id":"team_number","label":"Team Number","type":"number","validationType":"number","validations":[{"type":"required","params":["Team number is required"]},{"type":"integer","params":["Team number must be an integer"]},{"type":"min","params":[1,"Team number must be >= 1"]},{"type":"max","params":[9999,"Team number cannot exceed 9999"]}]},{"id":"driver_station","label":"Driver Station","type":"radio","validationType":"string","options":["Red 1","Red 2","Red 3","Blue 1","Blue 2","Blue 3"],"validations":[{"type":"required","params":["Driver station position is required"]}]}]
"""

class Team(models.Model):
    team_number = models.PositiveSmallIntegerField(primary_key=True)

class Event(models.Model):
    event_key = models.CharField(primary_key=True, max_length=20)

class Match(models.Model):
    match_key = models.CharField(primary_key=True, max_length=20)

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

class FormSchemas(SingletonModel):
    match_form_schema = models.JSONField(default=json.loads(DEFAULT_MATCH_FORM_SCHEMA))
    robot_form_schema = models.JSONField(default=dict)
    
    def __str__(self):
        return "Form Schemas"

    class Meta:
        verbose_name = "Form Schemas"