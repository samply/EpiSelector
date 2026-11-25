# Django overrides for docker-compose.yml (local development); mounted to /app/django_backend/local_settings.py and imported at the end of settings.py.

DEBUG = True
ALLOWED_HOSTS = ['*']

# Seeds demo credentials (testuser) on container start; never use in production.
DEMO_MODE = True
