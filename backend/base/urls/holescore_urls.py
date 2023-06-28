from django.urls import path
from base.views import holescore_views as views


urlpatterns = [

    path('', views.getHoleScore, name='hole-score'),
    # path('create/', views.createRound, name='create-round'),
    # path('<str:pk>/', views.getRound, name='round'),
    # path('course/<str:pk>/tee_color/<str:tk>/create/', views.createRound, name='create-round'),
    

]