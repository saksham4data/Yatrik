from rest_framework import serializers
from .models import Bus, Stop, Schedule, PassengerProfile, BusLocation

class StopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ['id', 'name', 'order', 'arrival_time', 'departure_time']

class BusLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusLocation
        fields = ['latitude', 'longitude', 'last_updated']

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = ['date', 'departure_time', 'arrival_time']

class BusSerializer(serializers.ModelSerializer):
    stops = StopSerializer(many=True, read_only=True)
    locations = BusLocationSerializer(many=True, read_only=True)
    schedules = ScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Bus
        fields = ['id', 'bus_number', 'name', 'route_start', 'route_end', 'stops', 'locations', 'schedules']

class PassengerProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = PassengerProfile
        fields = ['id', 'username', 'email', 'phone', 'address', 'addr1', 'addr2', 'postcode', 'state', 'area', 'country', 'region']
