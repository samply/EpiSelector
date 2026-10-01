# Reference for a partial Django settings override.
#
# settings.py ends with `from .local_settings import *`, so every name defined here
# replaces the value of the same name in settings.py. Anything not defined here keeps
# its default. Copy only what you need into your own override file, then point
# DJANGO_LOCAL_SETTINGS in .env at that file (see local_settings.prod.example.py).

import os

# --- 1. Replace single values ------------------------------------------------------

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'change-me')
DEBUG = False
ALLOWED_HOSTS = ['episelector.example.org', 'localhost']
TIME_ZONE = 'Europe/Berlin'

# --- 2. Extend values defined in settings.py instead of copying them ----------------
# This file is imported at the end of settings.py, so all base values already exist
# and can be imported from it. Build new objects; do not modify the imported ones.

from .settings import CORS_ALLOWED_ORIGINS, REST_FRAMEWORK  # noqa: E402

CORS_ALLOWED_ORIGINS = CORS_ALLOWED_ORIGINS + ['https://episelector.example.org']

REST_FRAMEWORK = {
    **REST_FRAMEWORK,
    # Rate limiting, only as an example of adding keys to a dict setting
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.AnonRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'anon': '100/minute'},
}

# --- 3. Settings that settings.py does not define yet ------------------------------

CSRF_TRUSTED_ORIGINS = ['https://episelector.example.org']

# HTTPS behind a reverse proxy that sets X-Forwarded-Proto
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Uploaded datasets are sent as the request body (default in settings.py: 200 MB)
DATA_UPLOAD_MAX_MEMORY_SIZE = 500 * 1024 * 1024

# Log Django warnings and errors to the container output
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {'console': {'class': 'logging.StreamHandler'}},
    'root': {'handlers': ['console'], 'level': 'WARNING'},
}

# The database comes from DATABASE_URL (docker-compose.yml). To use a different
# database without changing docker-compose.yml, define DATABASES here instead:
# import dj_database_url
# DATABASES = {'default': dj_database_url.parse('postgresql://user:password@host:5432/episelector')}
