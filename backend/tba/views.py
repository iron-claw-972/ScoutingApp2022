from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from tba.models import Notification, LatestData
import json
import hashlib

class WebhookView(APIView):
    def post(self, request):
        checksum = request.headers['X-TBA-Checksum']
        payload = request.body.decode("utf-8")
        if hashlib.sha1(bytes(f'{settings.TBA_WEBHOOK_SECRET}{payload}', 'utf-8')).hexdigest() != checksum:
            return Response(status=403)
        data = json.loads(payload)
        notification = Notification.objects.create(payload=data)
        latest_data = LatestData.get_solo()
        if data.get("message_type") == "upcoming_match":
            latest_data.next_match = data.get("message_data")
            latest_data.save()
        return Response(status=204)