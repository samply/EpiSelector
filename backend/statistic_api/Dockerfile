FROM rhub/r-minimal:4.2.0

WORKDIR /app

# Copy files first
COPY plumber.R start_api.R ./

# Install packages using installr with Alpine package names
RUN installr -d \
    -a 'openssl-dev curl-dev libxml2-dev' \
    plumber jsonlite

# Expose port
EXPOSE 3420

# Start API
CMD ["Rscript", "start_api.R"]