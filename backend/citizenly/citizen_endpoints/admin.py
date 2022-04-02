from django.contrib import admin
from citizen_endpoints.models import Device, Institution, Location
# Register your models here.

class AuthorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Institution, AuthorAdmin)
admin.site.register(Location, AuthorAdmin)
admin.site.register(Device, AuthorAdmin)
