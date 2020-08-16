import random
import string

from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.http import HttpResponse

from app.mail.models import Mail

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from app.authorization.models import Authorization
from app.authorization.serializers import AuthorizationSerializer

User = get_user_model()


class NewRegistrationView(CreateAPIView):
    serializer_class = AuthorizationSerializer
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        def get_random_alphaNumeric_string(stringLength=8):
            lettersAndDigits = string.ascii_letters + string.digits
            return ''.join((random.choice(lettersAndDigits) for i in range(stringLength)))

        code = get_random_alphaNumeric_string()
        new_entry = Authorization(code=code, used=False, email=args[0].data['email'])
        user = User.objects.filter(email=args[0].data['email'])
        if user:
            return HttpResponse('Email already registered', status=400)
        if validate_email(args[0].data['email']) == None:
            new_entry.save()
        Mail.objects.create(subject='Welcome to Luna!'
                            , content='Thank you for registering at Luna. Your access code is {}'.format(code)
                            , sender='students@propulsionacademy.com'
                            , recipient='{}'.format(args[0].data['email']))
        return HttpResponse(status=204)


class RegistrationValidationView(CreateAPIView):
    serializer_class = AuthorizationSerializer
    permission_classes = [AllowAny]

    def post(self, *args, **kwargs):
        registration = Authorization.objects.filter(email=args[0].data['email'])
        if registration[0].code == args[0].data['code']:
            if args[0].data['password'] != args[0].data['password_repeat']:
                return HttpResponse('Passwords don\'t match', status=400)
            new_user = User(email=args[0].data['email']
                            , username=args[0].data['username']
                            , first_name=args[0].data['first_name']
                            , last_name=args[0].data['last_name'])
            new_user.set_password(args[0].data['password'])
            new_user.save()
            registration.delete()
            return HttpResponse(status=200)
        else:
            return HttpResponse('Code does not match', status=400)
