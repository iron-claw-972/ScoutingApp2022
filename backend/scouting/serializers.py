from rest_framework import serializers
from scouting.models import Event, Team, Match, MatchData
from django.db.models import Q

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("data",)

class MatchDataSerializer(serializers.Serializer):
    def create(self, validated_data):
        data = self.initial_data

        team_number = data.pop("team_number")
        team, _ = Team.objects.get_or_create(
            team_number=team_number,
            defaults={
                "team_number": team_number
            }
        )

        match_key = data.pop("match_key")
        event_key = match_key.split("_")[0]
        event, _ = Event.objects.get_or_create(
            event_key=event_key,
            defaults={
                "event_key": event_key
            }
        )
        match, _ = Match.objects.get_or_create(
            match_key=match_key,
            defaults={
                "match_key": match_key,
                "event": event
            }
        )

        id = data.pop("id")
        match_data, _ = MatchData.objects.get_or_create(
            id=id,
            defaults={
                "id": id,
                "match": match,
                "data": data,
                "event": event,
                "team": team
            }
        )

        return match_data

    def validate(self, data):
        if MatchData.objects.filter(id=data.get("id")).exists():
            raise serializers.ValidationError("Data exists")
        return data

    class Meta:
        model = MatchData
        fields = ("event", "team", "data")