from rest_framework.serializers import ModelSerializer

from .models import Institution, Location, Device


class InstitutionSerializer(ModelSerializer):

    class Meta:
        model = Institution
        fields = ("name",)


class LocationSerializer(ModelSerializer):

    class Meta:
        model = Location
        fields = ("name", "institution")


class DeviceSerializer(ModelSerializer):

    class Meta:
        model = Device
        fields = ("id", "name", "location", "comment", "votes", "status", "type")
