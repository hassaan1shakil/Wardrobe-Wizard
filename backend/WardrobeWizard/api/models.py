import os
import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

def get_custom_upload_path(instance, filename):
        
    if isinstance(instance, CustomUser):
        parent_folder = "profile_images"
        sub_folder = instance.username
    
    elif isinstance(instance, ClothingArticle):
        parent_folder = "clothing_articles"
        sub_folder = instance.user.id
    
    elif isinstance(instance, Post):
        parent_folder = "post_images"
        sub_folder = instance.user.id
        
    unique_filename = f"{uuid.uuid4()}{os.path.splitext(filename)[1]}"
    return f'{parent_folder}/{sub_folder}/{unique_filename}'
    

class CustomUser(AbstractUser):
    
    def __str__(self):
        return self.name
    
    email = models.EmailField(max_length=254, unique=True)
    profile_image = models.ImageField(upload_to=get_custom_upload_path, null=True)
    
    
class ClothingArticle(models.Model):

    def __str__(self):
        return self.name
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)        # if user is deleted, all clothing items will be deleted (which is not akin to real life)
    articleImage = models.ImageField(upload_to=get_custom_upload_path)
    category = models.CharField(max_length=20, null=True)
    tagsList = models.DecimalField(max_digits=10, decimal_places=2, null=True)### Change this*********************************
    
    
class Post(models.Model):
    
    def __str__(self):
        return self.name
    
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    caption = models.CharField(max_length=50)
    postImage = models.ImageField(upload_to=get_custom_upload_path)
    likesList = models.DecimalField(max_digits=10, decimal_places=2)### Change this************************************
    createdTime = models.DateTimeField(auto_now_add=True)
    

class Comment(models.Model):
    
    def __str__(self):
        return self.name
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)      # this may be redundant here since post deletion triggers deletion of comments
    text = models.CharField(max_length=100)
    createdTime = models.DateTimeField(auto_now_add=True)
    
    
class Tag(models.Model):
    
    def __str__(self):
        return self.name
    
    tagName = models.CharField(max_length=50)