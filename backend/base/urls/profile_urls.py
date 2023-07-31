from django.urls import path
from base.views import profile_views as views


urlpatterns = [
    path('', views.getProfiles, name='profiles'),
    path('find_friends/', views.findProfiles, name='find-profiles'),
    path('my_profile/', views.getProfile, name='my-profile'),
    path('my_friend_requests/', views.getFriendRequestNotifications, name='get-friend-request-notifications'),
    path('my_friend_requests/<str:pk>/', views.getFriendRequestNotification, name='get-friend-request-notification'),
    path('send_friend_request/<str:pk>/', views.sendFriendRequest, name='send-friend-request'),

]