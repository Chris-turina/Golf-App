from django.urls import path
from base.views import tee_views as views


urlpatterns = [

    path('', views.getTee, name='tee'),
    path('yards/update/<str:pk>/', views.updateTeeYards, name='update-tee-yards'),
    path('course_tees/<str:pk>/', views.getCourseTees, name='get-course-tees'),
]