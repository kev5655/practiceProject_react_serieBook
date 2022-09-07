from django.db import models


# Create your models here.
class Serie(models.Model):
    id = models.CharField("serieId", max_length=40, primary_key=True)
    userId = models.CharField("userId", max_length=40)
    title = models.CharField(null=True, blank=True, max_length=50)  # Kann leer sein und wird dan zu null
    episode = models.IntegerField(null=True, blank=True)
    session = models.IntegerField(null=True, blank=True)
    startDate = models.CharField(null=True, blank=True, max_length=20)
    endDate = models.CharField(null=True, blank=True, max_length=20)
    stars = models.IntegerField(null=True, blank=True)  # ToDo maby max Value
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title[0:50]
