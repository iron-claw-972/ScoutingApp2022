from rest_framework import serializers
from scouting.models import Event, PitData, Team, Match, MatchData
from django.db.models import Q

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("team_number",)

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ("event_key",)

class MatchSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = Match
        fields = ("match_key", "event")

class MatchDataSerializer(serializers.ModelSerializer):
    team = TeamSerializer(required=False)
    event = EventSerializer(required=False)
    match = MatchSerializer(required=False)
    data = serializers.JSONField(required=False)
    
    def create(self, validated_data):
        data = self.initial_data

        form_type = data.pop("type")

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
        data = self.initial_data
        if MatchData.objects.filter(id=data.get("id")).exists():
            raise serializers.ValidationError("Data exists")
        return data

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        for field in ["data", "team", "match", "event"]:
            field_representation = representation.pop(field)
            for key in field_representation:
                representation[key] = field_representation[key]
        return representation
    

    class Meta:
        model = MatchData
        fields = ("id", "team", "match", "event", "data")


class PitDataSerializer(serializers.ModelSerializer):
    team = TeamSerializer(required=False)
    event = EventSerializer(required=False)
    data = serializers.JSONField(required=False)
    
    def create(self, validated_data):
        data = self.initial_data

        form_type = data.pop("type")

        team_number = data.pop("team_number")
        team, _ = Team.objects.get_or_create(
            team_number=team_number,
            defaults={
                "team_number": team_number
            }
        )

        event_key = data.pop("event_key")
        event, _ = Event.objects.get_or_create(
            event_key=event_key,
            defaults={
                "event_key": event_key
            }
        )

        id = data.pop("id")
        match_data, _ = PitData.objects.get_or_create(
            id=id,
            defaults={
                "id": id,
                "data": data,
                "event": event,
                "team": team
            }
        )

        return match_data

    def validate(self, data):
        data = self.initial_data
        if PitData.objects.filter(id=data.get("id")).exists():
            raise serializers.ValidationError("Data exists")
        return data

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        for field in ["data", "team", "event"]:
            field_representation = representation.pop(field)
            for key in field_representation:
                representation[key] = field_representation[key]
        return representation
    

    class Meta:
        model = MatchData
        fields = ("id", "team", "event", "data")