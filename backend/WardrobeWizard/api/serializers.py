from rest_framework import serializers
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
                password = validated_data['password'],
                profile_image = validated_data['profile_image', None]
            )
            
            user.set_password(validated_data['password'])   # Hash the password
            user.save()
            return user