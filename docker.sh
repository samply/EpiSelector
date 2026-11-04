#!/bin/bash

# EpiSelector Docker Management Script

case "$1" in
    "dev")
        echo "🚀 Starting development environment..."
        docker compose up --build
        ;;
    "dev-detached")
        echo "🚀 Starting development environment in the background..."
        docker compose up -d --build
        ;;
    "stop")
        echo "⏹️ Stopping all containers..."
        docker compose down
        ;;
    "clean")
        echo "🧹 Cleaning up Docker (containers, images, volumes)..."
        docker compose down -v --rmi all
        docker system prune -f
        ;;
    "logs")
        echo "📋 Showing logs..."
        docker compose logs -f
        ;;
    "shell-django")
        echo "🔧 Django Shell..."
        docker compose exec django-backend python manage.py shell
        ;;
    "migrate")
        echo "📦 Running Django migrations..."
        docker compose exec django-backend python manage.py migrate
        ;;
    *)
        echo "EpiSelector Docker Management"
        echo ""
        echo "Available commands:"
        echo "  dev              - Start development environment"
        echo "  dev-detached     - Start development environment in the background"
        echo "  stop             - Stop all containers"
        echo "  clean            - Clean up Docker completely"
        echo "  logs             - Show container logs"
        echo "  shell-django     - Open Django shell"
        echo "  migrate          - Run Django migrations"
        echo ""
        echo "Example: ./docker.sh dev"
        ;;
esac