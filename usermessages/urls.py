from django.urls import path
from usermessages import views

urlpatterns = [
    path("usermessages/", views.MessageListCreateView.as_view()),
    path("usermessages/<int:pk>/", views.MessageDetailView.as_view()),
]
