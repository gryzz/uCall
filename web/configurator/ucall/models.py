from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True)
    agentKey = models.CharField(max_length=255)
# Create your models here.
