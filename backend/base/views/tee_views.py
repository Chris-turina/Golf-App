from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core import serializers
from django.db.models import F

from base.models import GolfCourse, Tee, TeeBox, Hole
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeBoxSerializer, HoleSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
def getTee(request):
    tee = Tee.objects.all()
    serializer = TeeSerializer(tee, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTee(request, pk):
    data = request.data
    tee = Tee.objects.get(id=pk)

    tee.yards = data['yards']

    tee.save()
    serializer = TeeSerializer(tee, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getCourseTees(request, pk):
    golf_course = GolfCourse.objects.get(course_id=pk)
    course_tee_boxes = TeeBox.objects.filter(course=golf_course)

    tees_list = []
    for tee_box in course_tee_boxes:
        color = tee_box.color
        tees = Tee.objects.filter(color=tee_box).annotate(hole_number=F('hole__number')).values('id', 'color__color','hole__number', 'yards')
        tees_list.append({'tee_color': color, 'tees': tees})
        
    return Response(tees_list)
    

