from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from datetime import datetime, time, date
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    handicap = models.IntegerField(unique=False, default=0)
    friends = models.ManyToManyField('Profile', related_name='profile_friends', blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)
    
    


class FriendRequestNotification(models.Model):
    STATUS_CHOICES = (
    (1 , 'REQUEST'),
    (2 , 'ACCEPTED'),
    (3 , 'REJECT'),
    (4 , 'UNFRIEND'),
    )
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='friend_requests_sent')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='friend_requests_received')
    action = models.IntegerField(choices=STATUS_CHOICES)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.sender}-{self.receiver}-{self.action}"
    




class GolfCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    course_id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=False)
    num_of_holes = models.IntegerField(validators=[MaxValueValidator(18), MinValueValidator(9)], null=True, blank=True, default=0)
    

    def __str__(self):
        return self.name
    


class Hole(models.Model):
    course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, null=True)
    number = models.IntegerField(unique=False)    
    handicap = models.IntegerField(unique=False, default=0, null=True)
    par = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(3)], default=4, null=True)

    class Meta:
        unique_together = (('number','course')) # Each course can only have one hole with each number.

    def __str__(self):
        return 'Hole ' + str(self.number) + ' at ' + str(self.course)



class TeeBox(models.Model):
    course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, null=True)
    color = models.CharField( max_length=255, null=True, blank=True)
    front_nine_yards = models.IntegerField(unique=False, default=0, null=True)
    back_nine_yards = models.IntegerField(unique=False, default=0, null=True)
    total_yards = models.IntegerField(unique=False, default=0, null=True)
    slope = models.IntegerField(unique=False, default=0, null=True)
    handicap = models.IntegerField(unique=False, default=0, null=True)
    par = models.IntegerField(unique=False, default=0, null=True)

    

    def __str__(self):
        return self.color

    

class Tee(models.Model):
    color = models.ForeignKey(TeeBox, on_delete=models.CASCADE, null=True)  
    hole = models.ForeignKey(Hole, on_delete=models.CASCADE, null=True, )
    yards = models.IntegerField(validators=[MaxValueValidator(1000), MinValueValidator(1)], default=0, null=True)
    

    # class Meta:
    #     unique_together = (('color','hole'),) # only have one of each color on the hole

    def __str__(self):
        return str(self.color) + ' TEE '
    # return str(self.color) + ' TEE ' + str(self.hole)






class Round(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    course = models.ForeignKey(GolfCourse, on_delete=models.CASCADE, null=True)
    teeColorUsed = models.ForeignKey(TeeBox, on_delete=models.CASCADE, null=True)
    # Add a Date Played

    def __str__(self):
        return 'Round ' + str(self.id) + ' at ' + str(self.course)
    
    


class HoleScore(models.Model):
    roundStat = models.ForeignKey(Round, on_delete=models.CASCADE, null=True)
    hole = models.ForeignKey(Hole, on_delete=models.CASCADE, null=True, blank=False)
    tee = models.ForeignKey(Tee, on_delete=models.CASCADE, null=True, blank=False)
    strokes = models.IntegerField(validators=[MaxValueValidator(20), MinValueValidator(1)])
    putts = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    # Where did your drive go

    def __str__(self):
        return str(self.hole) + ' ' + str(self.roundStat)


    
class RoundStats(models.Model):
    # Change roundStat - to roundPlayed
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    roundStat = models.ForeignKey(Round, on_delete=models.CASCADE, null=True)
    yards_out = models.IntegerField(validators=[MaxValueValidator(10000), MinValueValidator(1)], blank=True, null=True)
    yards_in = models.IntegerField(validators=[MaxValueValidator(10000), MinValueValidator(1)], blank=True, null=True)
    par_out = models.IntegerField(validators=[MaxValueValidator(50), MinValueValidator(1)], blank=True, null=True)
    par_in = models.IntegerField(validators=[MaxValueValidator(50), MinValueValidator(1)], blank=True, null=True)
    score_out  = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)], default=0)
    score_in = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)], default=0)
    putts_out = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)], default=0)
    putts_in = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)], default=0)
    totalStrokes = models.IntegerField(validators=[MaxValueValidator(200), MinValueValidator(1)])
    totalPutts = models.IntegerField(validators=[MaxValueValidator(200), MinValueValidator(1)])
    totalCoursePar = models.IntegerField(validators=[MaxValueValidator(200), MinValueValidator(1)])
    totalDistance = models.IntegerField(validators=[MaxValueValidator(10000), MinValueValidator(1)], null=True)
    totalHoles = models.IntegerField(validators=[MaxValueValidator(18), MinValueValidator(9)], null=True)

    # total missed fairways
    # Greens in regulation

    
    
    def __str__(self):
        return 'Stats for ' + str(self.roundStat)
    


# class HoleStats(models.Model):
    # fairway hit (left, middle, right)
    # drive distance
    # Clubs used

# class UserStats(models.Model):
    # Rounds played
    # handicap
    # total under over par
    # driving stats
    # puttting stats
    # putts per round average


    



    
    

    











