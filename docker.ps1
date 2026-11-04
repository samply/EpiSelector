# EpiSelector Docker Management Script

param([string]$Command)

if ($Command -eq "dev") {
    Write-Host "Starting development environment..."
    docker compose up --build
}
elseif ($Command -eq "dev-detached") {
    Write-Host "Starting development environment in the background..."
    docker compose up -d --build
}
elseif ($Command -eq "stop") {
    Write-Host "Stopping all containers..."
    docker compose down
}
elseif ($Command -eq "logs") {
    Write-Host "Showing logs..."
    docker compose logs -f
}
else {
    Write-Host "Available commands:"
    Write-Host "  dev              - Start development environment"
    Write-Host "  dev-detached     - Start development environment in the background"
    Write-Host "  stop             - Stop all containers"
    Write-Host "  logs             - Show container logs"
    Write-Host ""
    Write-Host "Example: .\docker.ps1 dev"
}