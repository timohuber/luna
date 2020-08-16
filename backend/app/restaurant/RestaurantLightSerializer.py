from rest_framework import serializers
from app.restaurant.models import Restaurant


class RestaurantLightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'category', 'country', 'city', 'street', 'zip', 'website', 'phone', 'mail',
                  'opening_hours', 'price_level', 'image']