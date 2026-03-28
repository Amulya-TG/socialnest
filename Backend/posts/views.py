from rest_framework.generics import ListAPIView, CreateAPIView,RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from rest_framework.response import Response
from .models import Post,Like
from .serializers import PostSerializer


class PostListView(ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer


class CreatePostView(CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MyPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user).order_by("-created_at")
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    print("Logged in user:", request.user) 
    post = Post.objects.get(id=post_id)
    user = request.user

    like, created = Like.objects.get_or_create(
        user=user,
        post=post
    )

    if not created:
        like.delete()
        return Response({"message": "Unliked"})

    return Response({"message": "Liked"})

class PostDetailView(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "id"