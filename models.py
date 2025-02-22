from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('HR', 'HR'),
        ('Candidate', 'Candidate'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)

class HR(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

class Candidate(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)

class Job(models.Model):
    hr = models.ForeignKey(HR, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()

class Application(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)

class Resume(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    resume_text = models.TextField()
