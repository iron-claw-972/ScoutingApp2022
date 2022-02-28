"""scouting URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from scouting import views

urlpatterns = [
    path("getCurrentEvent/", views.CurrentEventView.as_view(), name="current_event"),
    path('match/', include([
        path("getFormSchema/", views.MatchScoutingFormSchemaView.as_view(), name="match_scouting_form_schema"),
        path("getMatchData/", views.MatchDataView.as_view(), name="match_data_list"),
        path("", views.MatchScoutingView.as_view(), name="match_scouting")
    ])),
    path('pit/', include([
        path("getFormSchema/", views.PitScoutingFormSchemaView.as_view(), name="pit_scouting_form_schema"),
        path("getPitData/", views.PitDataView.as_view(), name="pit_data_list"),
        path("", views.PitScoutingView.as_view(), name="pit_scouting")
    ])),
]