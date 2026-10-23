#!/bin/bash

if [ ! -f /app/django_backend/local_settings.py ]; then
  echo "ERROR: /app/django_backend/local_settings.py is missing or not a file." >&2
  echo "docker-compose.yml mounts \$DJANGO_LOCAL_SETTINGS there (default: ./config/django/local_settings.dev.py)." >&2
  echo "If that file does not exist on the host, Docker creates an empty directory in its place." >&2
  echo "To fix: run docker compose down, delete the empty directory (e.g. rm -r config/django/local_settings.prod.py)," >&2
  echo "create the file from config/django/local_settings.prod.example.py, fill it in, and start again." >&2
  exit 1
fi

# Warte auf Datenbank
echo "Warte auf PostgreSQL..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL ist bereit!"

# Führe Django-Befehle aus
echo "Führe Migrationen aus..."
python manage.py migrate

echo "Sammle statische Dateien..."
python manage.py collectstatic --noinput

# Startbefehl kommt aus CMD (Dockerfile) bzw. "command:" (docker-compose.yml)
echo "Starte Django-Server: $*"
exec "$@"
