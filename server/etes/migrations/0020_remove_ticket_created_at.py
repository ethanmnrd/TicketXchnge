# Generated by Django 2.1.3 on 2018-11-16 08:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('etes', '0019_auto_20181115_2104'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='created_at',
        ),
    ]