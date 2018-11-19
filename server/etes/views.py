from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework_jwt.settings import api_settings
from etes.models import User, Ticket, Event
from etes.serializers import UserSerializer, TicketSerializer, EventSerializer
from pprint import pprint

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Creates then returns JWT token for a user
    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
        user = authenticate(email=request.data['email'], password=request.data['password'])
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return Response({"token": token}, status=status.HTTP_201_CREATED)

class UserAuth(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    # Gets token
    def post(self, request, *args, **kwargs):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            return Response({"token": token}, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    # Verifies token user
    def get(self, request, *args, **kwargs):
        payload = jwt_decode_handler(request.META['HTTP_AUTHORIZATION'])
        return Response({'email': payload['email']}, status=status.HTTP_202_ACCEPTED)   
      

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
