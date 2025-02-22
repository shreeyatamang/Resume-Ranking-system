from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.views import View
from .models import CustomUser, HR, Candidate, Job, Application
from .forms import HRForm, CandidateForm, JobForm, ApplicationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout


def home(request):
    return render(request, 'accounts/home.html')

class HRRegistrationView(View):
    def get(self, request):
        form = HRForm()
        return render(request, 'accounts/register_as_hr.html', {'form': form})

    def post(self, request):
        form = HRForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            if CustomUser.objects.filter(username=username).exists():
                messages.error(request, "Username already exists.")
                return render(request, 'accounts/register_as_hr.html', {'form': form})
            hr = form.save(commit=False)
            hr.user = CustomUser.objects.create_user(username=username, password=password)
            hr.user.user_type = 'HR'
            hr.user.save()
            hr.save()
            messages.success(request, "Registration successful. You can now log in.")
            return redirect('login_hr')
        return render(request, 'accounts/register_as_hr.html', {'form': form})

class CandidateRegistrationView(View):
    def get(self, request):
        form = CandidateForm()
        return render(request, 'accounts/register_as_candidate.html', {'form': form})

    def post(self, request):
        form = CandidateForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            email = form.cleaned_data.get('email')
            if CustomUser.objects.filter(username=username).exists():
                messages.error(request, "Username already exists.")
                return render(request, 'accounts/register_as_candidate.html', {'form': form})
            user = CustomUser.objects.create_user(username=username, password=password, email=email)
            user.user_type = 'Candidate'
            user.save()
            candidate = form.save(commit=False)
            candidate.user = user
            candidate.save()
            messages.success(request, "Registration successful. You can now log in.")
            return redirect('login_candidate')
        return render(request, 'accounts/register_as_candidate.html', {'form': form})

class LoginView(View):
    def get(self, request):
        return render(request, 'accounts/login.html')

    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            if user.user_type == 'HR':
                return redirect('hr_dashboard')
            elif user.user_type == 'Candidate':
                return redirect('candidate_dashboard')
        else:
            messages.error(request, "Invalid login credentials.")
        
        return render(request, 'accounts/login.html')

def register_hr(request):
    if request.method == 'POST':
        form = HRForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            if CustomUser.objects.filter(username=username).exists():
                messages.error(request, "Username already exists.")
                return render(request, 'accounts/register_as_hr.html', {'form': form})
            hr = form.save(commit=False)
            hr.user = CustomUser.objects.create_user(username=username, password=password)
            hr.user.user_type = 'HR'
            hr.user.save()
            hr.save()
            messages.success(request, "Registration successful. You can now log in.")
            return redirect('login_hr')
    else:
        form = HRForm()
    return render(request, 'accounts/register_as_hr.html', {'form': form})

def register_candidate(request):
    if request.method == "POST":
        form = CandidateForm(request.POST)
        if form.is_valid():
            candidate = form.save(commit=False)
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            candidate.user = CustomUser.objects.create_user(username=username, password=password)
            candidate.user.user_type = 'Candidate'
            candidate.user.save()
            candidate.save()
            messages.success(request, "Registration successful. You can now log in.")
            return redirect('login_candidate')
    else:
        form = CandidateForm()
    return render(request, 'accounts/register_as_candidate.html', {'form': form})

def hr_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None and hasattr(user, 'user_type') and user.user_type == 'HR':
            login(request, user)
            return redirect('hr_dashboard')
        else:
            messages.error(request, "Invalid login credentials or you are not an HR user.")
    
    return render(request, 'accounts/login_as_hr.html')

@login_required
def hr_dashboard(request):
    if request.user.user_type != 'HR':
        return redirect('home')
    
    jobs = Job.objects.filter(hr=request.user.hr)
    applications = Application.objects.filter(job__in=jobs)
    return render(request, 'accounts/hr_dashboard.html', {'jobs': jobs, 'applications': applications})

@login_required
def candidate_dashboard(request):
    if request.user.user_type != 'Candidate':
        return redirect('home')
    
    jobs = Job.objects.all()
    return render(request, 'accounts/candidate_dashboard.html', {'jobs': jobs})

@login_required
def post_job(request):
    if request.user.user_type != 'HR':
        return redirect('home')
    
    if request.method == 'POST':
        form = JobForm(request.POST)
        if form.is_valid():
            job = form.save(commit=False)
            job.hr = request.user.hr
            job.save()
            messages.success(request, "Job posted successfully.")
            return redirect('hr_dashboard')
    else:
        form = JobForm()
    return render(request, 'accounts/post_job.html', {'form': form})

@login_required
def apply_job(request, job_id):
    if request.user.user_type != 'Candidate':
        return redirect('home')
    
    job = Job.objects.get(id=job_id)
    if request.method == 'POST':
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.job = job
            application.candidate = request.user.candidate
            application.save()
            messages.success(request, "Applied for job successfully.")
            return redirect('candidate_dashboard')
    else:
        form = ApplicationForm()
    return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})

def candidate_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None and hasattr(user, 'user_type') and user.user_type == 'Candidate':
            login(request, user)
            return redirect('candidate_dashboard')
        else:
            messages.error(request, "Invalid login credentials or you are not a Candidate user.")
    
    return render(request, 'accounts/login_as_candidate.html')

def logout_view(request):
    logout(request)
    return redirect('home')

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer

class JobListView(APIView):
    def get(self, request):
        jobs = Job.objects.all()
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
