FROM r-base:4.3.1

WORKDIR /app

# System-Dependencies installieren (erweitert für alle R Package Dependencies)
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    curl \
    libfontconfig1-dev \
    libfreetype6-dev \
    libpng-dev \
    libtiff5-dev \
    libjpeg-dev \
    libxml2-dev \
    libsodium-dev \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Installiere nur die absolut nötigen R packages
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('R6', 'stringi', 'rlang'), dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('magrittr', 'mime', 'lifecycle'), dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('crayon', 'webutils'), dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('sodium', 'httpuv'), dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('promises', 'swagger'), dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages('plumber', dependencies=FALSE);"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages('jsonlite', dependencies=FALSE);"

# R-Code kopieren
COPY . .

# Start script ausführbar machen
RUN chmod +x start_api.R

# Port für Plumber API freigeben
EXPOSE 3420

# Plumber API starten mit unserem Startup-Script
CMD ["Rscript", "start_api.R"]