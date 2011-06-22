from django.db import models
from formunculous.models import ApplicationDefinition

class CrmCustomerNumber(models.Model):
    phone_number = models.CharField(max_length=255)
    dialog_form = models.ForeignKey(ApplicationDefinition)

    def __unicode__(self):
        return self.phone_number

class CrmCustomer(models.Model):
    title = models.CharField(max_length=255)
    phone_number = models.ForeignKey(CrmCustomerNumber)

    def __unicode__(self):
        return self.title
