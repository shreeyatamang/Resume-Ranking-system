from django.contrib import admin
from django.urls import path, include
from accounts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('rank_resumes/', views.rank_resumes, name='rank_resumes'),
    path('accounts/', include('accounts.urls')),  # Include the accounts app URLs
    path('api-token-auth/', include('rest_framework.urls', namespace='rest_framework')),
]