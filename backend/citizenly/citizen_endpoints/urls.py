from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'institutions', views.InstitutionViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'devices', views.DeviceViewSet)

urlpatterns = [
    path('', include(router.urls))
]