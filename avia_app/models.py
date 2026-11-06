from django.db import models

class Airline(models.Model):
    name = models.CharField("Название авиакомпании", max_length=100)
    city = models.CharField("Город базирования", max_length=100)
    country = models.CharField("Страна", max_length=100)
    iata_code = models.CharField("Код IATA", max_length=3, unique=True)

    class Meta:
        verbose_name = "Авиакомпания"
        verbose_name_plural = "Авиакомпании"

    def __str__(self):
        return f"{self.name} ({self.iata_code})"

class Airport(models.Model):
    name = models.CharField("Название аэропорта", max_length=150)
    city = models.CharField("Город", max_length=100)
    country = models.CharField("Страна", max_length=100)
    iata_code = models.CharField("Код IATA", max_length=3, unique=True)

    class Meta:
        verbose_name = "Аэропорт"
        verbose_name_plural = "Аэропорты"

    def __str__(self):
        return f"{self.city} ({self.iata_code})"


class Aircraft(models.Model):
    model = models.CharField("Модель самолета", max_length=100)
    seating_capacity = models.PositiveIntegerField("Вместимость (мест)")
    registration_number = models.CharField("Бортовой номер", max_length=20, unique=True)
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE, verbose_name="Авиакомпания")

    class Meta:
        verbose_name = "Самолет"
        verbose_name_plural = "Самолеты"

    def __str__(self):
        return f"{self.model} ({self.registration_number})"


class Flight(models.Model):
    STATUS_CHOICES = [
        ('SCH', 'По расписанию'),
        ('DEL', 'Задержан'),
        ('CAN', 'Отменен'),
    ]
    
    scheduled_departure = models.DateTimeField("Время вылета")
    scheduled_arrival = models.DateTimeField("Время прилета")
    status = models.CharField("Статус", max_length=3, choices=STATUS_CHOICES, default='SCH')
    base_price = models.DecimalField("Базовая цена", max_digits=10, decimal_places=2)
    
    departure_airport = models.ForeignKey(Airport, related_name='departures', on_delete=models.CASCADE, verbose_name="Аэропорт вылета")
    arrival_airport = models.ForeignKey(Airport, related_name='arrivals', on_delete=models.CASCADE, verbose_name="Аэропорт прилета")
    aircraft = models.ForeignKey(Aircraft, on_delete=models.CASCADE, verbose_name="Самолет")
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE, verbose_name="Авиакомпания")

    class Meta:
        verbose_name = "Рейс"
        verbose_name_plural = "Рейсы"

    def __str__(self):
        return f"Рейс {self.id}: {self.departure_airport.city} - {self.arrival_airport.city}"


class Passenger(models.Model):
    name = models.CharField("Имя", max_length=50)
    surname = models.CharField("Фамилия", max_length=50)
    phone_number = models.CharField("Телефон", max_length=20)
    passport_number = models.CharField("Номер паспорта", max_length=20, unique=True)

    class Meta:
        verbose_name = "Пассажир"
        verbose_name_plural = "Пассажиры"

    def __str__(self):
        return f"{self.surname} {self.name}"


class Booking(models.Model):
    booking_date = models.DateTimeField("Дата бронирования", auto_now_add=True)
    is_paid = models.BooleanField("Оплачено", default=False) 
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE, verbose_name="Пассажир")

    class Meta:
        verbose_name = "Бронирование"
        verbose_name_plural = "Бронирования"

    def __str__(self):
        return f"Бронь №{self.id} - {self.passenger.surname}"


class Ticket(models.Model):
    CLASS_CHOICES = [
        ('EC', 'Эконом'),
        ('BC', 'Бизнес'),
    ]
    
    seat_number = models.CharField("Номер места", max_length=5) 
    ticket_class = models.CharField("Класс обслуживания", max_length=2, choices=CLASS_CHOICES, default='EC')
    price = models.DecimalField("Цена билета", max_digits=10, decimal_places=2)
    
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, verbose_name="Рейс")
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, verbose_name="Бронирование")

    class Meta:
        verbose_name = "Билет"
        verbose_name_plural = "Билеты"

    def __str__(self):
        return f"Билет на рейс {self.flight.id} (Место: {self.seat_number})"