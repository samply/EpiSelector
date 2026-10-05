# Django overrides for a deployment.
# Copy to local_settings.prod.py (gitignored), fill in the values, and set
# DJANGO_LOCAL_SETTINGS=./config/django/local_settings.prod.py in .env.
# Mounted to /app/django_backend/local_settings.py and imported at the end of settings.py.
# See local_settings.example.py for more override patterns (extending lists, logging, ...).

# Generate one with: python3 -c "import secrets; print(secrets.token_urlsafe(50))"
SECRET_KEY = 'change-me'

DEBUG = False

ALLOWED_HOSTS = ['episelector.example.org']

# Origin(s) the browser uses to open the app, including the scheme.
CSRF_TRUSTED_ORIGINS = ['https://episelector.example.org']

# Uncomment when HTTPS ends at a reverse proxy that sets X-Forwarded-Proto.
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
