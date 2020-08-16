from django.urls import path

from app.user.views import ListUsersView, ListMe, ListUser

urlpatterns = [
    path('users/', ListUsersView.as_view()),
    path('users/me/', ListMe.as_view()),
    path('users/<int:pk>/', ListUser.as_view()),
]
