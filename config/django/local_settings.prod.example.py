# Deployment overrides: copy to local_settings.prod.py (gitignored), fill in, and set DJANGO_LOCAL_SETTINGS=./config/django/local_settings.prod.py in .env.
# Mounted to /app/django_backend/local_settings.py and imported at the end of settings.py; see local_settings.example.py for more override patterns.

# Generate one with: python3 -c "import secrets; print(secrets.token_urlsafe(50))"
SECRET_KEY = 'change-me'

DEBUG = False

# Demo credentials (testuser) are only seeded when DEMO_MODE = True; keep off on productive systems.
DEMO_MODE = False

ALLOWED_HOSTS = ['episelector.example.org']

# Origin(s) the browser uses to open the app, including the scheme.
CSRF_TRUSTED_ORIGINS = ['https://episelector.example.org']

# Uncomment when HTTPS ends at a reverse proxy that sets X-Forwarded-Proto.
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
