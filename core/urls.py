"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from buses import api_views
from rest_framework.authtoken import views as auth_token_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Endpoints
    path('api/buses/search/', api_views.BusSearchAPIView.as_view(), name='api_search_bus'),
    path('api/profile/', api_views.PassengerProfileAPIView.as_view(), name='api_profile'),
    path('api/auth/login/', auth_token_views.obtain_auth_token, name='api_token_auth'),
]
