from django.http import HttpResponse
from django.contrib.auth import authenticate
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework import generics, status, filters
from rest_framework_jwt.settings import api_settings
from etes.models import User, Ticket, Event
from etes.serializers import UserSerializer, TicketSerializer, EventSerializer
from pprint import pprint
from json import dumps
from datetime import datetime

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Creates then returns JWT token for a user
    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
        user = User.objects.get(email=request.data['email'])
        auth = authenticate(email=request.data['email'], password=request.data['password'])
        payload = jwt_payload_handler(auth)
        token = jwt_encode_handler(payload)
        return Response({'token': token, 'email': user.email, 'firstName': user.f_name, 'lastName': user.l_name}, status=status.HTTP_201_CREATED)   

class UserAuth(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Gets token
    def post(self, request, *args, **kwargs):
        auth = authenticate(email=request.data['email'], password=request.data['password'])
        if auth is not None:
            user = User.objects.get(email=request.data['email'])
            auth = authenticate(email=request.data['email'], password=request.data['password'])
            payload = jwt_payload_handler(auth)
            token = jwt_encode_handler(payload)
            return Response({'token': token, 'email': user.email, 'firstName': user.f_name, 'lastName': user.l_name}, status=status.HTTP_201_CREATED)   
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

    # Verifies token user
    def get(self, request, *args, **kwargs):
        payload = jwt_decode_handler(request.META['HTTP_AUTHORIZATION'])
        return Response(status=status.HTTP_202_ACCEPTED)   
      

class TicketListCreate(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    
    def post(self, request, *args, **kwargs):
        payload = jwt_decode_handler(request.META['HTTP_AUTHORIZATION'])
        request.data['owner'] = payload['user_id']
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        tickets = self.get_queryset().filter(ticket_event__icontains=request.query_params['ticket_event'], ticket_quantity__gt=0)
        json_data=[]
        for ticket in tickets:
            obj = {'tid': ticket.tid, 'ticket_event': ticket.ticket_event, 'ticket_price': ticket.ticket_price, 
            'ticket_quantity': ticket.ticket_quantity, 'city': ticket.event.event_city, 'venue': ticket.event.event_venue, 'ticket_address': ticket.ticket_address}
            json_data.append(obj)
        return Response(json_data, content_type = 'application/javascript; charset=utf8')
      

class TicketRetrieveDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    renderer_classes = (JSONRenderer,)

    def get(self, request, tid):
        pprint('in get')
        ticket = Ticket.objects.get(tid=tid)
        
        return Response({'tid': ticket.tid, 'ticket_event': ticket.ticket_event, 'ticket_price': ticket.ticket_price, 'owner_id': ticket.owner.uid, 'event_id': ticket.event.eid}, content_type = 'application/javascript; charset=utf8')
    
    def delete(self, request, tid):
        ticket = Ticket.objects.get(tid=tid)
        ticket.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
  
class TicketPurchase(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def patch(self, request, *args, **kwargs):
        ticket = Ticket.objects.get(tid=request.data['tid'])
        ticket.ticket_quantity = ticket.ticket_quantity - 1
        ticket.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class EventCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, event_date=datetime.strptime(request.data['event_date'], '%Y-%m-%d').date(), start_time = datetime.strptime(request.data['start_time'], '%H:%M').date(), **kwargs)
    
    def get(self, request, *args, **kwargs):
        events = self.get_queryset().filter(event_name__icontains=request.query_params['event_name'])
        json_data=[]
        for event in events:
          obj = {'eid': event.eid, 'event_name': event.event_name, 'event_venue': event.event_venue, 'event_city': event.event_city, 'event_date': event.event_date, 'start_time': event.start_time}
          json_data.append(obj)
        return Response(json_data, content_type = 'application/javascript; charset=utf8')
