from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile,FriendRequestNotification, GolfCourse, TeeBox, Tee, Hole, Round, HoleScore, RoundStats
from django.db.models import Q
# GolfScore, Round


## Creating the user
class UserSerializer(serializers.ModelSerializer):
    # name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'first_name', 'last_name', 'isAdmin']

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff

    # def get_name(self, obj):
    #     name = obj.first_name
    #     if name == '':
    #         name = obj.email
    #     return name
    
## This class is used to register a new user, it uses the UserSerializer 
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email','first_name','last_name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    




class ProfileSerializer(serializers.ModelSerializer):  
    first_name = serializers.StringRelatedField(source='user.first_name')
    last_name = serializers.StringRelatedField(source='user.last_name')
    username = serializers.StringRelatedField(source='user.username')
    sent_friend_requests = serializers.SerializerMethodField(read_only=True)
    received_friend_requests = serializers.SerializerMethodField(read_only=True)
    friends = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Profile
        fields = [ 'id', 'first_name', 'last_name', 'username', 'handicap', 'friends', 'updated', 'created', 'sent_friend_requests', 'received_friend_requests'  ]
    
    def get_sent_friend_requests(self,obj):
        sent_friend_requests = obj.friend_requests_sent.all()
        serializer = FriendRequestNotificationSerializer(sent_friend_requests, many=True)
        return serializer.data
    
    def get_received_friend_requests(self,obj):
        received_friend_requests = obj.friend_requests_received.all()
        serializer = FriendRequestNotificationSerializer(received_friend_requests, many=True)
        return serializer.data
    
    def get_friends(self, obj):
        profiles = obj.profile_friends.all()        
        current_user = obj
        if profiles:
            profiles_details= []
            for profile in profiles:            
                sent = obj.friend_requests_sent.filter(Q(sender=current_user) | Q(receiver=current_user)).values()
                received = obj.friend_requests_received.filter(Q(sender=current_user) | Q(receiver=current_user)).values()            
                
                if received and not sent:                    
                    request_id = received[0]['id']            
                if sent and not received:                    
                    request_id = sent[0]['id']

                profiles_details.append({                
                    "first_name":profile.user.first_name,
                    "last_name":profile.user.last_name,
                    "username":profile.user.username,
                    "profile_id":profile.id,
                    # "friend_request_id":request_id
                })
        else:            
            profiles_details= []
        
        return profiles_details



class FriendRequestNotificationSerializer(serializers.ModelSerializer):
    # receiver = serializers.StringRelatedField(read_only=True, many=False)
    # sender = serializers.StringRelatedField(read_only=True, many=False)
    receiver = serializers.SerializerMethodField(read_only=True)
    sender = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FriendRequestNotification 
        fields = ['id','sender', 'receiver', 'action', 'updated', 'created']  
        depth = 1      

    def get_sender(self,obj):
        user = User.objects.get(profile=obj.sender)        
        data = {"first_name":user.first_name, "last_name":user.last_name, "profile_id": user.profile.id}        
        return data
    
    def get_receiver(self,obj):        
        user = User.objects.get(profile=obj.receiver)        
        data = {"first_name":user.first_name, "last_name":user.last_name, "profile_id": user.profile.id}
        return data




class TeeBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeeBox
        fields = '__all__'


class TeeSerializer(serializers.ModelSerializer):
    color = serializers.StringRelatedField(many=False)
    hole = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='number'
    )

    class Meta:
        model = Tee
        fields = ['id', 'color', 'hole', 'yards']   

    def get_hole(self, obj):
        return {'hole':obj.hole.number }


            

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
    tee_boxes = serializers.SerializerMethodField(read_only=True)
    holes = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = GolfCourse
        # fields = '__all__'
        fields = ['user', 'course_id', 'name', 'num_of_holes','tee_boxes', 'holes' ]

    def get_holes(self, obj):
        holes = obj.hole_set.all()
        serializer = HoleSerializer(holes, many=True)
        return serializer.data    

    def get_tee_boxes(self, obj):
        tee_boxes = obj.teebox_set.all()
        serializer = TeeBoxSerializer(tee_boxes, many=True)
        return serializer.data

    

    
class HoleScoreSerializer(serializers.ModelSerializer):
    hole = serializers.IntegerField(source='hole.number')
    par = serializers.IntegerField(source='hole.par')
    tee = serializers.IntegerField(source='tee.yards')
    class Meta:
        model = HoleScore
        fields = [ 'roundStat', 'hole', 'tee', 'strokes', 'putts', 'par' ]       


class RoundStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoundStats
        fields = '__all__'



class RoundSerializer(serializers.ModelSerializer):
    course = serializers.StringRelatedField(many=False)  
    teeColorUsed = serializers.StringRelatedField(many=False)    
    holeScores = serializers.SerializerMethodField(read_only=True)
    roundStats = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Round
        fields = [ 'id', 'course', 'teeColorUsed', 'course', 'holeScores', 'user', 'roundStats']
        

    def get_holeScores(self, obj):
        holeScores = obj.holescore_set.all()
        serializer = HoleScoreSerializer(holeScores, many=True)
        return serializer.data
    
    def get_roundStats(self, obj):
        roundStats = obj.roundstats_set.all()
        serializer = RoundStatsSerializer(roundStats, many=True)
        return serializer.data



# Stats Serializers


