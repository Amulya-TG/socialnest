from django.urls import path
from .views import PostListView, CreatePostView, MyPostsView,like_post

urlpatterns = [
    path("", PostListView.as_view()),
    path("create/", CreatePostView.as_view()),
    path("my-posts/", MyPostsView.as_view()),
    path("like/<int:post_id>/", like_post),
]