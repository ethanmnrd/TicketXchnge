# Generated by Django 2.1.2 on 2018-11-04 03:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('etes', '0003_auto_20181031_1958'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='password',
            field=models.CharField(default='password', max_length=200),
        ),
    ]