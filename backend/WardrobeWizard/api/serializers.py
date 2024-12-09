import os
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, ClothingArticle, Post, Comment

class UserSignupSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}   # Password should not be readable
        
    # Add Password Validation Mehthod
        
    def create(self, validated_data):
        
        user = CustomUser(
            username = validated_data['username'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            profile_image = validated_data.get('profile_image', None)
        )
        
        user.set_password(validated_data['password'])   # Hash the password
        user.save()
        return user
    
        
class LoginSerializer(serializers.Serializer):
    
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
        
    def validate(self, data):
        
        username = data.get('username')
        password = data.get('password')   # using get() prevents runtime errors as no value results in 'None'
        
        if username and password:
            
            user = authenticate(username = username, password = password)
            
            # if not user.is_active:
            #     raise serializers.ValidationError("Inactive User")
            
            if user is None:
                raise serializers.ValidationError("Invalid Credentials")
            
            data['user'] = user   # save authenticated user
        
        else:
            
            if username is None:
                raise serializers.ValidationError("Username is required")
            
            else:
                raise serializers.ValidationError("Password is required")
        
        return data
 
 
class UpdateUserInfoSerializer(serializers.ModelSerializer):
    
    class Meta: 
        
        model = CustomUser
        fields = ['first_name', 'last_name', 'email', 'profile_image']
        
    def validate_email(self, value):
        
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        
        return value
        
    def update(self, instance, validated_data):
        
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email) # email verification required
        
        new_profile_image = validated_data.get('profile_image', None) 
            
        if new_profile_image:
            
            # Delete the old file
            if instance.profile_image:
                instance.profile_image.delete(save=False)
            
            instance.profile_image = new_profile_image
        
        instance.save()
        return instance
                

class UpdatePasswordSerializer(serializers.ModelSerializer):
    
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    
    class Meta:
        
        model = CustomUser
        fields = ['old_password', 'new_password']
        
    def validate_new_password(self, value):
        
        current_user = self.context.get('request').user
        validate_password(password=value, user=current_user)
        return value
        
    def update(self, instance, validated_data):
        
        if not instance.check_password(validated_data['old_password']):
            raise serializers.ValidationError("Old Passowrd is Invalid")
        
        instance.set_password(validated_data['new_password'])
        instance.save()
        
        return instance
        

class DeleteUserSerializer(serializers.Serializer):
    
    username = serializers.CharField(required=True)
    
    def validate_username(self, value):
        
        if not CustomUser.objects.filter(username=value).exists():
            
            raise serializers.ValidationError("User Not Found")
        
        return value


class AddArticleSerializer(serializers.ModelSerializer):
    
    images_list = serializers.ListField(child=serializers.ImageField(), allow_empty=False, required=True)
    
    class Meta:
        
        model = ClothingArticle
        fields = ['images_list']
        
    def create(self, validated_data):
        
        # Validation Checks
        
        request = self.context.get('request')
        current_user = request.user     # Get current user from session which will be automatically authenticated
        
        images_list = validated_data.get('images_list')
        
        if not images_list:
            raise serializers.ValidationError("At least one image is required.")
        
        for image in images_list:
            
            if not image:
                raise serializers.ValidationError("Each image must be valid")
            
            # check the image format (probably only need png)
            if image.content_type not in ['image/jpeg', 'image/png']:
                raise serializers.ValidationError("Unsupported image format. Only JPEG and PNG are allowed.")
            
            # check image size (example: limit to 5MB)
            if image.size > 5 * 1024 * 1024:
                raise serializers.ValidationError("Image file too large. Maximum size is 5MB.")
        
        # Create Articles List
        
        articles_list = [
            ClothingArticle(user=current_user, articleImage=img) for img in images_list
        ]
        
        # Bulk Create Articles in Database (alt to individual .save())
        
        ClothingArticle.objects.bulk_create(articles_list)
        
        return articles_list


class DeleteArticleSerializer(serializers.Serializer):
    
    # Any variable initialized in the serializer here is added to validated_data after successful validation so it can be accessed in the view
    
    article_id = serializers.IntegerField(required=True)
    
    def validate_article_id(self, value):
        
        article_id = value
        request = self.context.get('request')
        
        try:
            ClothingArticle.objects.get(id=article_id, user=request.user)
            
        except ClothingArticle.DoesNotExist:
            raise serializers.ValidationError("Article Does Not Exist")
        
        return value
    
    
class ArticleCategorySerializer(serializers.Serializer):
    
    category = serializers.CharField(required=True)
    
    def validate_category(self, value):
        
        category = value
        possible_values = ["top", "bottom", "foot"]
        
        if category in possible_values:
            return category
        
        else:
            raise serializers.ValidationError("Invalid Category Provided")
        
    
class ListArticleSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = ClothingArticle
        fields = ["id", "articleImage", "category", "tags_list"]     # add category here once classification model is set up so QueryInvalidate can be made more specific
    
    def get_articleImage(self, obj):
        
        request = self.context.get('request')
        if obj.articleImage:
            return request.build_absolute_uri(obj.articleImage.url)
        return None
    

class CreatePostSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Post
        fields = ['caption', 'postImage']
        
    def create(self, validated_data):
        
        request = self.context.get('request')
        
        post = Post(
            user = request.user,
            caption = validated_data.get('caption'),
            postImage = validated_data.get('postImage'),
            # likesList would just be empty initially
            # createdTime should be added automatically
        )
        
        post.save()
        return post
        
        
class PostCategorySerializer(serializers.Serializer):
    
    category = serializers.CharField(required=True)
    
    def validate_category(self, value):
        
        category = value
        possible_values = ["user", "feed"]
        
        if category in possible_values:
            return category
        
        else:
            raise serializers.ValidationError("Invalid Category Provided")
        
    
class ListPostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()

    class Meta:
        
        model = Post
        fields = "__all__"  # see if i need to send the likesList or just the likesCount
        
    def get_username(self, obj):
        
        request = self.context.get('request')
        return obj.user.username
        
    def get_postImage(self, obj):
        
        request = self.context.get('request')
        if obj.postImage:
            return request.build_absolute_uri(obj.postImage.url)
        return None
    
    def get_liked_by_user(self, obj):
        
        request = self.context.get('request')
        return obj.likes.filter(id=request.user.id).exists()
        
        
class DeletePostSerializer(serializers.Serializer):
    
    post_id = serializers.IntegerField(required=True)
    
    def validate_post_id(self, value):
        
        post_id = value
        request = self.context.get('request')
        
        try:
            Post.objects.get(id=post_id, user=request.user)
            
        except Post.DoesNotExist:
            raise serializers.ValidationError("Post Does Not Exist")
        
        return value
    

class CreateCommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Comment
        fields = ['post', 'text']
        
    def create(self, validated_data):
        
        request = self.context.get('request')
        
        comment = Comment(
            post = validated_data.get('post'),
            user = request.user,
            text = validated_data.get('text')
        )
        
        comment.save()
        return comment
    

class PostIDSerializer(serializers.Serializer):
    
    post_id = serializers.IntegerField(required=True)
    
    def validate_post_id(self, data):
        
        post_id = data
        
        try:
            Post.objects.get(id=post_id)
        
        except Post.DoesNotExist:
            raise serializers.ValidationError("Post Not Found")
        
        return post_id
    
  
class ListCommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = Comment
        fields = "__all__"
        

class DeleteCommentSerializer(serializers.Serializer):
    
    comment_id = serializers.IntegerField(required=True)
    
    def validate_comment_id(self, data):
        
        comment_id = data
        
        try:
            Comment.objects.get(id=comment_id)
        
        except Comment.DoesNotExist:
            raise serializers.ValidationError("Comment Not Found")
        
        return comment_id
    

class OutfitGenerationSerializer(serializers.Serializer):
    
    theme = serializers.CharField(required=True)
    # season = serializers.CharField(required=True)
    # gender = serializers.CharField(required=True)
    occasion = serializers.CharField(required=True)
    # article_type = serializers.CharField(required=True)
    
    def validate(self, data):
        
        theme = data.get("theme")
        # season = data.get("season")
        # gender = data.get("gender")
        occasion = data.get("occasion")
        # article_type = data.get("type")
        
        # all these will have to be in lowercase to be checked against the DB
        theme_list = ['pink', 'purple', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'brown', 'white', 'black', 'grey']
        # season_list = ['fall', 'spring', 'summer', 'winter']
        # gender_list = ['boys', 'girls', 'men', 'unisex', 'women']
        occasion_list = ['casual', 'formal']
        
        if theme not in theme_list:
            serializers.ValidationError("Invalid Theme")
        
        # if season not in season_list:
        #     serializers.ValidationError("Invalid Season")
            
        # if gender not in gender_list:
        #     serializers.ValidationError("Invalid Gender")
            
        if occasion not in occasion_list:
            serializers.ValidationError("Invalid Occasion")
            
        # if article_type not in article_type_list:
        #     serializers.ValidationError("Invalid Type")
        
        return data