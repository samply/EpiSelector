#
# This is a Plumber API. You can run the API by clicking
# the 'Run API' button above.
#
# Find out more about building APIs with Plumber here:
#
#    https://www.rplumber.io/
# 
# for execution in Windows terminal use "C:\Your_Path_To_R\R\R_Version\bin\Rscript.exe" -e "library(plumber); r <- plumb('api.R'); r$run(port = 6341)"
#

library(plumber)
library(MatchIt)
library(stringr)
library("jsonlite")
library("ggplot2")
library("cobalt")
library("lmtest") #coeftest
library("sandwich") #vcovCL

# Health check endpoint
#* @get /test
function() {
  list(status = "OK", message = "R backend is running", timestamp = Sys.time())
}


#* @apiTitle Plumber Example API
#* @apiDescription Plumber example description.
#* @apiVersion 0.0.9
#* @apiTag matching statistical matching operations
#* @apiTag "statistical information" operations to receive statistical information
#* @apiTag plotting plot operations


#* #* Log information about the incoming request
#* @filter logger
function(req){
  cat(as.character(Sys.time()), "-",
      req$REQUEST_METHOD, req$PATH_INFO, "-",
      req$HTTP_USER_AGENT, "@", req$REMOTE_ADDR, "\n")
  plumber::forward()
}

#* @filter cors
cors <- function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  plumber::forward()
}


perform_matching <- function(req, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio, mcalipervariables) {
  # Body auslesen
  body <- req$body
  
  print("body")
  print(body)
  
  print("Hier unser neuer Log:")
  print("Groupindicator:")
  print(groupindicator)
  print("Controllvariables")
  print(controllvariables)
  print("mdistance")
  print(mdistance)
  print("mmethod")
  print(mmethod)
  print("mreplace")
  print(mreplace)
  print("mratio")
  print(mratio)
  print("Caliper:")
  print(mcaliper)
  print("Calipervariables")
  print(mcalipervariables)
  
  
  # Typkonvertierungen
  mreplace <- if (mreplace == "") FALSE else as.logical(mreplace)
  mratio <- as.integer(mratio)
  
  # Kontrollvariablen vorbereiten
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables) - 1)
  controllvariables <- trimws(strsplit(trimed_string, ",")[[1]])
  vars <- paste(controllvariables, collapse = "+")
  form <- as.formula(paste(groupindicator, "~", vars))
  
  # Caliper verarbeiten
  use_caliper <- !is.null(mcaliper) && mcaliper != ""
  if (use_caliper) {
    mcaliper_clean <- gsub("\\[|\\]", "", mcaliper)
    mcaliper_split <- trimws(strsplit(mcaliper_clean, ",")[[1]])
    mcaliper_numeric <- as.numeric(mcaliper_split)
    
    # Prüfen, ob auch mcalipervariables angegeben wurden
    has_caliper_vars <- !is.null(mcalipervariables) &&
      mcalipervariables != "" &&
      grepl("[^,[:space:]]", mcalipervariables)
    
    if (has_caliper_vars) {
      mcalipervariables_clean <- gsub("\\[|\\]", "", mcalipervariables)
      mcalipervariables_split <- trimws(strsplit(mcalipervariables_clean, ",")[[1]])
      
      # Sicherstellen, dass die Anzahl der Namen passt
      if (length(mcalipervariables_split) == length(mcaliper_numeric) &&
          all(mcalipervariables_split != "")) {
        names(mcaliper_numeric) <- mcalipervariables_split
        mcaliper <- mcaliper_numeric
        print("Using named caliper:")
        print(mcaliper)
      } else {
        stop("Mismatch between caliper values and variable names!")
      }
    } else {
      if (length(mcaliper_numeric) > 1) {
        stop("Mehrere Caliper-Werte, aber keine Variablennamen angegeben!")
      }
      mcaliper <- mcaliper_numeric
      print("Using global (unnamed) caliper:")
      print(mcaliper)
    }
  } else {
    mcaliper <- NULL
    print("No caliper will be used.")
  }
  
  # Matching durchführen
  if (mmethod == "exact") {
    exact_vars <- paste(controllvariables, collapse = "+")
    exact_form <- as.formula(paste("~", exact_vars))
    
    a <- matchit(form, data = body,
                 distance = mdistance,
                 replace = mreplace,
                 ratio = mratio,
                 caliper = mcaliper,
                 std.caliper = FALSE,
                 exact = exact_form)
    
  } else if (mmethod == "nearest") {
    print("before matching")
    print(mcaliper)
    a <- matchit(form, data = body,
                 method = mmethod,
                 distance = mdistance,
                 replace = mreplace,
                 ratio = mratio,
                 caliper = mcaliper,
                 std.caliper = FALSE)
    print("after matching")
    
  } else {
    a <- matchit(form, data = body,
                 method = mmethod,
                 distance = mdistance,
                 ratio = mratio)
  }
  
  return(a)
}



#* Conduct statistical matching based on a given data set
#* @post /result_data
#* @param groupindicator Name der Zielvariable
#* @param controllvariables Kontrollvariablen (JSON-Array)
#* @param mmethod Matching-Methode
#* @param mdistance Distance-Metrik
#* @param mreplace Zurücklegen
#* @param mcaliper Caliper-Wert(e)
#* @param mratio Matching-Ratio
#* @param mcalipervariables Variablen für Caliper
function(req, res,
         groupindicator,
         controllvariables,
         mdistance,
         mmethod,
         mreplace = "",
         mcaliper = "",
         mratio,
         mcalipervariables = "") {
  
  # Matching durchführen (inkl. Caliper-Handling, Konvertierungen etc.)
  a <- perform_matching(req, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio, mcalipervariables)
  
  # Ergebnisdatensatz generieren
  result_dataset <- match.data(a,
                               data = data.frame(req$body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = FALSE)
  
  # In JSON konvertieren und zurückgeben
  res$body <- jsonlite::toJSON(result_dataset, rownames = FALSE)
  res
}


#* Create pre- and post-matching boxplots
#* @param groupindicator Name of the grouping variable (x-axis of boxplot)
#* @param controllvariable Control variable (y-axis of boxplot)
#* @param controllvariables Matching control variables (json-array)
#* @param mmethod Matching method
#* @param mdistance Distance method
#* @param mreplace Matching with (TRUE) or without (FALSE) replacement
#* @param mcaliper Matching caliper
#* @param mratio Matching ratio
#* @tag plotting
#* @post /boxplot
function(req, res,
         groupindicator,
         controllvariable,
         controllvariables,
         mmethod,
         mdistance,
         mreplace = "",
         mcaliper = "",
         mratio,
         mcalipervariables = "") {
  
  body <- req$body
  
  # Step 1: Perform matching
  a <- perform_matching(req, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio, mcalipervariables)
  
  # Step 2: Create the matched dataset
  result_dataset <- match.data(a,
                               data = data.frame(body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  # Step 3: Generate boxplots pre- and post-matching
  pre_matching_boxplot <- NULL
  post_matching_boxplot <- NULL
  
  for (i in 1:2) {
    current_data <- if (i == 1) body else result_dataset
    
    # Create formula for boxplot
    form <- as.formula(paste(controllvariable, "~", groupindicator))
    
    # Create boxplot object
    boxplot_obj <- boxplot(form, data = current_data)
    
    # Extract boxplot data
    data_points_array <- boxplot_obj$stats
    outliers <- boxplot_obj$out
    outliers_group <- boxplot_obj$group
    
    # Process outliers
    outliers <- Map(list, outliers_group, outliers)
    outliers <- unique(outliers)
    outliers <- lapply(outliers, function(x) unlist(x, recursive = FALSE))
    
    # Adjust group indices (start from 0)
    if (length(outliers) >= 1) {
      for (x in seq_along(outliers)) {
        outliers[[x]][1] <- outliers[[x]][1] - 1
      }
    }
    
    # Separate boxplot arrays
    boxplot_one_array <- data_points_array[, 1]
    boxplot_two_array <- data_points_array[, 2]
    
    # Value names
    names_list <- list(boxplot_obj$names[1], boxplot_obj$names[2])
    
    # Assign pre- or post-matching boxplot
    if (i == 1) {
      pre_matching_boxplot <- list(
        outliers = outliers,
        boxplot_one = boxplot_one_array,
        boxplot_two = boxplot_two_array,
        plot_value_names = unlist(names_list)
      )
    } else {
      post_matching_boxplot <- list(
        outliers = outliers,
        boxplot_one = boxplot_one_array,
        boxplot_two = boxplot_two_array,
        plot_value_names = unlist(names_list)
      )
    }
  }
  
  # Step 4: Return JSON
  res$body <- jsonlite::toJSON(list(
    pre_matching = pre_matching_boxplot,
    post_matching = post_matching_boxplot
  ))
  
  res
}



#* Create pre- and post-matching histograms
#* @param groupindicator Name of the grouping variable
#* @param controllvariable Target variable for histogram
#* @param controllvariables Matching variables (json-array)
#* @param mmethod Matching method
#* @param mdistance Distance method
#* @param mreplace With or without replacement
#* @param mcaliper Matching caliper
#* @param mratio Ratio for matching
#* @param mcalipervariables (optional) Caliper variable names
#* @tag plotting
#* @post /histogram
function(req, res,
         controllvariable,
         groupindicator,
         controllvariables,
         mdistance,
         mmethod,
         mreplace = "",
         mcaliper = "",
         mratio,
         mcalipervariables = "") {
  
  body <- req$body
  
  # 1. Matching durchführen
  a <- perform_matching(
    req,
    groupindicator,
    controllvariables,
    mdistance,
    mmethod,
    mreplace,
    mcaliper,
    mratio,
    mcalipervariables
  )
  
  # 2. Matched Dataset erzeugen
  result_dataset <- match.data(a,
                               data = data.frame(body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  # 3. Histogramm PRE Matching
  initial_freq <- with(body, table(get(groupindicator), get(controllvariable)))
  initial_freq_values <- as.vector(initial_freq)
  initial_freq_values <- (initial_freq_values / sum(initial_freq_values)) * 100
  
  # 4. Histogramm POST Matching
  result_freq <- with(result_dataset, table(get(groupindicator), get(controllvariable)))
  result_freq_values <- as.vector(result_freq)
  result_freq_values <- (result_freq_values / sum(result_freq_values)) * 100
  
  # 5. Achsenbeschriftungen (Kategorien)
  categories <- colnames(initial_freq)
  
  # 6. Ergebnis in JSON
  res$body <- jsonlite::toJSON(list(
    pre_match_data = initial_freq_values,
    post_match_data = result_freq_values,
    x_axis_labels = categories
  ))
  
  res
}



#* Generate pie chart data (pre/post matching balance summary)
#* @param groupindicator Grouping variable
#* @param controllvariables Matching variables (json-array)
#* @param mmethod Matching method
#* @param mdistance Distance method
#* @param mreplace Replacement flag
#* @param mcaliper Caliper width(s)
#* @param mratio Matching ratio
#* @param mcalipervariables Variable names for caliper (optional)
#* @tag plotting
#* @post /pie_chart
function(req, res,
         groupindicator,
         controllvariables,
         mdistance,
         mmethod,
         mreplace = "",
         mcaliper = "",
         mratio,
         mcalipervariables = "") {
  
  body <- req$body
  
  # Matching durchführen
  a <- perform_matching(
    req,
    groupindicator,
    controllvariables,
    mdistance,
    mmethod,
    mreplace,
    mcaliper,
    mratio,
    mcalipervariables
  )
  
  # Balance Summary berechnen
  sum <- cobalt::bal.tab(
    a,
    disp = c("means"),
    un = TRUE,
    stats = c("m"),
    thresholds = c(m = 0.1)
  )
  
  # Daten auslesen für das Pie Chart
  row_names <- rownames(sum$Balanced.mean.diffs)
  count <- sum$Balanced.mean.diffs$count
  df <- data.frame(variable = row_names, count = count)
  
  # In JSON konvertieren
  res$body <- jsonlite::toJSON(df, rownames = FALSE)
  res
}




#* Generate summary statistics for matched data
#* @tag "statistical information"
#* @param groupindicator Grouping variable (outcome)
#* @param controllvariables Matching variables (json-array)
#* @param mdistance Distance calculation method
#* @param mmethod Matching method
#* @param mreplace With/without replacement
#* @param mcaliper Matching caliper
#* @param mratio Matching ratio
#* @param mcalipervariables Variable names for caliper (optional)
#* @post /summary
function(req, res,
         groupindicator,
         controllvariables,
         mdistance,
         mmethod,
         mreplace = "",
         mcaliper = "",
         mratio,
         mcalipervariables = "") {
  
  body <- req$body
  
  # 1. Matching durchführen
  a <- perform_matching(
    req,
    groupindicator,
    controllvariables,
    mdistance,
    mmethod,
    mreplace,
    mcaliper,
    mratio,
    mcalipervariables
  )
  
  # 2. Matched Dataset erzeugen
  result_dataset <- match.data(a,
                               data = data.frame(body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  # 3. Case/Control Counts vor/nach Matching
  prematch_cases <- sum(body[[groupindicator]] == 1)
  prematch_controls <- sum(body[[groupindicator]] == 0)
  
  postmatch_cases <- sum(result_dataset[[groupindicator]] == 1)
  postmatch_controls <- sum(result_dataset[[groupindicator]] == 0)
  
  # 4. Balance Summary berechnen
  sum <- cobalt::bal.tab(
    a,
    disp = c("means"),
    un = TRUE,
    stats = c("m"),
    thresholds = c(m = 0.1)
  )
  
  # 5. Extract balance statistics
  row_names <- rownames(sum$Balance)[-1]
  
  unadjusted_means_treated <- sum$Balance$M.0.Un[-1]
  unadjusted_means_control <- sum$Balance$M.1.Un[-1]
  unadjusted_mean_diff <- sum$Balance$Diff.Un[-1]
  
  adjusted_means_treated <- sum$Balance$M.0.Adj[-1]
  adjusted_means_control <- sum$Balance$M.1.Adj[-1]
  adjusted_mean_diff <- sum$Balance$Diff.Adj[-1]
  
  # Balance status und thresholds nach Matching extrahieren
  balance_info <- strsplit(sum$Balance$M.Threshold[-1], ", ", fixed = TRUE)
  balance_covariats_post_matching <- sapply(balance_info, `[`, 1)
  balance_thresholds_post_matching <- sapply(balance_info, `[`, 2)
  
  # 6. Zusammenbauen des Outputs
  df <- data.frame(
    row_names,
    unadjusted_means_treated,
    unadjusted_means_control,
    unadjusted_mean_diff,
    adjusted_means_treated,
    adjusted_means_control,
    adjusted_mean_diff,
    balance_covariats_post_matching,
    balance_thresholds_post_matching,
    prematch_cases,
    prematch_controls,
    postmatch_cases,
    postmatch_controls
  )
  
  # 7. Rückgabe
  res$body <- jsonlite::toJSON(df, rownames = FALSE)
  res
}




#* @get /numeric_columns
function(req,res) {
  
  # body wird ausgelesen
  body = req$body 
  
  # numerische spalten identifizieren
  li = list()
  for (i in 1:length(body)) {
    
    number_single_values <- length(unique(body[[i]]))
    
    if (is.numeric(body[[i]]) && 20 < number_single_values) {
      li <- append(li,names(body)[i])
    }
  }
  
  # Umwandlung in JSON und Rueckgabe
  res$body <- toJSON(unlist(li))
  res
  
}

#* @get /boolean_columns
function(req,res) {
  
  # body wird ausgelesen
  body = req$body 
  
  # boolsche spalten identifizieren
  li = list()
  for (i in 1:length(body)) {
    
    number_single_values <- length(unique(body[[i]]))
    
    if (20 >= number_single_values) {
      li <- append(li,names(body)[i])
    }
  }
  
  # Umwandlung in JSON und Rueckgabe
  res$body <- toJSON(unlist(li))
  res
  
}


#* @get /test
function(req,res) {
  
  # body wird ausgelesen
  body = req$body 
  
  
  # Umwandlung in JSON und Rueckgabe
  res$body <- toJSON(2)
  res
  
}
