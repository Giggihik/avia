from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/flights/', views.api_flights, name='api_flights'),
    path('api/register/', views.api_register, name='api_register'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/user-tickets/', views.api_user_tickets, name='api_user_tickets'),
    path('api/cancel-ticket/', views.api_cancel_ticket, name='api_cancel_ticket'), 
]