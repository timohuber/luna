from django.contrib import admin

# Register your models here.
from app.restaurant.models import Restaurant

admin.site.register(Restaurant)