from django.urls import path

from app.authorization.views import NewRegistrationView, RegistrationValidationView

urlpatterns = [
    path('', NewRegistrationView.as_view()),
    path('validation/', RegistrationValidationView.as_view())
]