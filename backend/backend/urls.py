"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/golfcourses/', include('base.urls.golfcourse_urls')),
    path('api/teecolors/', include('base.urls.teecolors_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/tee/', include('base.urls.tee_urls')),
    path('api/holes/', include('base.urls.hole_urls')),
    path('api/rounds/', include('base.urls.round_urls')),
    path('api/holescore/', include('base.urls.holescore_urls')),
    path('api/roundstats/', include('base.urls.roundstats_urls')),
    
]
