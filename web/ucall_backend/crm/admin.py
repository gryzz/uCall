from crm.models import *
from django.contrib import admin

class CrmCustomerAdmin(admin.ModelAdmin):
    #list_display_links = list_display = ('section', 'key', 'value',)
    pass

admin.site.register(CrmCustomer, CrmCustomerAdmin)

class CrmCustomerNumberAdmin(admin.ModelAdmin):
    #list_display_links = list_display = ('section', 'key', 'value',)
    pass

admin.site.register(CrmCustomerNumber, CrmCustomerNumberAdmin)

class CrmDialogFormAdmin(admin.ModelAdmin):
    #list_display_links = list_display = ('section', 'key', 'value',)
    pass

admin.site.register(CrmDialogForm, CrmDialogFormAdmin)
