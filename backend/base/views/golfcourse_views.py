from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeColor, Hole, Tee
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeColorSerializer, HoleSerializer
# Create your views here.

from rest_framework import status


@api_view(['GET'])
def getGolfCourses(request):
    golfCourses = GolfCourse.objects.all()
    serializer = GolfCourseSerializer(golfCourses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getGolfCourse(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    serializer = GolfCourseSerializer(golfCourse, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createGolfCourse(request):
    user = request.user

    golfCourse = GolfCourse.objects.create(
        user = user,
        name='Sample Name',
        numOfHoles = 18,
    )


    serializer = GolfCourseSerializer(golfCourse, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateGolfCourse(request, pk):
    data = request.data
    golfCourse = GolfCourse.objects.get(course_id=pk)

    golfCourse.name = data['name']
    golfCourse.numOfHoles = data['numOfHoles']

    golfCourse.save()

    serializer = GolfCourseSerializer(golfCourse, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteGolfCourse(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    golfCourse.delete()
    return Response('Golf Course Deleted')


# Creates a teeColor for the golf course
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTeeColor(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    teeColor = golfCourse.teecolor_set.create(colors='TeeColor', yards=0, course=golfCourse)
    holes = Hole.objects.filter(course=pk)
    for hole in holes: 
        Tee.objects.create(color=teeColor, yards=0,hole=hole,course=hole.course)

    serializer = TeeColorSerializer(teeColor, many=False)

    return Response(serializer.data)


# Creates the Tee for each hole
# DEPRECATE
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTees(request, pk, tk):
    holes = Hole.objects.get(course=pk)
    teeColor = TeeColor.objects.get(id=tk)
    course = GolfCourse.objects.get(course_id=pk)


    for hole in holes:
        Tee.objects.create(color=teeColor, yards=0, hole=hole, course=course)

    return Response('Created Tees')


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteTees(request, pk,):
    Tee.objects.filter(color=pk).delete()

    return Response('Tees Deleted')



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteTeeColor(reqest,pk, tk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    teeColor = TeeColor.objects.get(id=tk)
    teeColor.delete()
    return Response('Tee Color Deleted')




@api_view(['GET'])
@permission_classes([IsAdminUser])
def getHoles(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    hole = Hole.objects.all()

    serializer = HoleSerializer(hole, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createHole(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    hole = golfCourse.hole_set.create(number=1, par=4, course=golfCourse)

    serializer = HoleSerializer(hole, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBatchHoleEighteen(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    holeBatch = Hole.objects.bulk_create(
        [
            Hole(number=1, par=4, course=golfCourse),
            Hole(number=2, par=4, course=golfCourse),
            Hole(number=3, par=4, course=golfCourse),
            Hole(number=4, par=4, course=golfCourse),
            Hole(number=5, par=4, course=golfCourse),
            Hole(number=6, par=4, course=golfCourse),
            Hole(number=7, par=4, course=golfCourse),
            Hole(number=8, par=4, course=golfCourse),
            Hole(number=9, par=4, course=golfCourse),
            Hole(number=10, par=4, course=golfCourse),
            Hole(number=11, par=4, course=golfCourse),
            Hole(number=12, par=4, course=golfCourse),
            Hole(number=13, par=4, course=golfCourse),
            Hole(number=14, par=4, course=golfCourse),
            Hole(number=15, par=4, course=golfCourse),
            Hole(number=16, par=4, course=golfCourse),
            Hole(number=17, par=4, course=golfCourse),
            Hole(number=18, par=4, course=golfCourse),
        ]
    )

    serializer = HoleSerializer(holeBatch, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBatchHoleNine(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    holeBatch = Hole.objects.bulk_create(
        [
            Hole(number=1, par=4, course=golfCourse),
            Hole(number=2, par=4, course=golfCourse),
            Hole(number=3, par=4, course=golfCourse),
            Hole(number=4, par=4, course=golfCourse),
            Hole(number=5, par=4, course=golfCourse),
            Hole(number=6, par=4, course=golfCourse),
            Hole(number=7, par=4, course=golfCourse),
            Hole(number=8, par=4, course=golfCourse),
            Hole(number=9, par=4, course=golfCourse),            
        ]
    )

    serializer = HoleSerializer(holeBatch, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateHole(request, pk, hk):
    data = request.data
    golfCourse = GolfCourse.objects.get(course_id=pk)
    hole = golfCourse.holes.objects.get(id=hk)

    hole.number = data['number']
    hole.par = data['par']

    hole.save()
    serializer = HoleSerializer(hole, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBatchTeesYards(request, pk, tk):
    newTees = request.data
    teeColor = TeeColor.objects.get(id=tk)
    tees = Tee.objects.filter(color=tk)
    
    for newTee in newTees:
        for tee in tees:
            if tee.id == newTee['id']:                
                tee.yards = newTee['yards']
                tee.save()

    # new_tee_keeys = newTees.keys()
    # print(new_tee_keeys)

    serializer = TeeSerializer(tees, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCourseHoles(request, pk):
    holes = request.data
    oldHoles = Hole.objects.filter(course=pk)
    oldTees = Tee.objects.filter(course=pk)
    
    for hole in holes:   
        oldHole = oldHoles.filter(id=hole['id'])
        oldHole.update(par=hole['par'])
        for tee in hole['tees']:
            oldTee = oldTees.filter(id=tee['id'])
            oldTee.update(yards=tee['yards'])

    return Response('Success')