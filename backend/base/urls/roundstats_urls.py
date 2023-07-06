from django.urls import path
from base.views import roundstats_views as views

urlpatterns = [
    path('', views.getAllRoundStats, name='round-stats'),
    path('<str:pk>/', views.getRoundStat, name='round-stats'),
    

]