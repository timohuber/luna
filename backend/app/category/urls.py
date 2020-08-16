from django.urls import path

from app.category.views import ListCategoryView

urlpatterns = [
    path('', ListCategoryView.as_view()),
]
