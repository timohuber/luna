from rest_framework import serializers

from app.authorization.models import Authorization


class AuthorizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Authorization
        fields = ['id'
            , 'created'
            , 'updated'
            , 'code'
            , 'used'
            , 'email'
            , 'user']
