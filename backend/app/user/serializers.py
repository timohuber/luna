from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import serializers

from app.comment.models import Comment
from app.like.models import Like
from app.review.models import Review

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
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
        fields = ['id', 'username', 'first_name', 'last_name', 'location', 'num_reviews', 'num_comments', 'num_likes',
                  'profile_picture', 'description']





class RetrieveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'location', 'phone', 'description',
                  'joined', 'profile_picture', 'banner']


class TokenUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
