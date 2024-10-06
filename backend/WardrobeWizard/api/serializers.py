from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, ClothingArticle

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
        
    def update(self, validated_data):
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