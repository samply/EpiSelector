#!/usr/bin/env Rscript

cat("Starting R Plumber API...\n")

# Load plumber
library(plumber)

# Lade und starte die API
cat("Loading plumber.R...\n")
pr <- plumb("plumber.R")

cat("Starting API on port 3420...\n")
pr$run(host = "0.0.0.0", port = 3420)
