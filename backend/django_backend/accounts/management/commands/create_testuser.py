from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = 'Create a test user for development purposes'

    def handle(self, *args, **options):
        # Test user details
        username = 'testuser'
        email = 'n.al-hasnawi@dkfz-heidelberg.de'
        password = '123123'
        first_name = 'Admin'
        last_name = 'User'

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            self.stdout.write(
                self.style.WARNING(f'User "{username}" already exists.')
            )
            user = User.objects.get(username=username)
        else:
            # Create the user
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

        # Create or get auth token
        token, created = Token.objects.get_or_create(user=user)
        if created:
            self.stdout.write(
                self.style.SUCCESS(f'Created auth token for user "{username}"')
            )
        else:
            self.stdout.write(
                self.style.WARNING(f'Auth token for user "{username}" already exists')
            )

        # Display user information
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
