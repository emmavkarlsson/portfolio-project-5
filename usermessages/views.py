from django.shortcuts import render
from rest_framework import generics, permissions
from .models import UserMessage
from .serializers import UserMessageSerializer
from drf_api.permissions import IsOwnerOrReadOnly

class MessageListCreateView(generics.ListCreateAPIView):
    """
    Let's users create a message
    """
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Let's users update or delete their message
    """
    queryset = UserMessage.objects.all()
    serializer_class = UserMessageSerializer
    permission_classes = [IsOwnerOrReadOnly]