from django import forms
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
# from django.contrib.gis.db import models
from django.core.validators import RegexValidator
from django.db import models

from .managers import EventManager, TicketManager, UserManager

# from django.contrib.gis.geos import Point
# from location_field.models.spatial import LocationField


class User(AbstractBaseUser):
    uid = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(max_length=200, unique=True)
    f_name = models.CharField(max_length=300)
    l_name = models.CharField(max_length=300)
    password = models.CharField(max_length=200, default="password")

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
  
    def get_username(self):
        return self.email

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return "{} - {} {}".format(self.uid, self.f_name, self.l_name)


class Ticket(models.Model):
    tid = models.AutoField(primary_key=True, null=False)
    ticket_event = models.CharField(max_length=200)
    ticket_price = models.DecimalField(null=False, max_digits=10, decimal_places=2)
    ticket_quantity = models.IntegerField(null=False)
    ticket_address = models.CharField(max_length=200, null=False)
    ticket_fee = models.DecimalField(null=False, max_digits=10, decimal_places=2)
    ticket_subtotal = models.DecimalField(null=False, max_digits=10, decimal_places=2)
    owner = models.ForeignKey('User', on_delete=models.CASCADE)
    event = models.ForeignKey('Event', on_delete=models.CASCADE)

    TICKET_TYPE_CHOICES = (
        ('GA', 'General Admission'),
        ('VIP', 'VIP Seating'),
        ('AS', 'Assigned Seating')
    )
    ticket_type = models.CharField(
        max_length=3, choices=TICKET_TYPE_CHOICES, default='GA')

    objects = TicketManager()

    def __str__(self):
        return "{} ({}) - ${}".format(self.ticket_event, self.ticket_type, self.ticket_price)


class Event(models.Model):
    eid = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=100)
    event_venue = models.CharField(max_length=500)
    event_city = models.CharField(max_length=400)
    event_date = models.DateField()
    start_time = models.TimeField()

    objects = EventManager()

    def __str__(self):
        return "{} @ {}".format(self.event_name, self.event_venue)
