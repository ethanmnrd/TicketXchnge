from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        # user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class TicketManager(BaseUserManager):
    use_in_migrations = True

    def create_ticket(self, ticket_event, ticket_type, ticket_price):
        if not ticket_event:
            raise ValueError('Must have event ticket is associated to')
        ticket = self.model(ticket_event=ticket_event,
                            ticket_type=ticket_type, ticket_price=ticket_price)
        ticket.save(using=self._db)
        return ticket


class EventManager(BaseUserManager):
    use_in_migrations = True

    def create_event(self, event_name, event_venue, event_date, **extra_fields):
        if not event_venue:
            raise ValueError('Must have event venue')
        event = self.model(event_name=event_name,
                           event_venue=event_venue, event_date=event_date)
        event.save(using=self._db)
        return event
