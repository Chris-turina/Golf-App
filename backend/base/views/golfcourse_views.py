from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeBox, Hole, Tee
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeBoxSerializer, HoleSerializer
# Create your views here.

from rest_framework import status

# Gets all courses 
@api_view(['GET'])
def getGolfCourses(request):
    golfCourses = GolfCourse.objects.all()
    serializer = GolfCourseSerializer(golfCourses, many=True)
    return Response(serializer.data)

# Gets 1 golf course
@api_view(['GET'])
def getGolfCourse(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    serializer = GolfCourseSerializer(golfCourse, many=False)
    return Response(serializer.data)



# Creates a Golf Course, and the number of tee boxes inputed, and the holes, and all the tees for the hole
# IN USE
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createGolfCourse(request):
    user = request.user
    data = request.data
    num_of_tee_boxes = request.data['num_of_tee_boxes']
    num_of_holes = request.data['num_of_holes']
    tee_box_list = list()
    tee_list = list()
    holes_list = list()
    starting_num = 1
    

    golfCourse = GolfCourse.objects.create(
        user = user,
        name = data['name'],
        num_of_holes = data['num_of_holes'] ,
    )

    for _ in range(num_of_tee_boxes):
        tee_box = TeeBox(course= golfCourse, color='Color', front_nine_yards= 0, back_nine_yards=0, total_yards=0, slope=0, handicap=0, par=0 )
        tee_box_list.append(tee_box)
        
    for _ in range(num_of_holes):
        holes_list.append(
            Hole(course= golfCourse, number= starting_num, handicap= 0))
        starting_num = starting_num + 1

    for hole in holes_list:
        for tee_box in tee_box_list:
            tee_list.append(
                Tee(color=tee_box, hole=hole, yards=0, par=4)
            )

    TeeBox.objects.bulk_create(tee_box_list)
    Hole.objects.bulk_create(holes_list)
    Tee.objects.bulk_create(tee_list)

    serializer = GolfCourseSerializer(golfCourse, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getNewAddedGolfCourse(request):
    golf_course = GolfCourse.objects.latest('course_id', 'user')
    print(golf_course)

    serializer = GolfCourseSerializer(golf_course, many=False)
    return Response(serializer.data)
    

# Updates a Golf Course
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


# Deletes a Golf Course
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteGolfCourse(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    golfCourse.delete()
    return Response('Golf Course Deleted')


# Creates a tee_box for the golf course
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTeeBox(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    tee_box = golfCourse.teebox_set.create(colors='New Tee', front_nine_yards=0, back_nine_yards=0, total_yards=0, course=golfCourse)
    holes = Hole.objects.filter(course=pk)
    
    for hole in holes: 
        Tee.objects.create(color=tee_box, yards=0,hole=hole )

    serializer = TeeBoxSerializer(tee_box, many=False)

    return Response(serializer.data)


# Creates the Tee for each hole
# DEPRECATE
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTees(request, pk, tk):
    holes = Hole.objects.get(course=pk)
    tee_box = TeeBox.objects.get(id=tk)
    course = GolfCourse.objects.get(course_id=pk)


    for hole in holes:
        Tee.objects.create(color=tee_box, yards=0, hole=hole, course=course)

    return Response('Created Tees')


# Deletes the Tees
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteTees(request, pk,):
    Tee.objects.filter(color=pk).delete()

    return Response('Tees Deleted')


# Delete the TeeBox instance
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteTeeBox(reqest,pk, tk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    tee_box = TeeBox.objects.get(id=tk)
    tee_box.delete()
    return Response('Tee Color Deleted')



# Gets all the holes for a Golf Course
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getHoles(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    hole = Hole.objects.all()

    serializer = HoleSerializer(hole, many=True)
    return Response(serializer.data)


# Creates the holes of a Golf Course instance
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createHole(request, pk):
    golfCourse = GolfCourse.objects.get(course_id=pk)
    hole = golfCourse.hole_set.create(number=1, par=4, course=golfCourse)

    serializer = HoleSerializer(hole, many=False)
    return Response(serializer.data)


# Creates 18 holes
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

# Creates 9 holes
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


# Updates the Hole information
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
    tee_box = TeeBox.objects.get(id=tk)
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


# Updates the holes information
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCourseHoles(request, pk):
    holes = request.data
    oldHoles = Hole.objects.filter(course=pk)
    oldTees = Tee.objects.filter(hole__course=pk)


    for hole in holes:   
        oldHole = oldHoles.filter(id=hole['id'])
        oldHole.update(par=hole['par'])
        for tee in hole['tees']:
            oldTee = oldTees.filter(id=tee['id'])
            oldTee.update(yards=tee['yards'])

    return Response('Success')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCourseTeeBoxes(request, pk):
    tee_boxes = request.data
    old_tee_boxes = TeeBox.objects.filter(course=pk)
    
    for tee_box in tee_boxes:        
        old_tee_box = old_tee_boxes.filter(id=tee_box['id'])
        old_tee_box.update(colors=tee_box['colors'])
        old_tee_box.update(back_nine_yards=tee_box['back_nine_yards'])
        old_tee_box.update(front_nine_yards=tee_box['front_nine_yards'])
        old_tee_box.update(total_yards=tee_box['total_yards'])
    
    return Response('Success')