# Create your views here.
from django.contrib.auth.models import User
from project.core.models import UserProfile
from django.core.exceptions import ObjectDoesNotExist

def get_or_create_profile(user):
    try:
        profile = user.get_profile()
        except ObjectDoesNotExist:
        #create profile - CUSTOMIZE THIS LINE TO OYUR MODEL:
        profile = UserProfile(agentKey='1', user=user)
        profile.save()
    return profile