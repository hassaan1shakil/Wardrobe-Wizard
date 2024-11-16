from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import request

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Try to get the token from the cookie first
        access_token = request.COOKIES.get('access_token')
        
        if access_token:
            # If the token is found in the cookie, try to decode and authenticate
            validated_token = self.get_validated_token(access_token)
            return self.get_user(validated_token), validated_token
        
        # If no token is found, fallback to default behavior (Authorization header)
        return super().authenticate(request)
