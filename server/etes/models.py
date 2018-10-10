from django.db import models
# from django.core.validators import RegexValidator
from django import forms

# Create your models here.


class User(models.Model):
    uid = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=50)
    f_name = models.CharField(max_length=300)
    l_name = models.CharField(max_length=300)
    email = models.EmailField(max_length=200)
    # phone_regex = forms.RegexValidator(
    #     regex=r'^)\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    # phone_num = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    # password = models.CharField(max_length=32, widget = forms.PasswordInput)
    password = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

class Ticket(models.Model):
    tid = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=50)
    event_location = models.CharField(max_length=100)
    event_date = models.DateTimeField()
    date_posted = models.DateTimeField(auto_now_add=True)
