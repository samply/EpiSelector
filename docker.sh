#!/bin/bash

# EpiSelector Docker Management Script

case "$1" in
    "dev")
        echo "🚀 Starte Development-Umgebung..."
        docker-compose up --build
        ;;
    "dev-detached")
        echo "🚀 Starte Development-Umgebung im Hintergrund..."
        docker-compose up -d --build
        ;;
    "stop")
        echo "⏹️ Stoppe alle Container..."
        docker-compose down
        ;;
    "clean")
        echo "🧹 Bereinige Docker (Container, Images, Volumes)..."
        docker-compose down -v --rmi all
        docker system prune -f
        ;;
    "logs")
        echo "📋 Zeige Logs..."
        docker-compose logs -f
        ;;
    "shell-django")
        echo "🔧 Django Shell..."
        docker-compose exec django-backend python manage.py shell
        ;;
    "migrate")
        echo "📦 Führe Django Migrationen aus..."
        docker-compose exec django-backend python manage.py migrate
        ;;
    *)
        echo "EpiSelector Docker Management"
        echo ""
        echo "Verfügbare Befehle:"
        echo "  dev              - Starte Development-Umgebung"
        echo "  dev-detached     - Starte Development im Hintergrund"
        echo "  stop             - Stoppe alle Container"
        echo "  clean            - Bereinige Docker komplett"
        echo "  logs             - Zeige Container-Logs"
        echo "  shell-django     - Django Shell öffnen"
        echo "  migrate          - Django Migrationen ausführen"
        echo ""
        echo "Beispiel: ./docker.sh dev"
        ;;
esac