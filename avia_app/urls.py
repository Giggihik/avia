from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/flights/', views.api_flights, name='api_flights'),
]