from rest_framework import serializers
from scouting.models import Event, Team, MatchData
from django.db.models import Q

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("team_name", "team_number")

class MatchDataSerializer(serializers.Serializer):
    def create(self, validated_data):
        team, _ = Team.objects.get_or_create(
            team_number=self.initial_data.get("team_number"),
            defaults={
                "team_number": self.initial_data.get("team_number"),
                "team_name": self.initial_data.get("team_name")
            }
        )
        event, _ = Event.objects.get_or_create(
            event_key=self.initial_data.get("event_key"),
            defaults={
                "event_key": self.initial_data.get("event_key")
            }
        )
        match_data, _ = MatchData.objects.get_or_create(
            match_key=self.initial_data.get("match_key"),
            defaults={
                "match_key": self.initial_data.get("match_key"),
                "scouter_name": self.initial_data.get("scouter_name"),
                "event": event
            }
        )
        match_data.team.add(team)
        return match_data

    def validate(self, data):
        return data

    class Meta:
        model = MatchData
        fields = ("event", "team", "match_key", "scouter_name")