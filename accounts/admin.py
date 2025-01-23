
from django.contrib import admin
from .models import CustomUser, HR, Candidate, Job, Application

admin.site.register(CustomUser)
admin.site.register(HR)
admin.site.register(Candidate)
admin.site.register(Job)
admin.site.register(Application)