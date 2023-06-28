from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, Tee
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeColorSerializer, HoleSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
def getTee(request):
    tee = Tee.objects.all()
    serializer = TeeSerializer(tee, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateTeeYards(request, pk):
    data = request.data
    tee = Tee.objects.get(id=pk)

    tee.yards = data['yards']

    tee.save()
    serializer = TeeSerializer(tee, many=False)
    return Response(serializer.data)


