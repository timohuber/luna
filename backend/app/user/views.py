import string
import random

from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework import filters


from app.authorization.models import Authorization
from app.mail.models import Mail
from app.user.meserializer import MeSerializer
from app.user.serializers import UserSerializer


User = get_user_model()


class ResetPasswordView(CreateAPIView):
    serializer_class = MeSerializer
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        user = User.objects.filter(email=args[0].data['email'])
        if user:
            def get_random_alphaNumeric_string(stringLength=8):
                lettersAndDigits = string.ascii_letters + string.digits
                return ''.join((random.choice(lettersAndDigits) for i in range(stringLength)))

            code = get_random_alphaNumeric_string()
            new_entry = Authorization(code=code, used=False, email=args[0].data['email'])
            new_entry.save()
            Mail.objects.create(subject='Reset password'
                                , content='Please use the following code to reset your password: {}'.format(code)
                                , sender='students@propulsionacademy.com'
                                , recipient='{}'.format(args[0].data['email']))
            return HttpResponse('Token was sent', status=200)
        else:
            return HttpResponse('Email not used', status=400)


class ResetPasswordValidationView(CreateAPIView):
    serializer_class = MeSerializer
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        registration = Authorization.objects.get(email=args[0].data['email'])
        user = User.objects.get(email=args[0].data['email'])
        if registration.code == args[0].data['code']:
            if args[0].data['password'] != args[0].data['password_repeat']:
                return HttpResponse('Passwords don\'t match', status=400)
            user.set_password(args[0].data['password'])
            registration.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse('Invalid Code or Email')


class ListUsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = MeSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name']


class ListMe(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = MeSerializer

    def get_object(self):
        return self.request.user


class ListUser(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = MeSerializer
