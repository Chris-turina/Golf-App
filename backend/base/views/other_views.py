# from django.shortcuts import render
# from django.http import JsonResponse
# from rest_framework.views import APIView
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated, IsAdminUser
# from rest_framework.response import Response
# from django.views.generic import DetailView

# from .models import GolfCourse, TeeColor, Tee, Hole, GolfScore, Round
# from .golfcourses import golfCourses
# from django.contrib.auth.models import User
# from .serializers import GolfCourseSerializer, TeeSerializer, TeeColorSerializer, HoleSerializer, UserSerializer, UserSerializerWithToken 
# # Create your views here.

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView

# from django.contrib.auth.hashers import make_password
# from rest_framework import status




# @api_view(['GET'])
# def getHoles(request):
#     holes = Hole.objects.all()
#     serializer = HoleSerializer(holes, many=True)
#     return Response(serializer.data)


# @api_view(['GET'])
# def getTee(request):
#     tees = Tee.objects.all()
#     serializer = TeeSerializer(tees, many=True)
#     return Response(serializer.data)

# @api_view(['GET'])
# def getTeeColors(request):
#     teeColors = TeeColor.objects.all()
#     serializer = TeeColorSerializer(teeColors, many=True)
#     return Response(serializer.data)





# @api_view(['GET'])
# def getTeeTimes(request, pk):
#     golfCourse = None
#     for i in golfCourses:
#         if i['_id'] == pk:
#             golfCourse = i
#             break

