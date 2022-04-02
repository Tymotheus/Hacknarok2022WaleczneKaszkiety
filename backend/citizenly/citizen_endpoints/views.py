from django.shortcuts import render

# Create your views here.
from .models import Institution, Location, Device
from django.contrib.auth.models import User
from .serializers import InstitutionSerializer, LocationSerializer, DeviceSerializer
from rest_framework.decorators import action, permission_classes
from django.http import JsonResponse

from rest_framework import viewsets, status


class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    @action(methods=['post'], detail=True, url_path='vote-device')
    def vote_post(self, request, pk=None) -> JsonResponse:
        """Request should look like this:
            {
                "user_id" : [number with id],
            }"""
        try:
            desired_device = Device.objects.get(id=pk)
            current_user = User.objects.get(id=request.data['user_id'])
            desired_device.upvote(current_user)
        except Exception as ex:
            return JsonResponse({"error_message": str(ex)}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        return JsonResponse({"message": "Post voted successfully"}, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, url_path='by-location')
    def get_devices_by_location(self, request) -> JsonResponse:
        """Request should look like this:
            {
                "location_id" : [number with id],
            }"""
        desired_devices = Device.objects.filter(location=request.data['location_id'])
        serializer = DeviceSerializer(desired_devices, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False )

    @action(methods=['get'], detail=False, url_path='to-fix')
    def get_devices_to_fix(self, request) -> JsonResponse:
        desired_devices = Device.objects.filter(type="To fix")
        serializer = DeviceSerializer(desired_devices, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)

    @action(methods=['get'], detail=False, url_path='to-create')
    def get_devices_to_create(self, request) -> JsonResponse:
        desired_devices = Device.objects.filter(type="To create")
        serializer = DeviceSerializer(desired_devices, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
