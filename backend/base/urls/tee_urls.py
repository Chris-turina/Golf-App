from django.urls import path
from base.views import tee_views as views


urlpatterns = [

    path('', views.getTee, name='tee'),
    path('update/<str:pk>/', views.updateTee, name='update-tee'),
    path('course_tees/<str:pk>/', views.getCourseTees, name='get-course-tees'),
]