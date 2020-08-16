from django.db.models import Q, Avg
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import AllowAny


from .permissions import IsUserOrReadOnly
from .serializers import RestaurantSerializer
from .models import Restaurant
from ..review.models import Review
from ..review.serializers import ReviewSerializer


class ListCreateRestaurantView(ListCreateAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        param = self.request.GET.get('search', '')
        if self.request.method == 'GET' and param != '':
            return Restaurant.objects.filter(Q(title__contains=param) | Q(text_content__contains=param)).order_by('-created')
        return Restaurant.objects.all().order_by('-created')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    # if i need a different serializer for GET method
"""    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RetrievePostSerializer
        return CreatePostSerializer"""


class CreateRetrieveDestroyRestaurantView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsUserOrReadOnly]
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer


class RestaurantUserView(ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        return Restaurant.objects.filter(user=self.kwargs['pk'])


class RestaurantCategoryView(ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        return Restaurant.objects.filter(category_id=self.kwargs['pk'])


class TopRestaurantsView(ListAPIView):
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Restaurant.objects.annotate(top_ratings=Avg('reviews__rating')).order_by('-top_ratings')[:4]
