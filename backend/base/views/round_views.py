from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeColor, Round, HoleScore, Hole, Tee
from django.contrib.auth.models import User
from base.serializers import RoundSerializer, HoleScoreSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getRounds(request):
    user = request.user
    stats = Round.objects.filter(user=user.id)
    serializer = RoundSerializer(stats, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRound(request, pk):
    stats = Round.objects.get(id=pk)
    serializer = RoundSerializer(stats, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRound(request, pk, tk):
    newScores = request.data
    course = GolfCourse.objects.get(course_id=pk)
    teeColor = TeeColor.objects.get(id=tk)
    user = request.user    
    
    newRound = Round.objects.create(
        user = user,
        course = course,
        teeColorUsed = teeColor
    )    
    
    for newScore in newScores:
        hole = Hole.objects.get(id=newScore['hole'])
        tee = Tee.objects.get(id=newScore['id'])
        print(tee)
        HoleScore.objects.create(
            roundStat = newRound,
            hole = hole,
            tee = tee,
            strokes = newScore['score'],
            putts = newScore['putts'],
        )

    

    


    serializer = RoundSerializer(newRound, many=False)
    # return Response(serializer.data)
    return Response('It went through')




