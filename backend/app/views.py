from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from app.restaurant.models import Restaurant
from app.restaurant.serializers import RestaurantSerializer
from app.review.models import Review
from app.review.serializers import ReviewSerializer
from app.user.serializers import TokenUserSerializer, UserSerializer

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        user = TokenUserSerializer(self.user)
        # Add extra responses here
        data['user'] = user.data
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class SearchView(ListAPIView):
    permission_classes = [AllowAny]

    def get_queryset(self):
        param = self.request.GET.get('search', '')
        searchType = self.request.GET.get('type', '')
        if searchType == 'restaurant':
            return Restaurant.objects.filter(name__icontains=param.lower())
        if searchType == 'user':
            return User.objects.filter(Q(username__icontains=param.lower()) | Q(first_name__icontains=param.lower())
                                       | Q(last_name__icontains=param.lower()))
        if searchType == 'review':
            return Review.objects.filter(text_content__icontains=param.lower())

    def get_serializer_class(self):
        searchType = self.request.GET.get('type', '')
        if searchType == 'restaurant':
            return RestaurantSerializer
        if searchType == 'user':
            return UserSerializer
        if searchType == 'review':
            return ReviewSerializer

