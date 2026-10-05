#!/bin/bash

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
