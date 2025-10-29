# EpiSelector Docker Management Script für Windows

param(
    [Parameter(Mandatory=$true)]
    [string]$Command
)

switch ($Command) {
    "dev" {
        Write-Host "🚀 Starte Development-Umgebung..." -ForegroundColor Green
        docker-compose up --build
    }
    "dev-detached" {
        Write-Host "🚀 Starte Development-Umgebung im Hintergrund..." -ForegroundColor Green
        docker-compose up -d --build
    }
    "prod" {
        Write-Host "🚀 Starte Production-Umgebung..." -ForegroundColor Green
        docker-compose -f docker-compose.prod.yml up -d --build
    }
    "stop" {
        Write-Host "⏹️ Stoppe alle Container..." -ForegroundColor Yellow
        docker-compose down
        docker-compose -f docker-compose.prod.yml down
    }
    "clean" {
        Write-Host "🧹 Bereinige Docker (Container, Images, Volumes)..." -ForegroundColor Red
        docker-compose down -v --rmi all
        docker system prune -f
    }
    "logs" {
        Write-Host "📋 Zeige Logs..." -ForegroundColor Blue
        docker-compose logs -f
    }
    "shell-django" {
        Write-Host "🔧 Django Shell..." -ForegroundColor Cyan
        docker-compose exec django-backend python manage.py shell
    }
    "migrate" {
        Write-Host "📦 Führe Django Migrationen aus..." -ForegroundColor Magenta
        docker-compose exec django-backend python manage.py migrate
    }
    default {
        Write-Host "EpiSelector Docker Management" -ForegroundColor White
        Write-Host ""
        Write-Host "Verfügbare Befehle:" -ForegroundColor Yellow
        Write-Host "  dev              - Starte Development-Umgebung" -ForegroundColor Gray
        Write-Host "  dev-detached     - Starte Development im Hintergrund" -ForegroundColor Gray
        Write-Host "  prod             - Starte Production-Umgebung" -ForegroundColor Gray
        Write-Host "  stop             - Stoppe alle Container" -ForegroundColor Gray
        Write-Host "  clean            - Bereinige Docker komplett" -ForegroundColor Gray
        Write-Host "  logs             - Zeige Container-Logs" -ForegroundColor Gray
        Write-Host "  shell-django     - Django Shell öffnen" -ForegroundColor Gray
        Write-Host "  migrate          - Django Migrationen ausführen" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Beispiel: .\docker.ps1 dev" -ForegroundColor Green
    }
}