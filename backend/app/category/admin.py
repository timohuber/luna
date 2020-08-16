from django.contrib import admin

# Register your models here.
from app.category.models import Category

admin.site.register(Category)
