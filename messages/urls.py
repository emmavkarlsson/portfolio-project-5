from django.urls import path
from messages import views

urlpatterns = [
    path('messages/', views.MessageListCreateView.as_view()),
    path('messages/<int:pk>/', views.MessageDetailView.as_view()),
]