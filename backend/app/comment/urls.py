from django.urls import path

from app.comment.views import CreateCommentView, GetDestroyCommentView, GetUserReviews, ListCommentView

urlpatterns = [
    path('new/<int:pk>/', CreateCommentView.as_view()),
    path('review/<int:pk>/', ListCommentView.as_view()),
    path('user/<int:pk>/', GetUserReviews.as_view()),
    path('<int:pk>/', GetDestroyCommentView.as_view()),
]