from rest_framework import serializers
from .models import Review
from ..comment.models import Comment
from ..restaurant.RestaurantLightSerializer import RestaurantLightSerializer
from ..user.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    restaurant = RestaurantLightSerializer(read_only=True)
    count_of_likes = serializers.SerializerMethodField()
    count_of_comments = serializers.SerializerMethodField()

    def get_count_of_likes(self, Review):
        count = 0
        likes = Review.likes.all().values()
        for i in likes:
            count += 1
        return count

    def get_count_of_comments(self, review):
        return Comment.objects.filter(review=review).count()

    class Meta:
        model = Review
        fields = ['id', 'text_content', 'rating', 'created', 'updated', 'user', 'restaurant', 'count_of_likes', 'count_of_comments']
