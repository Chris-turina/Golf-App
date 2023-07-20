from django.contrib import admin
from django.contrib.auth.models import User

from .models import  Profile,FriendRequestNotification, GolfCourse, TeeColor, Tee, Hole, Round, HoleScore, RoundStats 
# , GolfScore, Round
from .forms import HoleForm, TeeColorForm, TeeForm
# , ScoreForm

# Register your models here.
admin.site.register(Profile)
admin.site.register(FriendRequestNotification)
admin.site.register(GolfCourse)
admin.site.register(TeeColor)
admin.site.register(Hole)
admin.site.register(Tee)
admin.site.register(Round)
admin.site.register(HoleScore)
admin.site.register(RoundStats)