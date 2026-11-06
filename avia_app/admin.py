from django.contrib import admin
from .models import Airline, Airport, Aircraft, Flight, Passenger, Booking, Ticket

admin.site.register(Airline)
admin.site.register(Airport)
admin.site.register(Aircraft)
admin.site.register(Flight)
admin.site.register(Passenger)
admin.site.register(Booking)
admin.site.register(Ticket)