
from django.urls import path
from . import views
from .views import HRRegistrationView, CandidateRegistrationView, LoginView, hr_dashboard, candidate_dashboard, register_candidate, hr_login, candidate_login, register_hr, post_job, apply_job, logout_view, home, view_results, rank_resumes

urlpatterns = [
    path('', home, name='home'),
    path('api/register/hr/', HRRegistrationView.as_view(), name='register-hr-api'),
    path('api/register/candidate/', CandidateRegistrationView.as_view(), name='register-candidate-api'),
    path('login/', LoginView.as_view(), name='login'),
    path('login/hr/', views.hr_login, name='login_hr'),
    path('login/candidate/', views.candidate_login, name='login_candidate'),
    path('register/hr/', views.register_hr, name='register_hr'),
    path('register/candidate/', views.register_candidate, name='register_candidate'),
    path('dashboard/hr/', hr_dashboard, name='hr_dashboard'),
    path('dashboard/candidate/', candidate_dashboard, name='candidate_dashboard'),
    path('post_job/', post_job, name='post_job'),
    path('apply_job/<int:job_id>/', apply_job, name='apply_job'),
    path('view_results/<int:job_id>/', view_results, name='view_results'),
    path('rank_resumes/<int:job_id>/', rank_resumes, name='rank_resumes'),
    path('logout/', logout_view, name='logout'),
]

import os

# Add this if not already present
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TEMPLATES = [
    {
        # ...existing code...
        'DIRS': [BASE_DIR / 'templates'],  # Ensure this line is present
        # ...existing code...
    },
]

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
    os.path.join(BASE_DIR, "models"),  # Add this line
]