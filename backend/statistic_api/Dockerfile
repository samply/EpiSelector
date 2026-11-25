FROM r-base:4.3.1

WORKDIR /app

# Install system dependencies
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

# Plumber API stack; dependencies resolve automatically (no fixed dep list)
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('plumber', 'jsonlite', 'stringr'));"

# optmatch is required for MatchIt's optimal matching
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    install.packages(c('MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'));"

# install.packages() only warns on missing packages, so fail the build explicitly
RUN R -e "pkgs <- c('plumber', 'jsonlite', 'stringr', 'MatchIt', 'optmatch', 'cobalt', 'ggplot2', 'lmtest', 'sandwich'); \
    missing <- pkgs[!vapply(pkgs, requireNamespace, logical(1), quietly = TRUE)]; \
    if (length(missing) > 0) stop('Missing R packages: ', paste(missing, collapse = ', '))"

COPY *.R .

RUN chmod +x start_api.R

EXPOSE 3420

CMD ["Rscript", "start_api.R"]
