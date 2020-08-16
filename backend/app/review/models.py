from django.contrib.auth import get_user_model
from django.db import models

from app.restaurant.models import Restaurant

User = get_user_model()


# Create your models here.
class Review(models.Model):
    RATING = [(1, 1), (2, 2), (3, 3), (4, 4), (5, 5)]
    text_content = models.CharField(max_length=600)
    rating = models.IntegerField(choices=RATING, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    user = models.ForeignKey(to=User, related_name='reviews', on_delete=models.CASCADE, blank=True)
    restaurant = models.ForeignKey(to=Restaurant, related_name='reviews', on_delete=models.CASCADE,
                                   blank=True)
