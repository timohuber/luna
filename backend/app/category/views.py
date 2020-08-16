from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView

from app.category.models import Category
from app.category.serializers import CategorySerializer


class ListCategoryView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
