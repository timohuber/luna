from django.contrib import admin

# Register your models here.
from app.authorization.models import Authorization

admin.site.register(Authorization)
