# Generated by Django 3.0.7 on 2020-07-07 09:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('authorization', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='authorization',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fk_user_authorization', to=settings.AUTH_USER_MODEL),
        ),
    ]
