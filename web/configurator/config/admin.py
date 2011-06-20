from config.models import Config
from django.contrib import admin

class ConfigAdmin(admin.ModelAdmin):
    list_display_links = list_display = ('section', 'key', 'value',)

admin.site.register(Config, ConfigAdmin)
