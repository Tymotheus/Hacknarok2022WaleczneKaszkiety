# Generated by Django 3.2.9 on 2022-04-02 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizen_endpoints', '0002_device_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='device',
            name='status',
        ),
        migrations.AddField(
            model_name='device',
            name='test',
            field=models.TextField(default='test'),
        ),
    ]
