"""config URL Configuration

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
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from scouting import views as scouting_views
from tba import views as tba_views

urlpatterns = [
    path('admin/', admin.site.urls, name="admin"),
    path('api/', include([
        path('status/', scouting_views.StatusView.as_view(), name="status"),
        path('scout/', include('scouting.urls')),
        path('users/', include('users.urls')),
        path('tba/', include('tba.urls')),
    ])),
    path('tba/', include([
        path('webhook/', tba_views.WebhookView.as_view(), name="tba_webhook"),
    ])),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)