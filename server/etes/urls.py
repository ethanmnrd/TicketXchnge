from django.urls import path
from . import views
urlpatterns = [
    path('api/etes/', views.UserListCreate.as_view() ),
    path('api/etes/ticket', views.TicketListCreate.as_view() ),
]