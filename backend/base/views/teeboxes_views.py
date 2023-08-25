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




# Bulk TeeBox Update

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBulkTeeBoxes(request):
    new_tee_boxes = request.data['teeBoxes']

    for new_tee_box in new_tee_boxes:
        old_tee_box = TeeBox.objects.get(course=new_tee_box['course'], id=new_tee_box['id'])
        
        old_tee_box.color = new_tee_box['color']
        old_tee_box.front_nine_yards = new_tee_box['front_nine_yards']
        old_tee_box.back_nine_yards = new_tee_box['back_nine_yards']
        old_tee_box.total_yards = new_tee_box['total_yards']
        old_tee_box.slope = new_tee_box['slope']
        old_tee_box.handicap = new_tee_box['handicap']
        old_tee_box.par = new_tee_box['par']

        old_tee_box.save()

    return Response("Update Tees")
