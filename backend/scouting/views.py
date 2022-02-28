from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
from scouting.serializers import PitDataSerializer, MatchDataSerializer
from scouting.models import FormSchemas, MatchData, PitData, Settings
from scouting.utils import BASE_MATCH_FORM_SCHEMA, BASE_PIT_FORM_SCHEMA

class StatusView(APIView):
    def get(self, request):
        content = {'Status': 'Online'}
        return Response(content)

class MatchScoutingView(APIView):
    def post(self, request):
        serializer = MatchDataSerializer(data=json.loads(request.body.decode("utf-8")))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(json.loads(json.dumps(serializer.errors)), status=400)

class MatchScoutingFormSchemaView(APIView):
    def get(self, request):
        match_form_schema = FormSchemas.get_solo().match_form_schema
        return Response(BASE_MATCH_FORM_SCHEMA + match_form_schema, status=200)

class PitScoutingView(APIView):
    def post(self, request):
        serializer = PitDataSerializer(data=json.loads(request.body.decode("utf-8")))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(json.loads(json.dumps(serializer.errors)), status=400)

class PitScoutingFormSchemaView(APIView):
    def get(self, request):
        pit_form_schema = FormSchemas.get_solo().pit_form_schema
        return Response(BASE_PIT_FORM_SCHEMA + pit_form_schema, status=200)

class CurrentEventView(APIView):
    def get(self, request):
        event_key = Settings.get_solo().current_event.event_key
        content = {'current_event': event_key}
        return Response(content, status=200)

class MatchDataView(APIView):
    def get(self, request):
        match_datas = MatchData.objects.all()
        serializer = MatchDataSerializer(match_datas, many=True)
        data = serializer.data
        return Response(data, status=200)

class PitDataView(APIView):
    def get(self, request):
        pit_datas = PitData.objects.all()
        serializer = PitDataSerializer(pit_datas, many=True)
        data = serializer.data
        return Response(data, status=200)