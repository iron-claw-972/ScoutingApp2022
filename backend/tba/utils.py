from scouting.models import Settings
import tbapy
from django.conf import settings
import json
import time

def get_next_match():
    try:
        tba = tbapy.TBA(settings.TBA_API_KEY)
        matches = tba.event_matches(Settings.get_solo().current_event.event_key)
        matches = list(filter(lambda match: (match.get("predicted_time") if match.get("predicted_time") else match.get("actual_time")) >= (0 if settings.DEBUG else int(time.time())), matches))
        next_match = min(matches, key=lambda match: (match.get("predicted_time") if match.get("predicted_time") else match.get("actual_time"))).get("key")
    except ValueError:
        next_match = Settings.get_solo().current_event.event_key
    return "2022camb_qm1"
    return next_match