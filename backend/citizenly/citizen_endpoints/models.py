import enum
from django.db import models, IntegrityError
from django.contrib.auth.models import User


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
    """For example hand-dryer - if you want to fix the device.
        For example new garden or park - if you want to create something new."""
    name = models.CharField(max_length=50)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    comment = models.TextField()
    votes = models.IntegerField(default=0)

    INPROGRESS = 'InProgress'
    DONE = 'Done'
    CHOICES = (
        (DONE, 'Done'),
        (INPROGRESS, 'Pending')
    )
    TYPES = (
        ('ToFix', 'To fix'),
        ('ToCreate', 'To create')
    )

    status = models.CharField(max_length=255, choices=CHOICES, default=INPROGRESS)
    type = models.CharField(max_length=20, choices=TYPES, default='To fix')

    def __str__(self):
        return self.name

    def upvote(self, user):
        try:
            UserVotes.objects.create(user=user, device=self)
            self.votes += 1
            self.save()
        except IntegrityError:
            raise Exception('already_voted')
        return 'ok'


class UserVotes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'device')
