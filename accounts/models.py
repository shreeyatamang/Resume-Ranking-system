from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('HR', 'HR'),
        ('Candidate', 'Candidate'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

class HR(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='hr')
    organization_name = models.CharField(max_length=255)
    organization_email = models.EmailField()

class Candidate(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    role = models.CharField(max_length=255)

class Job(models.Model):
    hr = models.ForeignKey(HR, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    resume_file = models.FileField(upload_to='resumes/')
    applied_at = models.DateTimeField(auto_now_add=True)
    rank = models.IntegerField(null=True, blank=True)
    resume_content = models.TextField()

class JobDescription(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    description = models.TextField()

class Resume(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    resume_text = models.TextField()