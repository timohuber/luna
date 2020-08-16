from rest_framework import serializers
from .models import Restaurant
from ..category.serializers import CategorySerializer
from ..review.models import Review
from ..review.serializers import ReviewSerializer
from ..user.serializers import UserSerializer
from django.db.models import Avg


class RestaurantSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)
    category = serializers.ReadOnlyField(source='category.name')
    # price_level = serializers.SerializerMethodField()

    average_rating = serializers.SerializerMethodField(required=False)
    num_reviews = serializers.SerializerMethodField(required=False)

    def get_price_level(self, obj):
        return obj.get_price_level_display()

    def get_average_rating(self, restaurant):
        rawRating = restaurant.reviews.all().aggregate(Avg('rating'))
        if restaurant.reviews.count() == 0:
            return 0
        else:
            return round(float(rawRating['rating__avg'])*2)/2

    def get_num_reviews(self, restaurant):
        return Review.objects.filter(restaurant=restaurant).count()

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'category', 'country', 'city', 'street', 'zip', 'website', 'phone', 'mail',
                  'opening_hours', 'price_level', 'image', 'average_rating', 'num_reviews', 'user', 'reviews']
