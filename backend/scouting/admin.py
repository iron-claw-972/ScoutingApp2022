from django.contrib import admin
from django.db import models
from scouting.models import Event, Team, Match, MatchData, FormSchemas, Settingsa, PitData
from solo.admin import SingletonModelAdmin
from django_json_widget.widgets import JSONEditorWidget

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(MatchData)
class MatchDataAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(PitData)
class PitDataAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(FormSchemas)
class FormSchemasAdmin(SingletonModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

@admin.register(Settings)
class SettingsAdmin(SingletonModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }