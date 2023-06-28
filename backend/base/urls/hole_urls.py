from django.urls import path
from base.views import hole_views as views


urlpatterns = [

    path('', views.getHoles, name='holes'),
    path('<str:pk>/', views.getHole, name='hole'),
    path('update/<str:pk>/', views.updateHolePar, name='hole-par-update'),
]