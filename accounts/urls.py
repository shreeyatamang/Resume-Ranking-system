from django.urls import path
from .views import rank, home, HRRegistrationView, CandidateRegistrationView, hr_login, candidate_login, hr_dashboard, candidate_dashboard, post_job, complete_hr_profile, apply_job, view_results, logout_view, admin_login, login_view, register_hr

urlpatterns = [
    path('', home, name='home'),
    path('register/hr/', HRRegistrationView.as_view(), name='register_hr'),
    path('register/candidate/', CandidateRegistrationView.as_view(), name='register_candidate'),
    path('login/hr/', hr_login, name='login_hr'),
    path('login/candidate/', candidate_login, name='login_candidate'),
    path('dashboard/hr/', hr_dashboard, name='hr_dashboard'),
    path('dashboard/candidate/', candidate_dashboard, name='candidate_dashboard'),
    path('post_job/', post_job, name='post_job'),
    path('complete_hr_profile/', complete_hr_profile, name='complete_hr_profile'),
    path('apply_job/<int:job_id>/', apply_job, name='apply_job'),
    path('view_results/<int:job_id>/', view_results, name='view_results'),
    path('logout/', logout_view, name='logout'),
    path('admin/login/', admin_login, name='admin_login'),
    path('login/', login_view, name='login'),
    path('register_hr/', register_hr, name='register_hr'),
    path('api/rank/', rank, name='rank'),
]