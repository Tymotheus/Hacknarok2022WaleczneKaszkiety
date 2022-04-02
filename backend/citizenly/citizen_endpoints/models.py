import enum
from django.db import models

class Institution(models.Model):
    """For example: Krakowski Park Technologiczny"""
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Location(models.Model):
    """For example: 3rd floor or bathroom downstairs"""
    name = models.CharField(max_length=50)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Device(models.Model):
    """For example hand-dryer"""
    name = models.CharField(max_length=50)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    comment = models.TextField()

    INPROGRESS = 'InProgress'
    DONE = 'Done'

    CHOICES = (
        (DONE, 'Done'),
        (INPROGRESS, 'Pending')
    )

    status = models.CharField(max_length=255, choices=CHOICES, default=INPROGRESS)
