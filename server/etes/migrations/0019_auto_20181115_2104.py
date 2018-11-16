# Generated by Django 2.1.3 on 2018-11-16 05:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('etes', '0018_remove_ticket_updated_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='event',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='etes.Event'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ticket',
            name='owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
