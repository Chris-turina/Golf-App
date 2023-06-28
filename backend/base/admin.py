from django.contrib import admin

from .models import GolfCourse, TeeColor, Tee, Hole, Round, HoleScore
# , GolfScore, Round
from .forms import HoleForm, TeeColorForm, TeeForm
# , ScoreForm

# Register your models here.

admin.site.register(GolfCourse)
admin.site.register(TeeColor)
admin.site.register(Hole)
admin.site.register(Tee)
admin.site.register(Round)
admin.site.register(HoleScore)