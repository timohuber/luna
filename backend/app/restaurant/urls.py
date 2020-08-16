from django.urls import path
from .views import ListCreateRestaurantView, CreateRetrieveDestroyRestaurantView, RestaurantUserView, \
    RestaurantCategoryView

urlpatterns = [
    path('', ListCreateRestaurantView.as_view()),
    path('<int:pk>/', CreateRetrieveDestroyRestaurantView.as_view()),
    path('new/', CreateRetrieveDestroyRestaurantView.as_view()),
    path('user/<int:pk>/', RestaurantUserView.as_view()),
    path('category/<int:pk>/', RestaurantCategoryView.as_view()),
]
