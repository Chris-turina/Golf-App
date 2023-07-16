from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from datetime import datetime, time, date
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

# class UserStats(models.Model):
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

# PLAYING WITH CHANGING THE BASE USER MODEL TO A CUSTOM USER MODEL NAMED PROFILE
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
#     # rounds_played
#     # handicap

#     # average_round_score
#     # average_putts_per_round

#     def __str__(self):
#         return self.user.username


# Custom User Model

# class MyAccountManager(BaseUserManager):

#     def create_user(self, email, username, password=None):
#         if not email:
#             raise ValueError('Users must have an email address')
#         if not username:
#             raise ValueError('Users must have a username')
#         user = self.model(
#             email=self.normalize_email(email),
#             username=username,            

#         )
#         user.set_password(password)
#         user.save(usering=self._db)
#         return user
    
#     def create_superuser(self, email, username, password):
#         user = self.create_user(
#             email=self.normalize_email(email),
#             username=username,
#             password=password
#         )
#         user.is_admin = True
#         user.is_staff = True
#         user.is_superuser = True
#         user.save(using=self._db)
#         return user

# class Account(AbstractBaseUser):
#     email = models.EmailField(verbose_name="email", max_length=60, unique=True)
#     username = models.CharField(max_length=30, unique=True)
#     date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
#     last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
#     is_admin = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=False)
#     is_superuser = models.BooleanField(default=False)
#     hide_email = models.BooleanField(default=True)

#     objects = MyAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']

#     def __str__(self):
#         return self.username
    
#     def has_perm(self, perm, obj=None):
#         return self.is_admin
    
#     def has_module_perms(self, app_label):
#         return True



# class FriendList(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user")
#     friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="friends")

#     def __str__(self):
#         return self.user.username
     
#     def add_friend(self, account):
         
#         if not account in self.friends.all():
#              self.friends.add(account)
             
#     def remove_friend(self, account):
#         if account in self.friends.all():
#             self.friends.remove(account) 

#     def unfriend(self, removee):
#         remover_friends_list = self
#         remover_friends_list.remove_friend(removee)
#         friends_list = FriendList.objects.get(user=removee)
#         friends_list.remove_friend(self.user)

#     def is_mutual_friend(self, friend):
#         if friend in self.friends.all():
#             return True
#         return False
    
# class FriendRequest(models.Model):
#     sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sender")
#     receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="receiver")
#     is_active = models.BooleanField(blank=True, null=False, default=True)
#     timestamp = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.sender.username
    
#     def accept(self):
#         receiver_friend_list = FriendList.objects.get(user=self.receiver)
#         if receiver_friend_list:
#             receiver_friend_list.add_friend(self.sender)
#             sender_friend_list = FriendList.objects.get(user=self.sender)
#             if sender_friend_list:
#                 sender_friend_list.add_friend(self.receiver)
#                 self.is_active = False
#                 self.save

#     def decline(self):
#         self.is_active = False
#         self.save()

#     def cancel(self):
#         self.is_active = False
#         self.save()



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
    # Change roundStat - to roundPlayed
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    roundStat = models.ForeignKey(Round, on_delete=models.SET_NULL, null=True)
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

# class UserStats(models.Model):
    # Rounds played
    # handicap
    # total under over par
    # driving stats
    # puttting stats
    # putts per round average


    



    
    

    











