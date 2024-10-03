
from django.urls import path
from api.views import UserSignupView, LoginView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', LoginView.as_view(), name='user_login'),
]