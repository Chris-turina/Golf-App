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
def getRoundStats(request, pk):
    roundStats = RoundStats.objects.get(id=pk)
    serializer = RoundStatsSerializer(roundStats, many=False)
    return Response (serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoundStats(request, pk):
    # Get Round
    linkedRound = Round.objects.filter(id=pk)
    # Get course
    course = GolfCourse.objects.filter(id=linkedRound.course)
    # Get Holes for course
    
    # Get Tee Colors total yards 
    totalYards = linkedRound.teeColorUsed
    roundStats = 0


    serializer = RoundStatsSerializer(roundStats, many=False)
    return Response(serializer.data)
