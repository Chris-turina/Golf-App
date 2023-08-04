from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, Hole
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, HoleSerializer
# Create your views here.

@api_view(['GET'])
def getHoles(request):
    holes = Hole.objects.all()
    serializer = HoleSerializer(holes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getHole(request, pk):
    hole = Hole.objects.get(id=pk)
    serializer = HoleSerializer(hole, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateHolePar(request, pk):
    data = request.data
    hole = Hole.objects.get(id=pk)

    hole.par = data['par']

    hole.save()
    serializer = HoleSerializer(hole, many=False)
    return Response(serializer.data)
