from django.urls import path
from .views import home, hr_login, hr_dashboard, candidate_dashboard, HRRegistrationView, CandidateRegistrationView, login_view, logout_view, candidate_login, post_job, apply_job, view_results
from .views import complete_hr_profile
from . import views

urlpatterns = [
    path('', home, name='home'),
    path('hr/login/', hr_login, name='hr_login'),
    path('hr/dashboard/', hr_dashboard, name='hr_dashboard'),
    path('candidate/dashboard/', candidate_dashboard, name='candidate_dashboard'),
    path('register/hr/', HRRegistrationView.as_view(), name='register_hr'),
    path('register/candidate/', CandidateRegistrationView.as_view(), name='register_candidate'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('candidate/login/', candidate_login, name='candidate_login'),
    path('post/job/', post_job, name='post_job'),
    path('complete_hr_profile/', complete_hr_profile, name='complete_hr_profile'),
    path('accounts/apply/job/<int:job_id>/', views.apply_job, name='apply_job'),
    path('accounts/view_results/<int:job_id>/', views.view_results, name='view_results'),
]