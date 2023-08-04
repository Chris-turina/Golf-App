from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.core.exceptions import NON_FIELD_ERRORS # lets us use a custom error message
from django.contrib.auth.models import User

from .models import Hole, Tee, TeeBox




class HoleForm(ModelForm):
    class Meta:
        model = Hole
        fields = ('number', 'course', 'handicap')
        # Course is set automatically
        widgets = {
            'course': forms.HiddenInput,
        }
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "The %(model_name)s already exist for this course"
            }
        }

class TeeBoxForm(ModelForm):
    class Meta:
        model: TeeBox
        fields = ('colors',)
        widegts = {
            #course is set automatically
            'hole': forms.HiddenInput
        }
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "The %(model_name)s already exist for this course"
            }
        }

class TeeForm(ModelForm):
    class Meta:
        model: Tee
        fields = ('color', 'yards', 'hole')
        widgets = {
        # Hole is set automaticaly 
            'hole': forms.HiddenInput,
        }
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "The %(model_name)s already exists for this course.",
            }
        }

# class ScoreForm(ModelForm):
#     class Meta:
#         model: GolfScore
#         fields = ('golf_round', 'hole', 'strokes')
#         widgets = {
#             #Hole and Round are set automatically
#             'hole': forms.HiddenInput,
#             'round': forms.HiddenInput,
#         }
#         error_messages = {
#             NON_FIELD_ERRORS: {
#                 'unique_together': "The %(model_name)s already exists for this course.",
#             }
#         }

