FROM r-base:4.3.1

WORKDIR /app

# System-Dependencies installieren
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# R-Packages installieren
RUN R -e "install.packages(c('plumber', 'jsonlite', 'dplyr', 'MatchIt', 'optmatch', 'Matching'), repos='https://cran.rstudio.com/')"

# R-Code kopieren
COPY . .

# Port für Plumber API freigeben
EXPOSE 3420

# Plumber API starten
CMD ["R", "-e", "library(plumber); pr <- plumb('plumber.R'); pr$run(host='0.0.0.0', port=3420)"]