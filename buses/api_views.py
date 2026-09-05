from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Bus, PassengerProfile
from .serializers import BusSerializer, PassengerProfileSerializer

class BusSearchAPIView(generics.ListAPIView):
    serializer_class = BusSerializer

    def get_queryset(self):
        source = self.request.query_params.get('source', None)
        destination = self.request.query_params.get('destination', None)
        
        queryset = Bus.objects.all()
        if source and destination:
            queryset = queryset.filter(
                stops__name__iexact=source
            ).filter(
                stops__name__iexact=destination
            ).distinct()
        return queryset

class PassengerProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PassengerProfileSerializer

    def get_object(self):
        # Return profile for the currently logged-in user
        profile, created = PassengerProfile.objects.get_or_create(user=self.request.user)
        return profile
