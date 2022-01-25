from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from scouting.serializers import TeamSerializer, MatchDataSerializer

class StatusView(APIView):
    def get(self, request):
        content = {'Status': 'Online'}
        return Response(content)

class MatchScoutingView(APIView):
    def post(self, request):
        serializer = MatchDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)