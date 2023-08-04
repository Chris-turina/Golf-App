from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, Hole, Tee, Round, HoleScore
from django.contrib.auth.models import User
from base.serializers import HoleScoreSerializer
# Create your views here.

from rest_framework import status

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHoleScores(request):
    scores = HoleScore.objects.all()
    serializer = HoleScoreSerializer(scores, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getHoleScore(request, pk):
    scores = HoleScore.objects.get(id=pk)
    serializer = HoleScoreSerializer(scores, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createHoleScore(request, pk, tk, hk):
    roundStat = Round.objects.get(course_id=pk)
    tee = Tee.objects.get(id=tk)
    hole = Hole.objects.get(id=hk)

    newScore = HoleScore.objects.create(
        roundStat = roundStat,
        hole = hole,
        tee = tee,
        score = 7,
        putts =2, 
    )

    serializer = HoleScoreSerializer(newScore, many=False)
    return Response(serializer.data)






