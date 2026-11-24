from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = 'Create a test user for development purposes'

    def handle(self, *args, **options):
        # Safety net: demo credentials only in demo/dev environments (DEMO_MODE in local_settings.py);
        # warning instead of hard error so container startup never fails in production.
        if not getattr(settings, 'DEMO_MODE', False):
            self.stdout.write(self.style.WARNING(
                'DEMO_MODE is not enabled - skipping demo user creation.'
            ))
            return
        username = 'testuser'
        email = 'n.al-hasnawi@dkfz-heidelberg.de'
        password = '123123'
        first_name = 'Admin'
        last_name = 'User'

        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(f'User "{username}" already exists.')
            )
            user = User.objects.get(username=username)
        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name
            )
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created user "{username}"')
            )

        token, created = Token.objects.get_or_create(user=user)
        if created:
            self.stdout.write(
                self.style.SUCCESS(f'Created auth token for user "{username}"')
            )
        else:
            self.stdout.write(
                self.style.WARNING(f'Auth token for user "{username}" already exists')
            )

        self.stdout.write('\n' + '='*50)
        self.stdout.write('TEST USER DETAILS:')
        self.stdout.write('='*50)
        self.stdout.write(f'Username: {username}')
        self.stdout.write(f'Email: {email}')
        self.stdout.write(f'Password: {password}')
        self.stdout.write(f'First Name: {first_name}')
        self.stdout.write(f'Last Name: {last_name}')
        self.stdout.write(f'Token: {token.key}')
        self.stdout.write('='*50)
