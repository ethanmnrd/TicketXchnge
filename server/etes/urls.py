from django.urls import path
from . import views


urlpatterns = [
    path('users/', views.UserCreate.as_view(), name="users-all"),
    path('tickets/', views.TicketListCreate.as_view(), name="tickets-all"),
    path('ticket/<tid>', views.TicketRetrieveDestroy.as_view()),
    path('purchase/', views.TicketPurchase.as_view()),
    path('events/', views.EventCreate.as_view(), name="events-all"),
    path('login/',  views.UserAuth.as_view()),
]
