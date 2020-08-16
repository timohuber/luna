from django.contrib import admin

# Register your models here.
from app.review.models import Review

admin.site.register(Review)
