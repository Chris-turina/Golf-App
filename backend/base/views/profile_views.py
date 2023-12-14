from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.db.models import Q

from base.models import Profile, FriendRequestNotification
from django.contrib.auth.models import User
from base.serializers import ProfileSerializer, FriendRequestNotificationSerializer, UserSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def findProfiles(request):
    data = request.query_params
    my_friends = Profile.objects.get(user=request.user).friends.all()
    print(my_friends)
    profiles = Profile.objects.filter(Q(user__first_name__contains=data['search_term']) | Q(user__last_name__contains=data['search_term'])).exclude(user=request.user)    
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request):
    profile = Profile.objects.get(user=request.user.id)   
     
    serializer = ProfileSerializer(profile, many=False )
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFriendRequestNotifications(request):
    profile = Profile.objects.get(user=request.user)    
    sent_friend_requests =  FriendRequestNotification.objects.filter(sender=profile)
    received_friend_requests =  FriendRequestNotification.objects.filter(receiver=profile)
    serializer_sent = FriendRequestNotificationSerializer(sent_friend_requests, many=True)
    serializer_received = FriendRequestNotificationSerializer(received_friend_requests, many=True)
    new_dict= {}
    new_dict.update({"sent_requests":serializer_sent.data})
    new_dict.update({"received_requests":serializer_received.data})
    return Response(new_dict)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFriendRequestNotification(request):
    profile = Profile.objects.get(user=request.user)    
    sent_friend_requests =  FriendRequestNotification.objects.filter(sender=profile)
    return Response('requests')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def sendFriendRequest(request):
    data = request.data
    print(data)
    # pk = request.data['receiver']
    # sender = Profile.objects.get(user=request.user)
    # receiver = Profile.objects.get(user_id=pk)
    # friend_ship = FriendRequestNotification.objects.create(
    #     sender=sender,
    #     receiver=receiver,
    #     status = data['action'],
    # )
    # serializer = FriendRequestNotificationSerializer(friend_ship, many=False)
    # return Response(serializer.data)
    return Response('Friends')