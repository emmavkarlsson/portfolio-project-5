from django.shortcuts import render
from rest_framework import generics, permissions
from .models import UserMessage
from .serializers import UserMessageSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from django.db.models import Q

class MessageListCreateView(generics.ListCreateAPIView):
    """
    Let's users create a message
    """
    queryset = UserMessage.objects.none()
    serializer_class = UserMessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return (
            UserMessage.objects.filter(Q(receiver=self.request.user) | Q(owner=self.request.user)) 
        )

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Let's users update or delete their message
    """
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer
    permission_classes = [IsOwnerOrReadOnly]