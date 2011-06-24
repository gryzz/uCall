from crm.models import *
from django.contrib import admin

class CrmCustomerAdmin(admin.ModelAdmin):
    #list_display_links = list_display = ('section', 'key', 'value',)
    pass

admin.site.register(CrmCustomer, CrmCustomerAdmin)

class CrmCustomerNumberAdmin(admin.ModelAdmin):
    list_display_links = list_display = ('phone_number', 'dialog_form', 'crm_adapter')
    list_filter = ('crm_adapter',)

admin.site.register(CrmCustomerNumber, CrmCustomerNumberAdmin)

class CrmAdapterTypeAdmin(admin.ModelAdmin):
    pass

admin.site.register(CrmAdapterType, CrmAdapterTypeAdmin)

class CrmAdapterOptionAdmin(admin.ModelAdmin):
    list_display_links = list_display = ('adapter', 'key', 'value')

admin.site.register(CrmAdapterOption, CrmAdapterOptionAdmin)

class CrmAdapterAdmin(admin.ModelAdmin):
    list_display_links = list_display = ('title', 'type')

admin.site.register(CrmAdapter, CrmAdapterAdmin)
