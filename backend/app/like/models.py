from django.conf import settings
from django.db import models

# Create your models here.
from app.comment.models import Comment
from app.review.models import Review


class Like(models.Model):
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    review = models.ForeignKey(to=Review, related_name='likes',
                               on_delete=models.CASCADE, blank=True, null=True)
    comment = models.ForeignKey(to=Comment, related_name='likes',
                                on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='likes',
                             on_delete=models.CASCADE, blank=True, null=True)
