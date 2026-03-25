from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source="user.username")
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields ="__all__"

    def get_likes_count(self, obj):
        return obj.likes.count()    