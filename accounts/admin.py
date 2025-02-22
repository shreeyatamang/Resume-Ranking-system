from django.contrib import admin
from .models import CustomUser, HR, Candidate, Job, Application  # Import Application model

admin.site.register(CustomUser)
admin.site.register(HR)
admin.site.register(Candidate)
admin.site.register(Job)  # Register the Job model
admin.site.register(Application)  # Register the Application model