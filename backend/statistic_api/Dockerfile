FROM r-base:4.3.1

WORKDIR /app

# System-Dependencies installieren
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installiere alle R packages mit dependencies
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('plumber', 'jsonlite'), dependencies=TRUE);"

# R-Code kopieren
COPY . .

# Start script ausführbar machen
RUN chmod +x start_api.R

# Port für Plumber API freigeben
EXPOSE 3420

# Plumber API starten mit unserem Startup-Script
CMD ["Rscript", "start_api.R"]