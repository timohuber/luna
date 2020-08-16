from django.urls import path

from app.review.views import CreateReviewView, GetRestaurantReviewView, GetUserReviewView, GetReviewView, \
    ToggleLikeView, GetCurrentUserReviewView, GetCurrentUserCommentReviewView

urlpatterns = [
    path('new/<int:pk>/', CreateReviewView.as_view()),
    path('restaurant/<int:pk>/', GetRestaurantReviewView.as_view()),
    path('user/<int:pk>/', GetUserReviewView.as_view()),
    path('<int:pk>/', GetReviewView.as_view()),
    path('like/<int:pk>/', ToggleLikeView.as_view()),
    path('likes/', GetCurrentUserReviewView.as_view()),
    path('comments/', GetCurrentUserCommentReviewView.as_view()),
]
