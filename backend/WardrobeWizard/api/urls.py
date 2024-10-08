
from django.urls import path
from api.views import UserSignupView, LoginView, DeleteUserView, UploadArticleView, DeleteArticleView, ListArticleView, ListPostView, CreatePostView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    # path('login/', LoginView.as_view(), name='user_login'),   # Not using custom login view for now
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    path('delete/', DeleteUserView.as_view(), name='user_deletion'),
    path('upload-article/', UploadArticleView.as_view(), name='upload_article'),
    path('delete-article/', DeleteArticleView.as_view(), name='delete_article'),
    path('list-articles/', ListArticleView.as_view(), name='list_articles'),
    path('list-posts/', ListPostView.as_view(), name='list_posts'),
    path("create-post/", CreatePostView.as_view(), name="create_post"),
]