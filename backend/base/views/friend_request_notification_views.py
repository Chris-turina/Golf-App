from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import FriendRequestNotification
from django.contrib.auth.models import User
from base.serializers import FriendRequestNotificationSerializer


# Create your views here.

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFRNotification(request, pk):
    print(request.data)
    data = request.data
    friend_request = FriendRequestNotification.objects.get(id=pk)
    
    if data['status'] == 'accepted':
        print('HIT')
        friend_request.action = 2
        friend_request.save()
 
    serializer = FriendRequestNotificationSerializer(friend_request, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteFRNotification(request, pk):
    data = request.data
    friend_request = FriendRequestNotification.objects.get(id=pk)
    
    if data['status'] == 'rejected':
        friend_request.action = 3
        friend_request.save()

    if data['status'] == 'unfriend':
        friend_request.action = 3
        friend_request.save()
    serializer = FriendRequestNotificationSerializer(friend_request, many=False)
    return Response(serializer.data)