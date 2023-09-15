from django.urls import path
from base.views import teeboxes_views as views


urlpatterns = [

    path('', views.getTeeBoxes, name='teeboxes'),
    path('<str:pk>/', views.getTeeBox, name='get-tee-box'),

    path('update/<str:pk>/', views.updateTeeBox, name='teebox-update'),

    path('delete/<str:pk>/', views.deleteTeeBox, name='teebox-delete'),
    path('added_to_holes/<str:pk>/', views.addTeeBoxToHolesBool, name='add-tee-to-holes'),

    path('bulk_update/course:<str:pk>/', views.updateBulkTeeBoxes, name='bulk-teebox-update'),
]