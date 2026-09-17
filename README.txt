For english version see branch https://github.com/samply/EpiSelector/tree/englishversion  

# EpiSelector 

A browser-based open-source application for the selection of comparison groups in medical and epidemiological research.
EpiSelector supports researchers in creating balanced comparison groups in observational studies using matching methods such as variable-based matching and propensity score matching.

---

## Overview

Randomized controlled trials (RCTs) are considered the gold standard in medical research because randomization ensures balanced comparison groups. In observational studies, however, random assignment is not possible. In such cases, statistical methods such as matching are used to create comparable groups and reduce confounding effects.
EpiSelector provides a graphical, no-code interface that helps researchers perform matching procedures in a transparent and reproducible way without requiring programming skills.
The tool integrates into the data analysis workflow between **data preparation and statistical analysis** and assists users with methodological guidance throughout the matching process.

---


## Key Features

- Browser-based graphical user interface
- No programming required
- Transparent and reproducible matching workflows
- Step-by-step guidance during the matching process
- Interactive visualization of covariate balance
- Export of matched datasets and matching protocols

### Implemented Matching Methods

- **Variable-based matching**
- **Propensity score matching**
- Nearest Neighbor Matching (NNM)
- Optimal Matching (OM)


### Additional Functionality

- Balance diagnostics (standardized mean differences)
- Interactive charts and plots
- Matching configuration templates

- Export of:
  - matched dataset
  - matching weights
  - matching IDs
  - propensity scores
  - PDF matching protocol

--- 

## Architecture

EpiSelector is implemented using a modular web-based architecture:

**Frontend**

- React
- Material UI
- Highcharts for visualization

**Backend**

- Django (Python)
- SQLite database
- R statistical environment
- MatchIt (matching)
- cobalt (balance diagnostics)
- plumber (REST API integration) 

This architecture allows the integration of statistical methods implemented in different programming languages while maintaining a unified web interface.

---

 

## Deployment

EpiSelector is distributed as a **Docker container**, allowing flexible deployment in different environments.

Possible deployment scenarios:

1. **Local installation**

   - Run on a single researcher’s computer
   - Data remains on the local device

2. **Local network deployment**

   - Server installation within an institutional network
   - Multiple users access via web browser
   - Data remains inside the protected network

This design supports compliance with data protection requirements.

---

 

## Data Requirements

Input data must be provided as a **CSV file** in tabular format.

Requirements:

- rows = observations
- columns = variables
- no missing values in matching variables
- preprocessing must be performed before importing the dataset

 
EpiSelector does **not perform data preprocessing** such as:

- missing value imputation
- feature engineering
- data transformation


These steps must be completed prior to matching.

---

 
## Workflow


Typical workflow when using EpiSelector:

1. Data preparation (external tool)

2. Import dataset into EpiSelector

3. Select matching method

4. Configure matching parameters

5. Evaluate balance diagnostics

6. Export matched dataset

7. Perform statistical analysis using external software (e.g., R, SAS, SPSS)

 

---

 

## Example Use Case

 

The functionality of EpiSelector has been demonstrated using the **Framingham Heart Study teaching dataset**.

Example application:

Selection of a comparison group for patients receiving antihypertensive medication to analyze the association with coronary heart disease.

The example demonstrates how matching can remove confounding effects caused by imbalanced baseline characteristics.

---

 

## Run Application 


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


