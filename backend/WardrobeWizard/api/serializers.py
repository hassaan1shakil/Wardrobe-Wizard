from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, ClothingArticle, Post, Comment

class UserSignupSerializer(serializers.ModelSerializer):
    
    class Meta:
        
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'profile_image']
        extra_kwargs = {'password': {'write_only': True}}   # Password should not be readable
        
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
        
    def update(self, validated_data): # Complete this!!!
        return 1
    
        
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

# Format for Incoming POST Request -- Not Checking Duplicate Image Uploads

#"images_list": [

#     {
#         "image": "file1.png" # would be an actual image file, not a path
#     },

#     {
#         "image": "file2.png"
#     },

#     {
#         "image": "file3.png" 
#     }
# ]


class DeleteArticleSerializer(serializers.Serializer):
    
    # Any variable initialized in the serializer here is added to validated_data after successful validation so it can be accessed in the view
    
    id_list = serializers.ListField(child=serializers.IntegerField(), allow_empty=False, required=True)
    
    def validate_id_list(self, id_list):
        
        request = self.context.get('request')
        current_user = request.user
        
        if not id_list:
            raise serializers.ValidationError("Please choose an image to be deleted.")
               
        for id_item in id_list:
            
            try:
                ClothingArticle.objects.get(id=id_item, user=current_user)
                
            except ClothingArticle.DoesNotExist:
                raise serializers.ValidationError("Image Not Found")
        
        return id_list
    
    
class ArticleCategorySerializer(serializers.Serializer):
    
    category = serializers.CharField(required=True)
    
    def validate_category(self, value):
        
        category = value
        possible_values = ["tops", "bottoms", "footwears", "accessories"]
        
        if category in possible_values:
            return category
        
        else:
            raise serializers.ValidationError("Invalid Category Provided")
        
    
class ListArticleSerializer(serializers.ModelSerializer):

    class Meta:
        
        model = ClothingArticle
        fields = "__all__"
        

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

    class Meta:
        
        model = Post
        fields = "__all__"  # see if i need to send the likesList or just the likesCount
        
        
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