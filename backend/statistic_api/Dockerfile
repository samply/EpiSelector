FROM r-base:4.3.1

WORKDIR /app

# Install system dependencies (extended for all R package dependencies)
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

# Install only the absolutely necessary R packages
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('R6', 'stringi', 'rlang', 'magrittr', 'mime', 'lifecycle', 'crayon', 'webutils', 'sodium', 'httpuv', 'promises', 'swagger', 'jsonlite'), dependencies=FALSE); \
    install.packages(c('plumber', 'stringr'));"

# Analysis packages for matching, balance and plots (optmatch is required for MatchIt's optimal matching)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'));"

# Abort the build if a package is missing (install.packages() only warns on errors)
RUN R -e "pkgs <- c('plumber', 'jsonlite', 'stringr', 'MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'); \
    missing <- pkgs[!vapply(pkgs, requireNamespace, logical(1), quietly = TRUE)]; \
    if (length(missing) > 0) stop('Missing R packages: ', paste(missing, collapse = ', '))"

# Copy R code
COPY *.R .

# Make start script executable
RUN chmod +x start_api.R

# Expose port for Plumber API
EXPOSE 3420

# Start Plumber API with our startup script
CMD ["Rscript", "start_api.R"]
