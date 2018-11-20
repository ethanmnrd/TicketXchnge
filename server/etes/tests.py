from django.test import TestCase
from django.utils import timezone

from etes.models import Event, Ticket, User


class UserTestCase(TestCase):
    # Creates a dummy user with fields to be tested against true fields of User # Model
    def setUp(self):
      User.objects.create_user( email='unittest@example.com', f_name='unittest_fname', l_name='unittest_lname', password='unittest_password')

    def test_user_creation(self):
        unittest_user = User.objects.get(email="unittest@example.com")
        # Tests if testuser is a User model
        self.assertEqual(unittest_user.f_name, "unittest_fname" )
        self.assertEqual(unittest_user.l_name, "unittest_lname" )
        self.assertTrue(isinstance(unittest_user, User))

class EventTestCase(TestCase):
    def setUp(self):
        Event.objects.create_event(event_name="unittest_event_name", event_venue="unittest_event_venue", event_date='2019-11-01', start_time='18:00:00')

    def test_event_creation(self):
        unittest_event = Event.objects.get(event_name="unittest_event_name")
        self.assertEqual(unittest_event.event_name, "unittest_event_name" )
        self.assertEqual(unittest_event.event_venue, "unittest_event_venue" )
        self.assertTrue(isinstance(unittest_event, Event))


class TicketTestCase(TestCase):
    def setUp(self):
        owner = User.objects.create_user(uid=2, email='unittest@example.com', f_name='unittest_fname', l_name='unittest_lname', password='unittest_password')
        event = Event.objects.create_event(eid=2, event_name="unittest_event_name", event_venue="unittest_event_venue", event_date='2019-11-01', start_time='18:00:00')
        Ticket.objects.create_ticket(ticket_event="unittest_event_name", ticket_type="GA", ticket_price=10.10, ticket_quantity=5, ownerId=owner, eventId=event)

    def test_ticket_creation(self):
        unittest_ticket = Ticket.objects.get(ticket_event="unittest_event_name")
        unittest_event = Event.objects.get(eid=2)
        unittest_user = User.objects.get(email="unittest@example.com")
        self.assertEqual(unittest_ticket.ticket_quantity, 5)
        self.assertEqual(unittest_ticket.ticket_event, "unittest_event_name")
        self.assertEqual(unittest_ticket.owner, unittest_user)
        self.assertEqual(unittest_ticket.event, unittest_event)
        self.assertTrue(isinstance(unittest_ticket, Ticket))
