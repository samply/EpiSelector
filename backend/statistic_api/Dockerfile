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
    binutils \
    && rm -rf /var/lib/apt/lists/*

# Installiere nur die absolut nötigen R packages
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('R6', 'stringi', 'rlang', 'magrittr', 'mime', 'lifecycle', 'crayon', 'webutils', 'sodium', 'httpuv', 'promises', 'swagger', 'jsonlite'), dependencies=FALSE); \
    install.packages(c('plumber', 'stringr'));"

# Analyse-Pakete für Matching, Balance und Grafiken (optmatch wird für MatchIt's optimal matching benötigt)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'));"

# Build abbrechen, falls ein Paket fehlt (install.packages() warnt nur bei Fehlern)
RUN R -e "pkgs <- c('plumber', 'jsonlite', 'stringr', 'MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'); \
    missing <- pkgs[!vapply(pkgs, requireNamespace, logical(1), quietly = TRUE)]; \
    if (length(missing) > 0) stop('Missing R packages: ', paste(missing, collapse = ', '))"

# R-Code kopieren
COPY *.R .

# Start script ausführbar machen
RUN chmod +x start_api.R

# Port für Plumber API freigeben
EXPOSE 3420

# Plumber API starten mit unserem Startup-Script
CMD ["Rscript", "start_api.R"]
