from etes.models import User, Ticket, Event
from etes.serializers import UserSerializer, TicketSerializer, EventSerializer
from rest_framework import generics

# Create your views here.


class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TicketListCreate(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer