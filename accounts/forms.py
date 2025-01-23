from django import forms
from .models import HR, Candidate, Job, Application

class HRForm(forms.ModelForm):
    username = forms.CharField(max_length=150)  # Add username field to the form

    class Meta:
        model = HR
        fields = ['username', 'email', 'password']  # Match the fields in the HR model

class CandidateForm(forms.ModelForm):
    username = forms.CharField(max_length=150)  # Add username field to the form

    class Meta:
        model = Candidate
        fields = ['username', 'email', 'password']  # Match the fields in the Candidate model
        
class JobForm(forms.ModelForm):
    class Meta:
        model = Job
        fields = ['title', 'description']

class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Application
        fields = ['resume']