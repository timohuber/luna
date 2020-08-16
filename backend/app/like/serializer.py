from rest_framework import serializers

from app.comment.serializers import CommentSerializer
from app.like.models import Like
from app.user.serializers import UserSerializer


class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=True)
    comment = CommentSerializer(many=True)
    class Meta:
        model = Like
        fields = ['id'
            , 'created'
            , 'comment'
            , 'user']
