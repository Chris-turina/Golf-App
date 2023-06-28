from django.urls import path
from base.views import teecolors_views as views


urlpatterns = [

    path('', views.getTeeColors, name='teecolors'),
    path('update/<str:pk>/', views.updateTeeColor, name='teecolor-update'),
    path('added_to_holes/<str:pk>/', views.addTeeColorToHolesBool, name='add-tee-to-holes'),
]