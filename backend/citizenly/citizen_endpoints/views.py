from django.shortcuts import render

# Create your views here.
from .models import Institution, Location, Device
from .serializers import InstitutionSerializer, LocationSerializer, DeviceSerializer

from rest_framework import viewsets


class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
