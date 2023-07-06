from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeColor, Round, HoleScore, Hole, Tee, RoundStats
from django.contrib.auth.models import User
from base.serializers import RoundSerializer, HoleScoreSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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


# This View Creates a New Round instant, and also Creates a New RoundStat instat
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRound(request, pk, tk):
    newScores = request.data
    course = GolfCourse.objects.get(course_id=pk)
    teeColor = TeeColor.objects.get(id=tk)
    user = request.user   
    
    
    # empty arrs to then add all items
    parArr = []
    puttsArr = []
    strokesArr = []
    
    # empty vars to have the final nubmbersd in
    roundYards = teeColor.yards
    roundPar = 0
    roundPutts = 0
    roundStrokes = 0
    roundHoles = course.numOfHoles

    # creates a new Round
    newRound = Round.objects.create(
        user = user,
        course = course,
        teeColorUsed = teeColor
    )    
    
    # loops through the data recived
    for newScore in newScores:
        hole = Hole.objects.get(id=newScore['hole'])
        tee = Tee.objects.get(id=newScore['id'])
        
        
        
        # These are for creating the stats
        parArr.append(hole.par)
        puttsArr.append(newScore['putts'])
        strokesArr.append(newScore['score'])

        # Creates a new HoleScore Obj
        HoleScore.objects.create(
            roundStat = newRound,
            hole = hole,
            tee = tee,
            strokes = newScore['score'],
            putts = newScore['putts'],
        )
    
    roundPar = sum(parArr)
    roundPutts = sum(puttsArr)
    roundStrokes = sum(strokesArr)
    
    # Creates a new Round Stats
    RoundStats.objects.create(
        roundStat = newRound,
        totalStrokes = roundStrokes,
        totalPutts = roundPutts,
        totalCoursePar = roundPar,
        totalDistance = roundYards,
        totalHoles = roundHoles
    )

    
    serializer = RoundSerializer(newRound, many=False)
    return Response(serializer.data)
    # return Response('It went through')




