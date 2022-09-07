from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('series/', views.getSeries, name="series"),
    # path('series/create/', views.createNote, name="create-serie"),
    path('series/<str:pk>/update/', views.updateSerie, name="update-serie"),
    # path('series/<str:pk>/delete/', views.deleteNote, name="delete-serie"),

    # path('series/<str:pk>/', views.getSerie, name="series"),
]