from django.urls import path
from saved import views

urlpatterns = [
    path("saved_posts/", views.SavedList.as_view()),
    path("saved_posts/<int:pk>/", views.SavedDetail.as_view()),
]
