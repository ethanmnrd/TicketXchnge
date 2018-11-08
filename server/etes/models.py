from django import forms
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
# from django.contrib.gis.db import models
from django.core.validators import RegexValidator
from django.db import models

from .managers import EventManager, TicketManager, UserManager

# from django.contrib.gis.geos import Point
# from location_field.models.spatial import LocationField


class User(AbstractBaseUser, PermissionsMixin):
    uid = models.AutoField(primary_key=True, null=False)
    email = models.EmailField(max_length=200, unique=True)
    user_name = models.CharField(max_length=50)
    f_name = models.CharField(max_length=300, blank=True)
    l_name = models.CharField(max_length=300, blank=True)
    is_active = models.BooleanField(default=True)
    # phone_regex = forms.RegexValidator(
    #     regex=r'^)\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    # phone_num = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    # password = models.CharField(max_length=32, widget = forms.PasswordInput)
    password = models.CharField(max_length=200, default="password")
    created_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        full_name = '%s %s' % (self.f_name, self.l_name)
        return full_name.strip()

    def get_first_name(self):
        return self.f_name

    def is_staff(self):
        return self.is_admin

    # def save(self, *args, **kwargs):
    #     self.password = make_password(self.password)
    #     super(User, self).save(*args, **kwargs)

    def __str__(self):
        return "{} - {} {}".format(self.user_name, self.f_name, self.l_name)


class Ticket(models.Model):
    tid = models.AutoField(primary_key=True, null=False)
    ticket_event = models.CharField(max_length=200)
    ticket_price = models.FloatField(max_length=25)
    created_at = models.DateTimeField(auto_now_add=True)

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
    # event_location = LocationField(
    #     based_fields=['event_city'], zoom=7, default=Point(1.0, 1.0))
    # objects = models.GeoManager()
    event_date = models.DateTimeField()
    start_time = models.TimeField()

    created_at = models.DateTimeField(auto_now_add=True)

    objects = EventManager()

    def __str__(self):
        return "{} @ {}".format(self.event_name, self.event_venue)
