from rest_framework import serializers

from app.comment.models import Comment
from app.like.models import Like
from app.user.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    num_likes = serializers.SerializerMethodField(required=False)

    def get_num_likes(self, comment):
        return Like.objects.filter(comment=comment).count()

    class Meta:
        model = Comment
        fields = ['id'
            , 'text_content'
            , 'created'
            , 'updated'
            , 'review'
            , 'num_likes'
            , 'user']
