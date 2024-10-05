from django.shortcuts import render
from .models import CustomUser
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserSignupSerializer, LoginSerializer, DeleteUserSerializer, AddArticleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
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
    
#DELETE Request 
class DeleteUserView(generics.DestroyAPIView):
    
    serializer_class = DeleteUserSerializer
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        validated_username = serializer.validated_data.get('username')
        
        # Ensuring that the user signed in is the same as the user to be deleted
        if request.user.username != validated_username:
            return Response({"error": "You can only delete your own account."}, status=status.HTTP_403_FORBIDDEN)
            
        user = CustomUser.objects.filter(username=validated_username)
        
        if user:
            user.delete()
            return Response({"message": "User Account Deleted Successfully"}, status=status.HTTP_200_OK)
        
        return Response({"error": "User Account Not Found"}, status=status.HTTP_404_NOT_FOUND)

#POST Request    
class UploadArticleView(generics.CreateAPIView):
    
    serializer_class = AddArticleSerializer
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        articles_list = serializer.save()
        
        # Send message for each rejected image???
        
        return Response({"message": f'{len(articles_list)} Clothing Articles Added to Wardrobe'}, status=status.HTTP_201_CREATED)
