from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeBox
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeBoxSerializer, HoleSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
def getTeeBoxes(request):
    tee_boxes = TeeBox.objects.all()
    serializer = TeeBoxSerializer(tee_boxes, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTeeBox(request, pk):
    data = request.data
    tee_box = TeeBox.objects.get(id=pk)

    tee_box.colors = data['colors']
    tee_box.yards = data['yards']

    tee_box.save()

    serializer = TeeBoxSerializer(tee_box, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def addTeeBoxToHolesBool(request, pk):
    data = request.data
    tee_box = TeeBox.objects.get(id=pk)

    tee_box.added_to_holes = data['added_to_holes']

    tee_box.save()

    serializer = TeeBoxSerializer(tee_box, many=False)
    return Response(serializer.data)
