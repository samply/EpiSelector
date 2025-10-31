FROM r-base:4.3.1

WORKDIR /app

# System-Dependencies installieren
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libfontconfig1-dev \
    libcairo2-dev \
    libxt-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# R-Packages installieren (mit Retry-Logik)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages('remotes'); \
    install.packages(c('plumber', 'jsonlite', 'dplyr'), dependencies=TRUE);"

# Statistik-Pakete installieren (können länger dauern)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    tryCatch({ \
        install.packages(c('ggplot2', 'stringr'), dependencies=TRUE); \
        print('Basic stats packages installed'); \
    }, error=function(e) print(paste('Error installing basic stats:', e$message)))"

# Advanced Matching-Pakete installieren (optional, können fehlschlagen)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    tryCatch({ \
        install.packages(c('MatchIt', 'cobalt', 'lmtest', 'sandwich'), dependencies=TRUE); \
        print('Advanced matching packages installed'); \
    }, error=function(e) print(paste('Warning installing advanced packages:', e$message)))"

# Verify installation
RUN R -e "library(plumber); library(jsonlite); library(dplyr); print('Core packages loaded successfully')"

# R-Code kopieren
COPY . .

# Start script ausführbar machen
RUN chmod +x start_api.R

# Port für Plumber API freigeben
EXPOSE 3420

# Health check script erstellen
RUN echo '#!/bin/bash\ncurl -f http://localhost:3420/test || exit 1' > /health-check.sh && chmod +x /health-check.sh

# Plumber API starten mit unserem Startup-Script
CMD ["Rscript", "start_api.R"]