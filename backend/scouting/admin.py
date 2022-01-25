from django.contrib import admin
from scouting.models import Event, Team, MatchData

admin.site.register(Team)
admin.site.register(MatchData)
admin.site.register(Event)