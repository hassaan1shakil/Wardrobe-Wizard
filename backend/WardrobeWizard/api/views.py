from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSignupSerializer, LoginSerializer

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
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        
        token = 99999 #.gettoken()
        
        return Response({"message": "User logged in successfully", "Bearer": token, "username": user.username}, status=status.HTTP_200_OK)