# accounts/urls.py
from django.urls import path
from .views import RegisterView, LoginView, logout_view, register_view, login_view

urlpatterns = [
    # Function-based views (primär)
    path('register/', register_view, name='register_function'),
    path('login/', login_view, name='login_function'),
    
    # Class-based views (fallback)
    path('register-class/', RegisterView.as_view(), name='register_class'),
    path('login-class/', LoginView.as_view(), name='login_class'),
    
    path('logout/', logout_view, name='logout'),
]
