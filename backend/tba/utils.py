import tbapy
from django.conf import settings
import json
import time

def get_next_match():
    tba = tbapy.TBA(settings.TBA_API_KEY)
    matches = tba.team_matches(settings.FRC_TEAM_NUMBER, year=settings.FRC_YEAR)
    matches = list(filter(lambda match: (match.get("predicted_time") if match.get("predicted_time") else match.get("actual_time")) >= (0 if settings.DEBUG else int(time.time())), matches))
    next_match = min(matches, key=lambda match: (match.get("predicted_time") if match.get("predicted_time") else match.get("actual_time"))).get("key")
    return next_match