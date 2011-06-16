from django.db import models

class Config(models.Model):
    section = models.CharField(max_length=255)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __unicode__(self):
	return self.key