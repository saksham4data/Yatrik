from django.shortcuts import render
from .models import Bus, Stop, Schedule, PassengerProfile, BusLocation

# The frontend is now handled by React in the /frontend directory.
# All backend logic is exposed via APIs in api_views.py.