from django.shortcuts import render
from rest_framework import generics
from .models import UserMessage
from .serializers import UserMessageSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from drf_api.permissions import IsAuthenticatedOrReadOnly

class MessageListCreateView(generics.ListCreateAPIView):
    """
    Let's users create a message
    """
    queryset = Message.objects.all()
    serializer_class = UserMessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Let's users update or delete their message
    """
    queryset = Message.objects.all()
    serializer_class = UserMessageSerializer
    permission_classes = [IsOwnerOrReadOnly]