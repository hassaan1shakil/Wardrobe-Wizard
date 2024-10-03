from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

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