from django.urls import path
from base.views import golfcourse_views as views


urlpatterns = [

    path('', views.getGolfCourses, name='golfcourses'),

    path('create/', views.createGolfCourse, name='golfcourse-create'),
    path('<str:pk>/createtee_color/', views.createTeeBox, name='teebox-create'),
    path('<str:pk>/deletetee_color/<str:tk>/', views.deleteTeeBox, name='teebox-delete'),

    path('hole/<str:pk>/createtee/<str:tk>/', views.createTees, name='tee-create'),
    path('<str:pk>/update_yards/<str:tk>/', views.updateBatchTeesYards, name='update-tees'),

    path('hole/deletetee/<str:pk>/', views.deleteTees, name='tee-delete'),

    path('holes/update/<str:pk>/', views.updateCourseHoles, name='update-course-holes'),
    path('teeColors/update/<str:pk>/', views.updateCourseTeeBoxes, name='update-course-holes'),
    

    path('<str:pk>/', views.getGolfCourse, name='golfcourse'),


    path('<str:pk>/create_hole/', views.createHole, name='holes'),
    path('<str:pk>/create_batch_18_holes/', views.createBatchHoleEighteen, name='holes'),
    path('<str:pk>/create_batch_9_holes/', views.createBatchHoleNine, name='holes'),
    path('<str:pk>/update_hole/<str:hk>/', views.updateHole, name='update-hole'),


    path('update/<str:pk>/', views.updateGolfCourse, name='golfcourse-update'),
    path('delete/<str:pk>/', views.deleteGolfCourse, name='golfcourse-delete'),
    
]

