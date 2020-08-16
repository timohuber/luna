from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import CustomUserManager


# Create your models here.
class User(AbstractUser):
    # Field user for authentication in Django admin
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (by default USERNAME_FIELD and passwords)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    location = models.CharField(max_length=30, blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    description = models.CharField(max_length=300, blank=True, null=True)
    joined = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=False)
    profile_picture = models.ImageField(upload_to='profile', blank=True, null=True)
    banner = models.ImageField(upload_to='banner', blank=True, null=True)

    objects = CustomUserManager()

    def __str__(self):
        return self.email
