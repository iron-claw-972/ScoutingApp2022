from django.db import models
from django.utils.translation import gettext_lazy as _

class DrivetrainType(models.TextChoices):
    TANK = "tank", _("Tank Drive")
    MECANUM = "mecanum", _("Mecanum Drive")
    SWERVE = "swerve", _("Swerve Drive")
    HDRIVE = "hdrive", _("H-Drive")
    BUTTERFLY = "butterfly", _("Butterfly Drive")
    GRASSHOPPER = "grasshopper", _("Grasshopper Drive")
    KIWI = "kiwi", _("Kiwi Drive")
    NONADRIVE = "nona", _("Nonadrive")
    OCTOCANUM = "octo", _("Octocanum Drive")

class Team(models.Model):
    team_number = models.PositiveSmallIntegerField()
    team_name = models.CharField(max_length=50)

class Event(models.Model):
    event_key = models.CharField(max_length=15)

class MatchData(models.Model):
    match_key = models.CharField(max_length=15, unique=True)
    event = models.ForeignKey("Event", on_delete=models.CASCADE)
    scouter_name = models.CharField(max_length=50)
    team = models.ManyToManyField("Team")

class RobotData(models.Model):
    team = models.ForeignKey("Team", on_delete=models.CASCADE)
    drivetrain = models.CharField(max_length=15, choices=DrivetrainType.choices)
