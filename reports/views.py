from django.shortcuts import render
from rest_framework import viewsets, generics, permissions
from .models import Reports
from .serializers import ReportsSerializer
from drf_api.permissions import IsOwnerOrReadOnly


class ReportsViewSet(generics.ListCreateAPIView):
    serializer_class = ReportsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Reports.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ReportsDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReportsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Reports.objects.all()
