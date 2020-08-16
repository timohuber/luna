from django.db import models
from django.conf import settings

# Create your models here.
from app.review.models import Review


class Comment(models.Model):
    text_content = models.CharField(max_length=600, blank=False, null=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    review = models.ForeignKey(to=Review, related_name='comments',
                               on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='comments',
                             on_delete=models.CASCADE, blank=True, null=True)
