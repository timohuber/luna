from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.comment.models import Comment
from app.comment.serializers import CommentSerializer
from app.like.models import Like
from app.restaurant.serializers import RestaurantSerializer
from app.review.models import Review
from app.review.serializers import ReviewSerializer

User = get_user_model()


class MeSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    reviews = ReviewSerializer(many=True)
    restaurants = RestaurantSerializer(many=True)

    num_reviews = serializers.SerializerMethodField(required=False)
    num_comments = serializers.SerializerMethodField(required=False)
    num_likes = serializers.SerializerMethodField(required=False)

    def get_num_reviews(self, user):
        return Review.objects.filter(user=user).count()

    def get_num_comments(self, user):
        return Comment.objects.filter(user=user).count()

    def get_num_likes(self, user):
        return Like.objects.filter(user=user).count()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'location', 'description', 'joined', 'num_reviews', 'num_comments'
            , 'num_likes', 'banner', 'comments', 'reviews',  'restaurants', 'profile_picture']
