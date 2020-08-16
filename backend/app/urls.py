from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt import views
from django.contrib import admin
from django.urls import path, include

from app.restaurant.views import TopRestaurantsView
from app.user.views import ResetPasswordValidationView, ResetPasswordView
from app.views import MyTokenObtainPairView, SearchView

urlpatterns = [
    path('backend/admin/', admin.site.urls),
    path('backend/api/registration/', include('app.authorization.urls')),
    path('backend/api/restaurants/', include('app.restaurant.urls')),
    path('backend/api/category/', include('app.category.urls')),
    path('backend/api/comment/', include('app.comment.urls')),
    path('backend/api/reviews/', include('app.review.urls')),
    path('backend/api/home/', TopRestaurantsView.as_view()),
    path('backend/api/search/', SearchView.as_view()),

    path('backend/api/auth/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('backend/api/auth/token/refresh/', views.TokenRefreshView.as_view(), name='token_refresh'),
    path('backend/api/auth/token/verify/', views.TokenVerifyView.as_view(), name='token_refresh'),
    path('backend/api/docs/', include_docs_urls(title='Luna API documentation 🦁', permission_classes=[])),
    path('backend/api/auth/password-reset/validation/', ResetPasswordValidationView.as_view()),
    path('backend/api/auth/password-reset/', ResetPasswordView.as_view()),

    path('backend/api/', include('app.user.urls')),
]
