from django.shortcuts import render
from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer
from drf_api.permissions import IsOwnerOrReadOnly
from drf_api.permissions import IsAuthenticatedOrReadOnly

class MessageListCreateView(generics.ListCreateAPIView):
    """
    Let's users create a message
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Let's users update or delete their message
    """
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsOwnerOrReadOnly]




