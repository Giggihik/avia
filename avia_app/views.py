import requests
from django.http import HttpResponse, JsonResponse
from .models import Flight

# 1. Вьюха для отдачи HTML от Node.js (порт 8000)
def index(request):
    try:
        response = requests.get('http://localhost:3000/', timeout=5)
        response.raise_for_status()
        return HttpResponse(response.text, content_type="text/html")
    except requests.exceptions.RequestException:
        return HttpResponse("<h1>Ошибка: Node.js сервер не запущен. Введи 'node server.js' в папке frontend.</h1>")


def api_flights(request):
    origin = request.GET.get('from', '')
    destination = request.GET.get('to', '')
    
    flights = Flight.objects.all()
    if origin:
        flights = flights.filter(departure_airport__city__icontains=origin)
    if destination:
        flights = flights.filter(arrival_airport__city__icontains=destination)
        
    data = []
    for flight in flights:
        data.append({
            'number': f"{flight.airline.iata_code}-{flight.id}",
            'time': flight.scheduled_departure.strftime("%d.%m в %H:%M"),
            'price': f"{int(flight.base_price)} ₽"
        })
        
    return JsonResponse({'status': 'success', 'flights': data})