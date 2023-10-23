from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeBox, Round, HoleScore, Hole, Tee, RoundStats
from django.contrib.auth.models import User
from base.serializers import RoundSerializer, HoleScoreSerializer
# Create your views here.

from rest_framework import status

# Gets all of the rounds for the specific user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRounds(request):
    user = request.user
    stats = Round.objects.filter(user=user.id)
    serializer = RoundSerializer(stats, many=True)
    return Response(serializer.data)

# Gets 1 specific round
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRound(request, pk):
    stats = Round.objects.get(id=pk)
    serializer = RoundSerializer(stats, many=False)
    return Response(serializer.data)

#  Deletes the specific Round
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteRound(request, pk):
    roundPlayed = Round.objects.get(id=pk)
    roundStats = RoundStats.objects.get(roundStat=pk)

    # Deletes the Round Instance
    roundPlayed.delete()
    # Deletes the Stats Instanace for this round Instance 
    roundStats.delete()
    
    # TODO Delete Round Stats


    return Response('Round Deleted')
    


# This View Creates a New Round instant, and also Creates a New RoundStat instat
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRound(request, pk, tk):
    newData = request.data
    
    newScores = newData['tees']
    course = GolfCourse.objects.get(course_id=pk)
    tee_box = TeeBox.objects.get(id=tk)
    user = request.user
    
    # empty arrs to then add all items
    parArr = []
    yardsArr = []
    puttsArr = []
    strokesArr = []

    yardsOutArr = []
    yardsInArr = []
    parOutArr = []
    parInArr = []
    puttsOutArr = []
    puttsInArr = []
    scoreOutArr = []
    scoreInArr = []

    # creates a new Round
    newRound = Round.objects.create(
        user = user,
        course = course,
        teeColorUsed = tee_box
    ) 
    
    newRound.save()
    
    # loops through the data recived
    for newScore in newScores:
        print("PRINT", newScore['strokes'])
        hole = Hole.objects.get(course=course, number=newScore['hole__number'])
        tee = Tee.objects.get(id=newScore['id'])

        strokesArr.append(newScore['strokes'])
        puttsArr.append(newScore['putts'])
        parArr.append(hole.par)
        yardsArr.append(tee.yards)

        if hole.number < 10:
            # print('1-9')
            yardsOutArr.append(tee.yards)
            parOutArr.append(hole.par)
            puttsOutArr.append(newScore['putts'])
            scoreOutArr.append(newScore['strokes'])

        else:
            # print('10-18')
            yardsInArr.append(tee.yards)
            parInArr.append(hole.par)
            puttsInArr.append(newScore['putts'])
            scoreInArr.append(newScore['strokes'])
        
        # Creates a new HoleScore Obj
        new_hole_score = HoleScore.objects.create(
            roundStat = newRound,
            hole = hole,
            tee = tee,
            strokes = newScore['strokes'],
            putts = newScore['putts'],
        )

        new_hole_score.save()


    
    # Creates a new Round Stats
    new_round_stat = RoundStats.objects.create(     
        user = user,   
        roundStat = newRound,
        yards_out = sum(yardsOutArr),
        yards_in = sum(yardsInArr),
        par_out = sum(parOutArr),
        par_in = sum(parInArr),
        score_out = sum(scoreOutArr),
        score_in = sum(scoreInArr),
        putts_out = sum(puttsOutArr),
        putts_in = sum(puttsInArr),       
        totalStrokes = sum(strokesArr),
        totalPutts = sum(puttsArr),
        totalCoursePar = sum(parArr),
        totalDistance = sum(yardsArr),
        totalHoles = course.num_of_holes
    )

    new_round_stat.save()

    
    serializer = RoundSerializer(newRound, many=False)
    return Response(serializer.data)
    # return Response('It went through')




