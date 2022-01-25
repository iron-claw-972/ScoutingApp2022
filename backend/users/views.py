from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class HomeView(APIView):
    def get(self, request):
        content = {'Hello': 'World'}
        return Response(content)