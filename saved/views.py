from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from saved.models import SavePost
from saved.serializers import SavedSerializer


class SavedList(generics.ListCreateAPIView):
    """
    List saved post or add save post if logged in.
    """
    serializer_class = SavedSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = SavePost.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SavedDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a save or delete it by id if you own it.
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = SavedSerializer
    queryset = SavePost.objects.all()