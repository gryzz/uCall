from django.db import models

class Config(models.Model):
    CONFIG_SECTIONS = (
        (u'general', u'general'),
        (u'stomp', u'stomp'),
        (u'ami', u'ami'),
    )

    section = models.CharField(max_length=255, choices=CONFIG_SECTIONS)
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)

    def __unicode__(self):
        return self.key
