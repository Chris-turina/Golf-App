from django.urls import path
from base.views import teeboxes_views as views


urlpatterns = [

    path('', views.getTeeBoxes, name='teeboxes'),
    path('update/<str:pk>/', views.updateTeeBox, name='teebox-update'),
    path('added_to_holes/<str:pk>/', views.addTeeBoxToHolesBool, name='add-tee-to-holes'),

    path('bulk_update/', views.updateBulkTeeBoxes, name='bulk-teebox-update'),
]