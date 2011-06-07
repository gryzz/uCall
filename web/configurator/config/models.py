from django.db import models
from django.contrib.auth.models import User

class Config(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    
class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True)
    agentKey = models.CharField(max_length=255)
