from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import GolfCourse, TeeColor, Tee, Hole, Round, HoleScore, RoundStats
# GolfScore, Round


## Creating the user
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
## This class is used to register a new user, it uses the UserSerializer 
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)






class TeeColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeColor
        fields = '__all__'

class TeeSerializer(serializers.ModelSerializer):
    # teeColor = serializers.SerializerMethodField(read_only=True)
    color = serializers.StringRelatedField(many=False)    
    class Meta:
        model = Tee
        fields = ['id', 'color', 'hole', 'yards', 'course']    
            

class HoleSerializer(serializers.ModelSerializer):
    tees = serializers.SerializerMethodField(read_only=True)    
    class Meta:
        model = Hole
        fields = '__all__'

    def get_tees(self,obj):
        tees = obj.tee_set.all()
        serializer = TeeSerializer(tees, many=True)        
        return serializer.data
    


class GolfCourseSerializer(serializers.ModelSerializer):
    teeColors = serializers.SerializerMethodField(read_only=True)
    holes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = GolfCourse
        # fields = '__all__'
        fields = ['user', 'course_id', 'name', 'numOfHoles','teeColors', 'holes' ]

    def get_holes(self, obj):
        holes = obj.hole_set.all()
        serializer = HoleSerializer(holes, many=True)
        return serializer.data    

    def get_teeColors(self, obj):
        teeColors = obj.teecolor_set.all()
        serializer = TeeColorSerializer(teeColors, many=True)
        return serializer.data

    



    
class HoleScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoleScore
        fields = '__all__'        

class RoundSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(many=False)  
    teeColorUsed = serializers.StringRelatedField(many=False)    
    holeScores = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Round
        fields = [ 'id', 'course', 'teeColorUsed', 'course', 'holeScores', 'user']
        

    def get_holeScores(self, obj):
        holeScores = obj.holescore_set.all()
        serializer = HoleScoreSerializer(holeScores, many=True)
        return serializer.data



# Stats Serializers

class RoundStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoundStats
        fields = '__all__'
