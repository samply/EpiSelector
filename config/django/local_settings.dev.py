# Django overrides for docker-compose.yml (local development).
# Mounted to /app/django_backend/local_settings.py and imported at the end of settings.py.

DEBUG = True
ALLOWED_HOSTS = ['*']
