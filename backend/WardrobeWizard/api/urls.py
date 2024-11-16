
from django.urls import path
from api.views import UserSignupView, LoginView, GetUsername, UpdateUserInforView, UpdatePasswordView, DeleteUserView, UploadArticleView, DeleteArticleView, ListArticleView, ListPostView, CreatePostView, DeletePostView, CreateCommentView, ListCommentView, DeleteCommentView, TogglePostLikesView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user_signup'),
    path('login/', LoginView.as_view(), name='user_login'),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get-user-info/', GetUsername.as_view(), name='get_user_info'),
    path("update-info/", UpdateUserInforView.as_view(), name="update_info"),
    path("update-password/", UpdatePasswordView.as_view(), name="update_password"),
    path('delete-user/', DeleteUserView.as_view(), name='user_deletion'),
    path('upload-article/', UploadArticleView.as_view(), name='upload_article'),
    path('delete-article/', DeleteArticleView.as_view(), name='delete_article'),
    path('list-articles/', ListArticleView.as_view(), name='list_articles'),
    path('list-posts/', ListPostView.as_view(), name='list_posts'),
    path("create-post/", CreatePostView.as_view(), name="create_post"),
    path("delete-post/", DeletePostView.as_view(), name="delete_post"),
    path("create-comment/", CreateCommentView.as_view(), name="create_comment"),
    path("list-comments/", ListCommentView.as_view(), name="list_comments"),
    path("delete-comment/", DeleteCommentView.as_view(), name="delete_comment"),
    path("toggle-like/", TogglePostLikesView.as_view(), name="toggle-like"),
]