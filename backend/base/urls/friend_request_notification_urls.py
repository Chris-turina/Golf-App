from django.urls import path
from base.views import friend_request_notification_views as views

urlpatterns = [
    path('update/', views.updateFRNotification, name='update-frnotification')
]