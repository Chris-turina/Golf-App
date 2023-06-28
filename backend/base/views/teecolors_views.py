from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeColor
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeColorSerializer, HoleSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
def getTeeColors(request):
    teeColors = TeeColor.objects.all()
    serializer = TeeColorSerializer(teeColors, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTeeColor(request, pk):
    data = request.data
    teeColor = TeeColor.objects.get(id=pk)

    teeColor.colors = data['colors']
    teeColor.yards = data['yards']

    teeColor.save()

    serializer = TeeColorSerializer(teeColor, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def addTeeColorToHolesBool(request, pk):
    data = request.data
    teeColor = TeeColor.objects.get(id=pk)

    teeColor.added_to_holes = data['added_to_holes']

    teeColor.save()

    serializer = TeeColorSerializer(teeColor, many=False)
    return Response(serializer.data)
