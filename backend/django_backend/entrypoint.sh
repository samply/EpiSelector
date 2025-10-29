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

echo "Starte Django-Server..."
exec python manage.py runserver 0.0.0.0:8000