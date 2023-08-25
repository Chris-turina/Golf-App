from django.urls import path
from base.views import createcourse_views as views

urlpatterns = [

    path('create/', views.createGolfCourse, name='golfcourse-create'),

    path('update_holes/', views.updateCourseHoles, name='holes-update'),
    

    
]

