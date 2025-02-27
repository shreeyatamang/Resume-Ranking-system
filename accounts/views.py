import os
import nltk
import logging
import pandas as pd
import numpy as np
import re
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
from .models import CustomUser, HR, Candidate, Job, Application
from .forms import HRForm, CandidateForm, JobForm, ApplicationForm

# Downloading NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

logger = logging.getLogger(__name__)

# Loading the dataset
file_path = "accounts/FinalCleanedResumeDataSet.csv"
df = pd.read_csv(file_path)

# Function to preprocess text
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    tokens = nltk.word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return ' '.join(tokens)

def rank_resumes(resume_texts, job_description):
    all_texts = [job_description] + resume_texts
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_texts)
    similarities = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    return np.argsort(similarities[0])[::-1]  # Sort resumes by relevance

def calculate_rank(job_desc, resumes):
    processed_resumes = [preprocess_text(resume) for resume in resumes]
    ranked_indices = rank_resumes(processed_resumes, job_desc)
    
    # Debugging: Print the ranked indices
    print("Ranked indices:", ranked_indices)
    
    ranked_resumes = [{"rank": i+1, "resume": resumes[idx]} for i, idx in enumerate(ranked_indices)]
    
    # Debugging: Print the ranked resumes
    print("Ranked resumes:", ranked_resumes)
    
    return ranked_resumes

@csrf_exempt
def rank(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        job_desc = data.get('job_desc', '')
        resumes = data.get('resumes', [])

        if not job_desc or not resumes:
            return JsonResponse({'error': 'Missing job description or resumes'}, status=400)

        ranked_resumes = calculate_rank(job_desc, resumes)
        
        # Debugging: Print the final response
        print("Final response:", {'ranked_resumes': ranked_resumes})
        
        return JsonResponse({'ranked_resumes': ranked_resumes})
    else:
        return JsonResponse({'error': 'GET method not allowed'}, status=405)

def home(request):
    return render(request, 'accounts/home.html')

class HRRegistrationView(View):
    def get(self, request):
        form = HRRegistrationForm()
        return render(request, 'accounts/register_as_hr.html', {'form': form})

    def post(self, request):
        form = HRRegistrationForm(request.POST)
        if form.is_valid():
            user = CustomUser.objects.create_user(
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
                password=form.cleaned_data['password']
            )
            hr = HR(
                user=user,
                organization_name=form.cleaned_data['organization_name'],
                organization_email=form.cleaned_data['organization_email']
            )
            hr.save()
            login(request, user)
            return redirect('hr_dashboard')
        return render(request, 'accounts/register_as_hr.html', {'form': form})

class CandidateRegistrationView(View):
    def get(self, request):
        form = CandidateForm()
        return render(request, 'accounts/register_as_candidate.html', {'form': form})

    def post(self, request):
        form = CandidateForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            if CustomUser.objects.filter(email=email).exists():
                messages.error(request, "Email already exists.")
                return render(request, 'accounts/register_as_candidate.html', {'form': form})
            user = CustomUser.objects.create_user(username=email, password=password, email=email, first_name=first_name, last_name=last_name)
            user.user_type = 'Candidate'
            user.save()
            candidate = form.save(commit=False)
            candidate.user = user
            candidate.save()
            messages.success(request, "Registration successful. You can now log in.")
            login(request, user)  # Log the user in after registration
            return redirect('candidate_dashboard')  # Redirect to Candidate dashboard
        return render(request, 'accounts/register_as_candidate.html', {'form': form})



def hr_login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user is not None and hasattr(user, 'user_type') and user.user_type == 'HR':
            login(request, user)
            return redirect('hr_dashboard')
        else:
            messages.error(request, "Invalid login credentials or you are not an HR user.")
    return render(request, 'accounts/login_as_hr.html')

def candidate_login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        
        if user is not None and hasattr(user, 'user_type') and user.user_type == 'Candidate':
            login(request, user)
            return redirect('candidate_dashboard')
        else:
            messages.error(request, "Invalid login credentials or you are not a Candidate user.")
    return render(request, 'accounts/login_as_candidate.html')

@login_required
def hr_dashboard(request):
    if request.user.user_type != 'HR':
        return redirect('home')
    
    hr_profile = get_object_or_404(HR, user=request.user)
    jobs = Job.objects.filter(hr=hr_profile)
    
    return render(request, 'accounts/hr_dashboard.html', {'jobs': jobs})

@login_required
def candidate_dashboard(request):
    jobs = Job.objects.all()
    return render(request, 'accounts/candidate_dashboard.html', {'jobs': jobs})

@login_required
def post_job(request):
    if request.user.user_type != 'HR':
        return redirect('home')
    
    # Check if HR profile is complete
    hr_profile = getattr(request.user, 'hr', None)
    if not hr_profile or not hr_profile.organization_name or not hr_profile.organization_email:
        messages.error(request, "You need to complete your HR profile before posting a job.")
        return redirect('hr_dashboard')
    
    if request.method == 'POST':
        form = JobForm(request.POST)
        if form.is_valid():
            job = form.save(commit=False)
            job.hr = hr_profile  # Ensure that the HR instance is correctly associated
            job.save()
            messages.success(request, "Job posted successfully.")
            return redirect('hr_dashboard')
        else:
            messages.error(request, "Failed to post job. Please check the form for errors.")
    else:
        form = JobForm()
    return render(request, 'accounts/post_job.html', {'form': form})

@login_required
def complete_hr_profile(request):
    if request.user.user_type != 'HR':
        return redirect('home')
    
    # Ensure HR profile exists
    hr_profile, created = HR.objects.get_or_create(user=request.user)
    
    if request.method == 'POST':
        form = HRForm(request.POST, instance=hr_profile)
        if form.is_valid():
            form.save()
            messages.success(request, "HR profile updated successfully.")
            return redirect('hr_dashboard')
    else:
        form = HRForm(instance=hr_profile)
    
    return render(request, 'accounts/complete_hr_profile.html', {'form': form})

@login_required
def apply_job(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    candidate = get_object_or_404(Candidate, user=request.user)
    
    if request.method == 'POST':
        form = ApplicationForm(request.POST, request.FILES)
        if form.is_valid():
            application = form.save(commit=False)
            application.job = job
            application.candidate = candidate
            
            # Handle file upload and preprocess the resume text
            if 'resume_file' in request.FILES:
                uploaded_file = request.FILES['resume_file']
                logger.info(f"Uploaded file name: {uploaded_file.name}")
                logger.info(f"Uploaded file content type: {uploaded_file.content_type}")
                try:
                    resume_text = uploaded_file.read().decode('utf-8')
                    logger.info(f"Resume text successfully read: {resume_text[:100]}...")  # Log the first 100 characters
                except UnicodeDecodeError:
                    logger.error("UnicodeDecodeError: Unable to decode the resume file with utf-8 encoding.")
                    try:
                        resume_text = uploaded_file.read().decode('latin-1')
                        logger.info(f"Resume text successfully read with latin-1 encoding: {resume_text[:100]}...")  # Log the first 100 characters
                    except Exception as e:
                        logger.error(f"Unexpected error: {e}")
                        messages.error(request, "There was an error processing your resume file. Please ensure it is a valid text file.")
                        return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})
                except Exception as e:
                    logger.error(f"Unexpected error: {e}")
                    messages.error(request, "There was an unexpected error processing your resume file.")
                    return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})
                
                application.resume_content = resume_text
                application.save()
                
                # Load the job description
                job_description = preprocess_text(job.description)
                
                # Rank the resume
                all_resumes = [app.resume_content for app in Application.objects.filter(job=job)]
                ranked_indices = rank_resumes(all_resumes, job_description)
                
                # Update ranks for all applications
                for i, idx in enumerate(ranked_indices):
                    app = Application.objects.filter(job=job)[int(idx)]  # Ensure idx is an integer
                    app.rank = i + 1
                    app.save()
                
                messages.success(request, "You have successfully applied for the job.")
                return redirect('candidate_dashboard')
            else:
                messages.error(request, "Please upload a resume file.")
                return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})
        else:
            messages.error(request, "There was an error with your application. Please check the form and try again.")
            return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})
    else:
        form = ApplicationForm()
    
    return render(request, 'accounts/apply_job.html', {'form': form, 'job': job})

@login_required
def view_results(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    applications = Application.objects.filter(job=job).order_by('rank')  # Order by rank in ascending order
    
    return render(request, 'accounts/view_results.html', {'job': job, 'applications': applications})

def logout_view(request):
    logout(request)
    return redirect('home')

def admin_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('/admin/')
        else:
            messages.error(request, "Invalid login credentials or you are not an Admin user.")
    return render(request, 'admin/login.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            if user.user_type == 'HR':
                return redirect('hr_dashboard')
            elif user.user_type == 'Candidate':
                return redirect('candidate_dashboard')
            else:
                return redirect('home')
        else:
            messages.error(request, "Invalid login credentials.")
            return render(request, 'accounts/login.html')
    return render(request, 'accounts/login.html')

def register_hr(request):
    if request.method == 'POST':
        form = HRRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('hr_dashboard')
    else:
        form = HRRegistrationForm()
    return render(request, 'accounts/register_as_hr.html', {'form': form})