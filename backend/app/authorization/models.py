from django.conf import settings
from django.db import models


# Create your models here.
class Authorization(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    code = models.CharField(max_length=20)
    used = models.BooleanField(default=False)
    email = models.EmailField(max_length=254, unique=True)

    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, related_name='fk_user_authorization',
                                on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f'id: {self.id}, email: {self.email}, used: {self.used}, user_id, {self.user_id}'
