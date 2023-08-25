from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import GolfCourse, TeeBox, Hole, Tee
from django.contrib.auth.models import User
from base.serializers import GolfCourseSerializer, TeeSerializer, TeeBoxSerializer, HoleSerializer


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




@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCourseHoles(request):
    new_holes_data = request.data['holes']

    for new_hole in new_holes_data:
        old_hole = Hole.objects.get(course=new_hole['course'], id=new_hole['id'])
        print(old_hole)
        old_hole.handicap = new_hole['handicap']
        for tee in new_hole['tees']:
            old_tee = Tee.objects.get(id=tee['id'])
            old_tee.par = tee['par']
            old_tee.yards = tee['yards']
            old_tee.save()
        
        old_hole.save()

    return Response("updated Holes")