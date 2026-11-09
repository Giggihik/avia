import requests
from django.http import HttpResponse, JsonResponse
from .models import Flight, Booking, Ticket
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


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
            'id': flight.id,
            'airline': flight.airline.name, 
            'number': flight.aircraft.model,
            'time': flight.scheduled_departure.strftime("%d.%m %H:%M"),
            'price': f"{int(flight.base_price)} ₽"
        })
        
    return JsonResponse({'status': 'success', 'flights': data})


@csrf_exempt
def api_register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        if User.objects.filter(username=email).exists():
            return JsonResponse({'status': 'error', 'message': 'Пользователь уже существует'})
        
        
        user = User.objects.create_user(username=email, email=email, password=password)
        user.save()
        return JsonResponse({'status': 'success', 'message': 'Регистрация успешна!'})


@csrf_exempt
def api_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        user = authenticate(username=email, password=password)
        
        if user is not None:
            return JsonResponse({'status': 'success', 'message': 'Вход выполнен!', 'user': user.email})
        else:
            return JsonResponse({'status': 'error', 'message': 'Неверный email или пароль'})

def api_user_tickets(request):
    email = request.GET.get('email', '')
    # Ищем бронирования, привязанные к этому пользователю
    bookings = Booking.objects.filter(user__username=email)
    
    data = []
    for b in bookings:
        tickets = Ticket.objects.filter(booking=b)
        for t in tickets:
            data.append({
                'ticket_id': t.id,
                'flight': f"{t.flight.departure_airport.city} — {t.flight.arrival_airport.city}",
                'date': t.flight.scheduled_departure.strftime("%d.%m %H:%M"),
                'seat': t.seat_number,
                'price': f"{int(t.price)} ₽",
                'status': t.status, # 'ACT' (активен) или 'RET' (возвращен)
            })
    return JsonResponse({'status': 'success', 'tickets': data})

# Отменить билет
@csrf_exempt
def api_cancel_ticket(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        ticket_id = data.get('ticket_id')
        try:
            ticket = Ticket.objects.get(id=ticket_id)
            ticket.status = 'RET' # Меняем статус на "Возвращен"
            ticket.save()
            return JsonResponse({'status': 'success', 'message': 'Билет отменен'})
        except Ticket.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Билет не найден'})