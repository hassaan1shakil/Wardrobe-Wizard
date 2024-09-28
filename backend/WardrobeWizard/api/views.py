from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSignupSerializer

# Create your views here.

class UserSignupView(generics.CreateAPIView):
    
    serializer_class = UserSignupSerializer
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({"message": "User created successfully", "user": {"username": user.username, "email": user.email}}, status=status.HTTP_201_CREATED)