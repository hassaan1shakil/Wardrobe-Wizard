from rest_framework.views import APIView
from .models import CustomUser, ClothingArticle, Post, Comment, Tag
from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from .serializers import (
    UserSignupSerializer,
    LoginSerializer,
    UpdateUserInfoSerializer,
    UpdatePasswordSerializer,
    DeleteUserSerializer,
    AddArticleSerializer,
    DeleteArticleSerializer,
    ArticleCategorySerializer,
    ListArticleSerializer,
    CreatePostSerializer,
    PostCategorySerializer,
    ListPostSerializer,
    DeletePostSerializer,
    CreateCommentSerializer,
    PostIDSerializer,
    ListCommentSerializer,
    DeleteCommentSerializer,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from api.authentication import CookieJWTAuthentication
import datetime
import subprocess
import os

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
class LoginView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        # Call the default method to generate access and refresh tokens
        response = super().post(request, *args, **kwargs)

        # Get the access and refresh tokens from the response data
        refresh_token = response.data["refresh"]
        access_token = response.data["access"]

        # Set access and refresh tokens as HttpOnly cookies

        response = Response(
            {"access_token": access_token, "refresh_token": refresh_token}
        )

        return response


# GET Request
class GetUserInfo(generics.ListAPIView):

    authentication_classes = [
        CookieJWTAuthentication
    ]  # using custom authentication class
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        response = {
            "first_name": request.user.first_name,
            "last_name": request.user.last_name,
            "username": request.user.username,
            "email": request.user.email,
        }

        if request.user.profile_image:
            profile_image = request.build_absolute_uri(request.user.profile_image.url)
            response["profile_image"] = profile_image

        else:
            response["profile_image"] = None

        return Response(response, status=status.HTTP_200_OK)


# PUT Request
class UpdateUserInforView(APIView):

    serializer_class = UpdateUserInfoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):

        serializer = self.serializer_class(
            instance=request.user, data=request.data, partial=True
        )  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "User Info Updated Successfully"}, status=status.HTTP_200_OK
        )


# PUT Request
class UpdatePasswordView(APIView):

    serializer_class = UpdatePasswordSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):

        serializer = self.serializer_class(
            request.user, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"message": "User Passowrd Updated Successfully"}, status=status.HTTP_200_OK
        )


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

def get_absolute_media_path(img):
    
    if img:
        # Get the relative path of the image
        image_relative_path = img.url  # This is something like '/media/images/my_image.jpg'

        # Remove the leading '/media' part from the URL
        image_path = image_relative_path.lstrip('/media')

        # Combine MEDIA_ROOT with the image's relative path to form the absolute path
        absolute_path = os.path.join(settings.MEDIA_ROOT, image_path)

        return absolute_path
    return None

def to_snake_case(tags_list):
    
    converted_list = []
    
    if tags_list:
        
        for tag in tags_list:
            tag = tag.strip()
            tag = tag.lower()
            tag = tag.replace(' ', '_')
            converted_list.append(tag)
            
        return converted_list
    
    else:
        return None

# POST Request    #Extend this API by calling the Classification Model
class UploadArticleView(generics.CreateAPIView):

    serializer_class = AddArticleSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def classify_article(self, img_path):
        # how to enter the venv before running this command???

        command = f"/home/hassaan1/Desktop/ml_models/myenv/bin/python \"/home/hassaan1/Desktop/ml_models/Outfit Models/classification.py\" \"{img_path}\""    # add image path

        try:
            # Run the command in the shell
            result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
            return result.stdout.split(',')   # returns list
        except subprocess.CalledProcessError as e:
            return f"Error: {e.stderr}"
        
    def set_article_tags(self, article, tags):
        
        if article.articleImage:
                    
            # tags = ['top', 'Tshirts', 'Men', 'firebrick', 'Summer', 'Sports', '/home/hassaan1/Desktop/red_shirt.jpg']

            converted_tags = to_snake_case(tags)
            current_article = get_object_or_404(ClothingArticle, id=article.id)
            
            # Add category of the article (maybe validate with serializer here)
            current_article.category = converted_tags[0]
            
            # retrieve tags from DB
            tag_names = {
                "type": converted_tags[1],
                "gender": converted_tags[2],
                "color": converted_tags[3],
                "season": converted_tags[4],
                "occasion": converted_tags[5]
            }

            # Add the tags to the article (get_or_create avoids errors if tag doesn't exist)
            for key, tag_name in tag_names.items():
                tag, created = Tag.objects.get_or_create(tagName=tag_name)
                article.tags_list.add(tag)
            
            current_article.save()
            return True
            
        else:
            return False
        

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )  # explicity passing request in the context
        serializer.is_valid(raise_exception=True)
        articles_list = serializer.save()
        
        # Article Classification & Tagging
        
        if articles_list:
            
            for article in articles_list:
                
                img_url = get_absolute_media_path(article.articleImage)
                
                if img_url:
                    tags_list = self.classify_article(img_path=img_url)
                    self.set_article_tags(article=article, tags=tags_list)

        return Response(
            {"message": f"{len(articles_list)} Clothing Articles Added to Wardrobe. Tags: {tags_list}. Converted Tags: {to_snake_case(tags_list)}"},
            status=status.HTTP_201_CREATED,
        )


# DELETE Request
class DeleteArticleView(generics.DestroyAPIView):

    serializer_class = DeleteArticleSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )  # explicity passing request in the context
        serializer.is_valid(raise_exception=True)

        validated_id = serializer.validated_data.get("article_id")

        article = ClothingArticle.objects.get(id=validated_id, user=request.user)

        if article:
            article.delete()

        else:
            return Response(
                {"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {"message": f"Article Id: {validated_id} Deleted Successfully"},
            status=status.HTTP_200_OK,
        )


# GET Request - Using 2 Serializers (one for validating category & one for serializing Django Model to Native Datatypes)
class ListArticleView(generics.ListAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # User sends 1 of 4 possible keywords: "tops", "bottoms", "footwear", "accessories" (Match Spelling in Frontend)

    def get(self, request, *args, **kwargs):

        category_serializer = ArticleCategorySerializer(
            data=request.query_params
        )  # or request.GET
        category_serializer.is_valid(raise_exception=True)

        vaildated_category = category_serializer.validated_data.get("category")
        posts_list = ClothingArticle.objects.filter(
            user=request.user, category=vaildated_category
        )

        list_serializer = ListArticleSerializer(
            posts_list, many=True, context={"request": request}
        )

        return Response({"articles": list_serializer.data}, status=status.HTTP_200_OK)


# POST Request
class CreatePostView(generics.CreateAPIView):

    serializer_class = CreatePostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )  # explicity passing request in the context
        serializer.is_valid(raise_exception=True)
        serializer.save()

        post = serializer.data

        # image url is being sent back righ now in "post"
        return Response(
            {"message": "Post Created Successfully", "post": post},
            status=status.HTTP_201_CREATED,
        )


# GET Request - Using 2 Serializers (one for validating category & one for serializing Django Model to Native Datatypes)
class ListPostView(generics.ListAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    # User sends 1 of 2 possible keywords: "user", "feed" (Match Spelling in Frontend)

    def get(self, request, *args, **kwargs):

        category_serializer = PostCategorySerializer(
            data=request.query_params,
        )  # or request.GET
        category_serializer.is_valid(raise_exception=True)

        vaildated_category = category_serializer.validated_data.get("category")

        if vaildated_category == "user":
            posts_list = Post.objects.filter(user=request.user).order_by(
                "-createdTime"
            )  # descending order of creation time

        else:
            posts_list = Post.objects.exclude(user=request.user).order_by(
                "-createdTime"
            )[
                :20
            ]  # all posts except for request.user's posts + descending order of creation time + max 20 posts per api call (successive api calls sent as the page is scrolled maybe???) + TimeDelta can be used for setting oldest retrieved post as "createdTime >= createdTime +/- timedelta(days=3)"

        list_serializer = ListPostSerializer(
            posts_list, many=True, context={"request": request}
        )

        return Response({"posts": list_serializer.data}, status=status.HTTP_200_OK)


# DELETE Request
class DeletePostView(generics.DestroyAPIView):

    serializer_class = DeletePostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )  # explicity passing request in the context
        serializer.is_valid(raise_exception=True)

        validated_id = serializer.validated_data.get("post_id")

        post = Post.objects.get(id=validated_id, user=request.user)

        if post:
            post.delete()

        else:
            return Response(
                {"error": "Post Not Found"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {"message": f"Post Id: {validated_id} Deleted Successfully"},
            status=status.HTTP_200_OK,
        )


# POST Request
class CreateCommentView(generics.CreateAPIView):

    serializer_class = CreateCommentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )  # explicity passing request in the context
        serializer.is_valid(raise_exception=True)
        serializer.save()

        comment = serializer.data

        return Response(
            {"message": "Comment Created Successfully", "comment": comment},
            status=status.HTTP_201_CREATED,
        )


# GET Request
class ListCommentView(generics.ListAPIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):

        post_id_serializer = PostIDSerializer(data=request.data)
        post_id_serializer.is_valid(raise_exception=True)
        post_id = post_id_serializer.data.get("post_id")

        filtered_comments = Comment.objects.filter(post=post_id).order_by(
            "-createdTime"
        )

        if not filtered_comments:
            return Response("No Comments", status=status.HTTP_404_NOT_FOUND)

        comments_list = ListCommentSerializer(filtered_comments, many=True)

        return Response({"comments": comments_list.data}, status=status.HTTP_200_OK)


class DeleteCommentView(generics.DestroyAPIView):

    serializer_class = DeleteCommentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment_id = serializer.data.get("comment_id")

        comment = Comment.objects.get(id=comment_id, user=request.user)

        if comment:
            comment.delete()

        else:
            return Response("Comment Not Found", status=status.HTTP_404_NOT_FOUND)

        return Response(
            f"Comment: {comment_id} Deleted Successfully", status=status.HTTP_200_OK
        )


# POST Request
class TogglePostLikesView(APIView):

    serializer_class = PostIDSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        post_id = serializer.validated_data.get("post_id")

        current_post = get_object_or_404(Post, id=post_id)
        current_user = request.user

        # Unlike Post

        if current_post.likes.filter(id=current_user.id).exists():
            current_post.likes.remove(current_user)
            return Response(
                {
                    "message": f"Post: {post_id} Unliked by User: {current_user.id} successfully"
                },
                status=status.HTTP_200_OK,
            )

        # Like Post

        current_post.likes.add(current_user)    # current_post.save()???
        return Response(
            {
                "message": f"Post: {post_id} liked by User: {current_user.id} successfully"
            },
            status=status.HTTP_200_OK,
        )
