# EpiSelector Docker Management Script

param([string]$Command)

if ($Command -eq "dev") {
    Write-Host "Starte Development-Umgebung..."
    docker-compose up --build
}
elseif ($Command -eq "dev-detached") {
    Write-Host "Starte Development im Hintergrund..."
    docker-compose up -d --build
}
elseif ($Command -eq "stop") {
    Write-Host "Stoppe alle Container..."
    docker-compose down
}
elseif ($Command -eq "logs") {
    Write-Host "Zeige Logs..."
    docker-compose logs -f
}
else {
    Write-Host "Verfügbare Befehle:"
    Write-Host "  dev              - Starte Development-Umgebung"
    Write-Host "  dev-detached     - Starte Development im Hintergrund"
    Write-Host "  stop             - Stoppe alle Container"
    Write-Host "  logs             - Zeige Container-Logs"
    Write-Host ""
    Write-Host "Beispiel: .\docker.ps1 dev"
}