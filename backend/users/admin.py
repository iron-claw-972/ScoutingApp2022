from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser
from django.db import models
from django_json_widget.widgets import JSONEditorWidget

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }