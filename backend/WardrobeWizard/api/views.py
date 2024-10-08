from django.shortcuts import render
from .models import CustomUser, ClothingArticle, Post
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import (
    UserSignupSerializer,
    LoginSerializer,
    DeleteUserSerializer,
    AddArticleSerializer,
    DeleteArticleSerializer,
    ArticleCategorySerializer,
    ListArticleSerializer,
    CreatePostSerializer,
    PostCategorySerializer,
    ListPostSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
import datetime

# Create your views here.


# POST Request
class UserSignupView(generics.CreateAPIView):

    serializer_class = UserSignupSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "message": "User created successfully",
                "user": {"username": user.username, "email": user.email},
            },
            status=status.HTTP_201_CREATED,
        )


# POST Request - Secure, Produces server-side changes like token generation & user session initiation
class LoginView(generics.CreateAPIView):

    serializer_class = LoginSerializer

    # permission_classes = [IsAuthenticated]    --> Setting this does not allow any unauthorized user to even access the login endpoint which is not what we want. That is why, it will set to [AllowAny] or not set at all.

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():

            user = serializer.validated_data["user"]

            # Generate Refresh & Access Tokens

            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)

            return Response(
                {"access_token": access_token, "refresh_token": str(refresh_token)},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# DELETE Request - Verify Deletion of User Data on Account Deletion
class DeleteUserView(generics.DestroyAPIView):

    serializer_class = DeleteUserSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        validated_username = serializer.validated_data.get("username")

        # Ensuring that the user signed in is the same as the user to be deleted
        if request.user.username != validated_username:
            return Response(
                {"error": "You can only delete your own account."},
                status=status.HTTP_403_FORBIDDEN,
            )

        user = CustomUser.objects.filter(username=validated_username)

        if user:
            user.delete()
            return Response(
                {"message": "User Account Deleted Successfully"},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"error": "User Account Not Found"}, status=status.HTTP_404_NOT_FOUND
        )


# POST Request    #Extend this API by calling the Classification Model
class UploadArticleView(generics.CreateAPIView):

    serializer_class = AddArticleSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data, context={'request': request})   # explicity passing request in the context
        serializer.is_valid(raise_exception=True)
        posts_list = serializer.save()

        # Send message for each rejected image???

        return Response(
            {"message": f"{len(posts_list)} Clothing Articles Added to Wardrobe"},
            status=status.HTTP_201_CREATED,
        )


# DELETE Request
class DeleteArticleView(generics.DestroyAPIView):

    serializer_class = DeleteArticleSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data, context={'request': request})   # explicity passing request in the context
        serializer.is_valid(raise_exception=True)

        id_list = serializer.validated_data.get("id_list")

        # Deleting Articles (using Django lookup type -- very powerful)
        # Bulk Delete does not call the .delete() method of model.
        # Instead, it just executes a SQL query directly which may create loopholes.

        articles = ClothingArticle.objects.filter(id__in=id_list, user=request.user)

        for item in articles:
            item.delete()

        return Response(
            {"message": f"{len(id_list)} Clothing Articles Deleted Successfully"},
            status=status.HTTP_200_OK,
        )
        
# POST Request

class CreatePostView(generics.CreateAPIView):
    
    serializer_class = CreatePostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data=request.data, context={'request': request})   # explicity passing request in the context
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        post = serializer.data
        
        # image url is being sent back righ now in "post"
        return Response({"message": "Post Created Successfully", "post": post}, status=status.HTTP_201_CREATED)
    

# GET Request - Using 2 Serializers (one for validating category & one for serializing Django Model to Native Datatypes)
class ListArticleView(generics.ListAPIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    # User sends 1 of 4 possible keywords: "tops", "bottoms", "footwears", "accessories" (Match Spelling in Frontend)
    
    def get(self, request, *args, **kwargs):
        
        category_serializer = ArticleCategorySerializer(data=request.query_params)  # or request.GET
        category_serializer.is_valid(raise_exception=True)
        
        vaildated_category = category_serializer.validated_data.get('category')
        posts_list = ClothingArticle.objects.filter(category=vaildated_category, user=request.user)
        
        list_serializer = ListArticleSerializer(posts_list, many=True)
        
        return Response(list_serializer.data)
    
    
# GET Request - Using 2 Serializers (one for validating category & one for serializing Django Model to Native Datatypes)
class ListPostView(generics.ListAPIView):
    
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    # User sends 1 of 2 possible keywords: "user", "feed" (Match Spelling in Frontend)
    
    def get(self, request, *args, **kwargs):
        
        category_serializer = PostCategorySerializer(data=request.query_params)  # or request.GET
        category_serializer.is_valid(raise_exception=True)
        
        vaildated_category = category_serializer.validated_data.get('category')
        
        if vaildated_category == "user":
            posts_list = Post.objects.filter(user=request.user).order_by('-createdTime') # descending order of creation time
        
        else:
            posts_list = Post.objects.exclude(user=request.user).order_by('-createdTime')[:20] # all posts except for request.user's posts + descending order of creation time + max 20 posts per api call (successive api calls sent as the page is scrolled maybe???) + TimeDelta can be used for setting oldest retrieved post as "createdTime >= createdTime +/- timedelta(days=3)"
        
        list_serializer = ListPostSerializer(posts_list, many=True)
        
        return Response(list_serializer.data)
    
    
    # when adding or removing a like on a post, check if the like even exists or not