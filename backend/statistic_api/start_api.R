#!/usr/bin/env Rscript

cat("Starting R Plumber API...\n")

# Einfache Package-Check und Start
if (!requireNamespace("plumber", quietly = TRUE) || !requireNamespace("jsonlite", quietly = TRUE)) {
  cat("Required packages are missing. Installing...\n")
  install.packages(c("plumber", "jsonlite"), dependencies = TRUE)
}

# Load plumber
library(plumber)

# Lade und starte die API
cat("Loading plumber.R...\n")
pr <- plumb("plumber.R")

cat("Starting API on port 3420...\n")
pr$run(host = "0.0.0.0", port = 3420)