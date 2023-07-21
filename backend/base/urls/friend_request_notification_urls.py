from django.urls import path
from base.views import friend_request_notification_views as views

urlpatterns = [
    # path('', views.getFRNotifications, name='notifications'),
    path('update/<str:pk>', views.updateFRNotification, name='update-frnotification')
]