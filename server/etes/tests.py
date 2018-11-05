from django.test import TestCase
from django.utils import timezone

from etes.models import Event, Ticket, User


class UserTestCase(TestCase):

    # Creates a dummy user with fields to be tested against true fields of User # Model
    def create_testuser(self, email="test@example.com", user_name="test_user", f_name="test", l_name="user", password="test_password"):
        return User.objects.create_user(email=email, user_name=user_name, f_name=f_name, l_name=l_name, password=password)

    def test_user_creation(self):
        b = self.create_testuser()

        # Tests if testuser is a User model
        self.assertTrue(isinstance(b, User))

        # Tests get_full_name() from User model
        self.assertEqual(b.get_full_name(), b.f_name + " " + b.l_name)

        # Tests get_first_name() from User model
        self.assertEqual(b.get_first_name(), b.f_name)

        # Tests __str__() return from User model
        self.assertEqual(
            b.__str__(), "{} - {} {}".format(b.user_name, b.f_name, b.l_name))


class TicketTestCase(TestCase):
    def create_testticket(self, ticket_event="ticketz", ticket_type="GA", ticket_price=10.10):
        return Ticket.objects.create_ticket(ticket_event=ticket_event, ticket_type=ticket_type, ticket_price=ticket_price)

    def test_ticket_creation(self):
        t = self.create_testticket()

        self.assertTrue(isinstance(t, Ticket))

        self.assertEqual(
            t.__str__(), "{} ({}) - ${}".format(t.ticket_event, t.ticket_type, t.ticket_price))


class EventTestCase(TestCase):
    def create_testevent(self, event_name="testevent", event_venue="testvenue", event_date="2018-01-01"):
        return Event.objects.create_event(event_name=event_name, event_venue=event_venue, event_date=event_date)

    def test_event_creation(self):
        e = self.create_testevent()

        self.assertTrue(isinstance(e, Event))

        self.assertEqual(e.__str__(), "{} @ {}".format(
            e.event_name, e.event_venue))
