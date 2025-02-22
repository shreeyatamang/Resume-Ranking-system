from django.contrib import admin
from django.urls import path, include
from accounts.views import admin_login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/login/', admin_login, name='admin_login'),
    path('accounts/', include('accounts.urls')),
    path('', include('resume_ranking.urls')),
]