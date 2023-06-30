from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeColor, Hole, Tee, Round, RoundStats
from django.contrib.auth.models import User
from base.serializers import RoundStatsSerializer, GolfCourseSerializer, TeeSerializer, TeeColorSerializer, HoleSerializer
# Create your views here.

from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllRoundStats(request, pk):
    roundStats = RoundStats.objects.all()
    serializer = RoundStatsSerializer(roundStats, many=True)
    return Response (serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoundStat(request, pk):
    roundStat = RoundStats.objects.get(id=pk)
    serializer = RoundStatsSerializer(roundStat, many=False)
    return Response(serializer.data)