# Generated by Django 3.2.9 on 2022-04-02 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizen_endpoints', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='status',
            field=models.CharField(choices=[('done', 'done'), ('inProgress', 'Pending')], default='inProgress', max_length=255),
        ),
    ]
