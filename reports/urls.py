from django.urls import path
from tickets import views

urlpatterns = [
    path('reports/', views.ReportsViewSet.as_view()),
    path('reports/<int:pk>/', views.ReportsDetail.as_view()),
]