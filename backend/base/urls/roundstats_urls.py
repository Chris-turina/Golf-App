from django.urls import path
from base.views import roundstats_views as views

urlpatterns = [
    path('', views.getRoundStats, name='round-stats'),
    path('create/', views.createRoundStats, name='create-round-stats'),

]