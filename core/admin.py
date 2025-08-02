from django.contrib import admin
from .models import Profile, SavedJob, Goal

# Register your models here.
admin.site.register(Profile)
admin.site.register(SavedJob)
admin.site.register(Goal)