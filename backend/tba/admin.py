from django.contrib import admin
from tba.models import Notification, LatestData
from django.db import models
from solo.admin import SingletonModelAdmin
from django_json_widget.widgets import JSONEditorWidget

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(LatestData)
class LatestDataAdmin(SingletonModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }