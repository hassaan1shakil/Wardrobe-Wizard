from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSignupSerializer, LoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

# POST Request
class UserSignupView(generics.CreateAPIView):
    
    serializer_class = UserSignupSerializer
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({"message": "User created successfully", "user": {"username": user.username, "email": user.email}}, status=status.HTTP_201_CREATED)

# POST Request - Secure, Produces server-side changes like token generation & user session initiation
class LoginView(generics.CreateAPIView):
    
    serializer_class = LoginSerializer
    
    # permission_classes = [IsAuthenticated]    --> Setting this does not allow any unauthorized user to even access the login endpoint which is not what we want. That is why, it will set to [AllowAny] or not set at all.
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            
            user = serializer.validated_data['user']

            #Generate Refresh & Access Tokens
            
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)
            
            return Response(
                {"access_token": access_token,
                 "refresh_token": str(refresh_token)
                },
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)