from django.urls import path
from . import views
urlpatterns = [
    path('users', views.UserListCreate.as_view(), name="users-all"),
    path('tickets', views.TicketListCreate.as_view(), name="tickets-all"),
    path('events', views.EventListCreate.as_view(), name="events-all"),
]
