from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Profile

User = get_user_model()


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile_view(request):

    profile, created = Profile.objects.get_or_create(user=request.user)

    image_url = None
    if profile.profile_image:
        image_url = profile.profile_image.url

    data = {
        "username": request.user.username,
        "bio": profile.bio,
        "profile_image": image_url
    }

    return Response(data)