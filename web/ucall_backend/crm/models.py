from django.db import models
from formunculous.models import ApplicationDefinition

class CrmAdapterType(models.Model):
    title = models.CharField(max_length=255)
    
    def __unicode__(self):
        return self.title

class CrmAdapter(models.Model):
    title = models.CharField(max_length=255)
    type = models.ForeignKey(CrmAdapterType)
    
    def __unicode__(self):
        return self.title

class CrmAdapterOption(models.Model):
    key = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    adapter = models.ForeignKey(CrmAdapter)

class CrmCustomerNumber(models.Model):
    # TODO: one-to-one relationship
    phone_number = models.CharField(max_length=255)
    dialog_form = models.ForeignKey(ApplicationDefinition)
    crm_adapter = models.ForeignKey(CrmAdapter)

    def __unicode__(self):
        return self.phone_number

class CrmCustomer(models.Model):
    title = models.CharField(max_length=255)
    phone_number = models.ForeignKey(CrmCustomerNumber)

    def __unicode__(self):
        return self.title
