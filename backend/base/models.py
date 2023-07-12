from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from datetime import datetime, time, date
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.


class GolfCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    course_id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=False)
    numOfHoles = models.IntegerField(validators=[MaxValueValidator(18), MinValueValidator(9)], null=True, blank=True, default=0)
    

    def __str__(self):
        return self.name
    

class Hole(models.Model):
    course = models.ForeignKey(GolfCourse, on_delete=models.SET_NULL, null=True)
    number = models.IntegerField(unique=False)
    par = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(3)])

    class Meta:
        unique_together = (('number','course')) # Each course can only have one hole with each number.

    def __str__(self):
        return 'Hole ' + str(self.number) + ' at ' + str(self.course)



class TeeColor(models.Model):
    course = models.ForeignKey(GolfCourse, on_delete=models.SET_NULL, null=True)
    colors = models.CharField( blank=False, null=True, max_length=255)
    front_nine_yards = models.IntegerField(unique=False, default=0)
    back_nine_yards = models.IntegerField(unique=False, default=0)
    total_yards = models.IntegerField(unique=False, default=0)
    added_to_holes = models.BooleanField(default=False)

    

    def __str__(self):
        return self.colors

    

class Tee(models.Model):
    color = models.ForeignKey(TeeColor, on_delete=models.SET_NULL, null=True)  
    hole = models.ForeignKey(Hole, on_delete=models.SET_NULL, null=True, blank=False)
    yards = models.IntegerField(validators=[MaxValueValidator(1000), MinValueValidator(1)])

    # class Meta:
    #     unique_together = (('color','hole'),) # only have one of each color on the hole

    def __str__(self):
        return str(self.color) + ' TEE ' + str(self.hole)



class Round(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    course = models.ForeignKey(GolfCourse, on_delete=models.SET_NULL, null=True)
    teeColorUsed = models.ForeignKey(TeeColor, on_delete=models.SET_NULL, null=True)
    # Add a Date Played

    def __str__(self):
        return 'Round ' + str(self.id) + ' at ' + str(self.course)
    
    
class HoleScore(models.Model):
    roundStat = models.ForeignKey(Round, on_delete=models.SET_NULL, null=True)
    hole = models.ForeignKey(Hole, on_delete=models.SET_NULL, null=True, blank=False)
    tee = models.ForeignKey(Tee, on_delete=models.SET_NULL, null=True, blank=False)
    strokes = models.IntegerField(validators=[MaxValueValidator(20), MinValueValidator(1)])
    putts = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    # Where did your drive go

    def __str__(self):
        return str(self.hole) + ' ' + str(self.roundStat)


    
class RoundStats(models.Model):
    roundStat = models.ForeignKey(Round, on_delete=models.SET_NULL, null=True)
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

# class UserStats(models.Model):
    # Rounds played
    # handicap
    # total under over par
    # driving stats
    # puttting stats
    # putts per round average


    



    
    

    











