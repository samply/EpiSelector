For english version see branch https://github.com/samply/EpiSelector/tree/englishversion  

Quick Start:

Start EpiSelector with Docker:
.\docker.ps1 dev 

Start only Frontend of EpiSelector:
go to path .\frontend\ 
then docker-compose up

Start EpiSelector Frontend with Code:
go to path .\frontend
then npm start

Start EpiSelector Backend with Code:
go to path .\backend\django_backend
then python manage.py runserver
go to path .\backend\statistic_api
then R -e "pr <- plumber::plumb('plumber.R'); pr$run(host='0.0.0.0', port=8000)" or run using RStudio -> Run API



Wthat you need to Start EpiSelector:
Frontend: 
Node.js
npm (Node Package Manager) for
  - React
  - Material UI
  - Highcharts

Backend:
Django
R-Studio packages: Plumber and MatchIt
