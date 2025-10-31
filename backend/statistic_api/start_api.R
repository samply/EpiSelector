#!/usr/bin/env Rscript

# R API Startup Script
cat("Starting R Plumber API...\n")

# Check if plumber is available
if (!requireNamespace("plumber", quietly = TRUE)) {
  cat("Error: plumber package not found. Installing...\n")
  install.packages("plumber", repos = "https://cran.rstudio.com/")
}

# Load required packages
cat("Loading plumber library...\n")
library(plumber)

# Check if plumber.R exists
if (!file.exists("plumber.R")) {
  cat("Error: plumber.R file not found in current directory\n")
  quit(status = 1)
}

# Create and run the API
cat("Loading plumber.R...\n")
tryCatch({
  pr <- plumb("plumber.R")
  cat("Starting API on host 0.0.0.0, port 3420...\n")
  pr$run(host = "0.0.0.0", port = 3420, debug = TRUE)
}, error = function(e) {
  cat("Error starting API:", e$message, "\n")
  quit(status = 1)
})