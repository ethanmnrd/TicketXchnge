from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import generics, status
from etes.models import User, Ticket, Event
from etes.serializers import UserSerializer, TicketSerializer, EventSerializer
from pprint import pprint

# Create your views here.


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # def get(self, request, *args, **kwargs):
    #     print('self: ')
    #     pprint(vars(self))
    #     print('request: ')
    #     pprint(vars(request))
    #     return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

# class UserAuth(generics.RetrieveAPIView):
#     serializer_class = UserSerializer
#     # def get(self, request, *args, **kwargs):
#     #     print('self: ')
#     #     pprint(vars(self))
#     #     print('request: ')
#     #     pprint(vars(request))
#     #     return self.list(request, *args, **kwargs)
#     def get(self, request, *args, **kwargs):
#         return self.get(request, *args, **kwargs)

class TicketListCreate(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TicketRetrieveDestroy(generics.RetrieveDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    renderer_classes = (JSONRenderer,)
    def get(self, request, tid):
        ticket = Ticket.objects.get(tid=tid)
        json_obj = {}
        json_obj['tid'] = ticket.tid
        json_obj['ticket_event'] = ticket.ticket_event
        json_obj['ticket_price'] = ticket.ticket_price
        json_obj['owner_id'] = ticket.owner.uid
        json_obj['event_id'] = ticket.event.eid
        return Response(json_obj)
    
    def delete(self, request, tid):
        ticket = Ticket.objects.get(tid=tid)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventCreate(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
