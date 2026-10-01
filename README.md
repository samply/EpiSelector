# EpiSelector

EpiSelector is a browser-based, open-source application for selecting comparison groups in medical and epidemiological research.
Researchers use EpiSelector to create balanced comparison groups in observational studies with matching methods such as variable-based matching and propensity score matching.

The default Docker image tag is `englishversion-en` (English user interface). For the German user interface, built from this `master` branch, set `EPISELECTOR_IMAGE_TAG=master-de`. The English version is developed on the [`englishversion`](https://github.com/samply/EpiSelector/tree/englishversion) branch.

---

## Overview

Randomized controlled trials (RCTs) are the gold standard in medical research because randomization balances comparison groups. Observational studies cannot assign participants at random. Researchers use statistical matching methods to create comparable groups and reduce confounding.

EpiSelector gives researchers a graphical, no-code interface for matching workflows. It fits between data preparation and statistical analysis and guides users through method selection, balance checks, and export.

---

## Key Features

- Browser-based graphical user interface
- No programming required
- Transparent and reproducible matching workflows
- Step-by-step guidance during the matching process
- Interactive visualization of covariate balance
- Export of matched datasets and matching protocols

### Implemented Matching Methods

- Variable-based matching
- Propensity score matching
- Nearest Neighbor Matching (NNM)
- Optimal Matching (OM)

### Additional Functionality

- Balance diagnostics with standardized mean differences
- Interactive charts and plots
- Matching configuration templates
- Export of matched datasets, matching weights, matching IDs, propensity scores, and PDF matching protocols

---

## Architecture

EpiSelector uses a modular web architecture.

**Frontend**

- React
- Material UI
- Highcharts for visualization

**Backend**

- Django / Python web backend
- PostgreSQL database in Docker Compose deployments
- SQLite fallback for local backend development without Docker
- R statistical environment
- MatchIt for matching
- cobalt for balance diagnostics
- plumber for REST API integration

The architecture lets EpiSelector combine web application code with statistical methods from R while keeping one browser interface for users.

---

## Deployment

EpiSelector runs as a Docker Compose application with separate containers for the frontend, Django backend, R backend, and database.

Supported deployment scenarios include:

1. **Local installation**

   - Run EpiSelector on a single researcher’s computer.
   - Keep data on the local device.

2. **Local network deployment**

   - Run EpiSelector on a server inside an institutional network.
   - Let multiple users access the application through a web browser.
   - Keep data inside the protected network.

This setup helps institutions meet data protection requirements by choosing where the application and data run.

---

## Getting Started with Docker Compose

Docker Compose is the fastest way to run EpiSelector locally. It starts the React frontend, Django backend, R statistics backend, and PostgreSQL database.

### Prerequisites

Install Docker Desktop or Docker Engine with the Docker Compose plugin.

Check that Docker Compose is available:

```bash
docker compose version
```

If your system uses the older standalone command, replace `docker compose` with `docker-compose` in the commands below.

### Start EpiSelector

Clone the repository and start the application:

```bash
git clone https://github.com/samply/EpiSelector.git
cd EpiSelector
cp .env.example .env
# set POSTGRES_PASSWORD in .env, e.g. to the output of: openssl rand -hex 24
docker compose up
```

Django reads its development overrides (debug mode, allowed hosts) from `config/django/local_settings.dev.py`, which Docker Compose mounts into the container.

On the first startup, Docker pulls or builds the required images. This can take a few minutes.

Open EpiSelector in your browser:

```text
http://localhost:3000
```

Only the frontend is published on the host. The frontend's nginx forwards `/api/` and `/control_selection/` to the Django backend; Django, the R backend and PostgreSQL are reachable only inside the Docker network.

### Run in the Background

Start the application in detached mode:

```bash
docker compose up -d
```

View logs:

```bash
docker compose logs -f
```

Stop the application:

```bash
docker compose down
```

### Reset Local Data

Docker stores the PostgreSQL database in the `postgres_data` volume. To stop the application and delete the local database state, run:

```bash
docker compose down -v
```

Warning: Use this only when you want to remove local EpiSelector data. This will delete the docker volume.

### Optional Helper Scripts

The repository includes helper scripts that wrap common Docker Compose commands.

On macOS or Linux:

```bash
./docker.sh dev
```

On Windows PowerShell:

```powershell
.\docker.ps1 dev
```

---

## Production Deployment

A deployment uses the same `docker-compose.yml`; Django runs under gunicorn in both cases. What differs is the Django settings file and the database password. Before the first start, create the two deployment-specific files:

1. `.env`: copy `.env.example`, set `POSTGRES_PASSWORD` (letters and digits only, e.g. `openssl rand -hex 24`), and uncomment `DJANGO_LOCAL_SETTINGS=./config/django/local_settings.prod.py`.
2. `config/django/local_settings.prod.py`: copy `config/django/local_settings.prod.example.py` and set `SECRET_KEY`, `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` for your domain. The file is gitignored and is mounted into the Django container, where it overrides the built-in settings. `config/django/local_settings.example.py` shows further override patterns, such as extending lists from `settings.py` instead of copying them.

```bash
cp .env.example .env
cp config/django/local_settings.prod.example.py config/django/local_settings.prod.py
# edit both files, then:
docker compose up -d
```

Create `local_settings.prod.py` before starting the stack: if the file is missing, Docker creates an empty directory in its place.

---

## Data Requirements

Input data must use CSV format with one observation per row and one variable per column.

Requirements:

- Rows contain observations.
- Columns contain variables.
- Matching variables contain no missing values.
- You complete preprocessing before importing the dataset.

EpiSelector does not perform data preprocessing such as missing value imputation, feature engineering, or data transformation. Complete those steps before matching.

---

## Workflow

A typical EpiSelector workflow has these steps:

1. Prepare data in an external tool.
2. Import the dataset into EpiSelector.
3. Select a matching method.
4. Configure matching parameters.
5. Evaluate balance diagnostics.
6. Export the matched dataset.
7. Perform statistical analysis in external software such as R, SAS, or SPSS.

---

## Example Use Case

The EpiSelector team demonstrated the application with the Framingham Heart Study teaching dataset.

The example selects a comparison group for patients receiving antihypertensive medication to analyze the association with coronary heart disease. It shows how matching can reduce confounding from imbalanced baseline characteristics.

---

## Local Development without Docker Compose

You can also run individual components during development.

### Frontend only with Docker Compose

```bash
cd frontend
docker compose up
```

### Frontend from source

```bash
cd frontend
npm install
npm start
```

### Django backend from source

```bash
cd backend/django_backend
python manage.py migrate
python manage.py runserver
```

### R statistics backend from source

```bash
cd backend/statistic_api
R -e "pr <- plumber::plumb('plumber.R'); pr$run(host='0.0.0.0', port=3420)"
```

You can also open `backend/statistic_api/plumber.R` in RStudio and run the API from there.
