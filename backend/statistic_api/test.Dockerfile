FROM r-base:4.3.1

WORKDIR /app

# System-Dependencies installieren
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Test installation with verbose output
RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    cat('Installing base packages...\n'); \
    install.packages(c('R6', 'stringi', 'magrittr', 'mime', 'rlang'), dependencies=FALSE); \
    cat('Base packages installed:\n'); \
    cat(paste(rownames(installed.packages()[installed.packages()[,'Package'] %in% c('R6', 'stringi', 'magrittr', 'mime', 'rlang'),]), collapse=', '), '\n');"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    cat('Installing lifecycle, webutils, crayon, sodium...\n'); \
    install.packages(c('lifecycle', 'webutils', 'crayon', 'sodium'), dependencies=FALSE); \
    cat('Second group installed:\n'); \
    cat(paste(rownames(installed.packages()[installed.packages()[,'Package'] %in% c('lifecycle', 'webutils', 'crayon', 'sodium'),]), collapse=', '), '\n');"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    cat('Installing httpuv, promises, swagger...\n'); \
    install.packages(c('httpuv', 'promises', 'swagger'), dependencies=FALSE); \
    cat('Third group installed:\n'); \
    cat(paste(rownames(installed.packages()[installed.packages()[,'Package'] %in% c('httpuv', 'promises', 'swagger'),]), collapse=', '), '\n');"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    cat('Installing plumber...\n'); \
    install.packages('plumber', dependencies=FALSE); \
    cat('Plumber installation result:\n'); \
    if(requireNamespace('plumber', quietly=TRUE)) { cat('SUCCESS\n') } else { cat('FAILED\n') };"

RUN R -e "options(repos = c(CRAN = 'https://cran.rstudio.com/')); \
    cat('Installing jsonlite...\n'); \
    install.packages('jsonlite', dependencies=FALSE); \
    cat('Final package list:\n'); \
    print(installed.packages()[,c('Package','Version')]);"

CMD ["R", "--version"]