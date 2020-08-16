from django.contrib.auth import get_user_model
from django.db import models

from app.category.models import Category

User = get_user_model()


class Restaurant(models.Model):
    price = [(1, '$'),
             (2, '$$'),
             (3, '$$$'),
             (4, '$$$$')]
    user = models.ForeignKey(to=User, related_name="restaurants", on_delete=models.SET_NULL, blank=True, null=True)
    name = models.CharField(max_length=200)
    category = models.ForeignKey(to=Category, related_name="restaurants", on_delete=models.SET_NULL, null=True)
    country = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    zip = models.IntegerField()
    website = models.CharField(max_length=200)
    phone = models.CharField(max_length=200, null=True, blank=True)
    mail = models.CharField(max_length=200, null=True, blank=True)
    opening_hours = models.TextField(null=True, blank=True)
    price_level = models.IntegerField(choices=price)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    image = models.ImageField(upload_to='restaurant', blank=True, null=True)

    def __str__(self):
        return f'{self.id}: {self.name}'
