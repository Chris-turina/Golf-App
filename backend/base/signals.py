
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile, FriendRequestNotification

# def upadateUser(sender, instance, **kwargs):
#     user = instance
#     if user.email != '':
#         user.username = user.email

# pre_save.connect(upadateUser, sender=User)

# Once a user is created, a profile is automatically created as well
@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, **kwargs):
    if created: 
        Profile.objects.create(user=instance)

@receiver(post_save, sender=FriendRequestNotification)
def post_save_add_to_friends(sender, created, instance, **kwargs):
    sender_ = instance.sender
    receiver_ = instance.receiver
    if instance.action==2:
        sender_.friends.add(receiver_.user)
        receiver_.friends.add(sender_.user)
        sender_.save()
        receiver_.save()