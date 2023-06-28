from django.urls import path
from base.views import round_views as views


urlpatterns = [

    path('', views.getRounds, name='rounds'),
    path('create/', views.createRound, name='create-round'),
    path('<str:pk>/', views.getRound, name='round'),
    path('course/<str:pk>/tee_color/<str:tk>/create/', views.createRound, name='create-round'),
    

]