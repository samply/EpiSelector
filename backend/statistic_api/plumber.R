#
# This is a Plumber API. You can run the API by clicking
# the 'Run API' button above.
#
# Find out more about building APIs with Plumber here:
#
#    https://www.rplumber.io/
#

library(plumber)
library(MatchIt)
library(plumber)
library(rjson)
library(stringr)
library("jsonlite")
library("ggplot2")
library("cobalt")
library("lmtest") #coeftest
library("sandwich") #vcovCL


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


#* Conduct statistical matching based on a given data set
#* @param groupindicator Name der Zielvariable, die Kontrollen und Faelle unterscheidet
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param mreplace Matching mit (TRUE) oder ohne (FALSE) Zuruecklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhaeltnis k:1 von Kontrollen zu Faelle
#* @tag matching
#* @post /result_data
function(req, res, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio) {
  
  # body wird ausgelesen
  body = req$body 
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  controllvariables <- as.character(controllvariables)
  
  # create form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # initialize m.out1
  a <- NULL
  
  # if exact matching
  if (mdistance == "mahalanobis") {
    
    exact_vars<-paste(controllvariables,collapse="+")  
    exact_form<-as.formula(paste(paste("", "~ ", sep=" "),exact_vars))
    
    # matching
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE, exact = exact_form)
  }
  # if other cases of matching 
  else {
    # matching
    body$sex <- factor(body$sex)
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE)
  }
  
  # Construct a matched dataset from a matchit object -> Ausgabedatei fuer die User zur weiteren Analyse
  result_dataset <- match.data(a,
                               data = data.frame(body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  # Konvertieren des df nach Json (serialisiertes Format)
  back_to_JSON <- jsonlite::toJSON(result_dataset, rownames = FALSE)
  
  # markiert den Rueckgabewert
  res$body <- back_to_JSON
  res
}

#* @param groupindicator Name der Zielvariable, die Kontrollen und Faelle unterscheidet(X-Achse des Boxplots)
#* @param controllvariable Controlvariable (Y-Achse des Boxplots)
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param mreplace Matching mit (TRUE) oder ohne (FALSE) Zuruecklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhaeltnis k:1 von Kontrollen zu Faelle
#* @tag plotting
#* @post /boxplot
function(req,res,groupindicator, controllvariable, controllvariables, mmethod, mdistance, mreplace, mcaliper, mratio) {
  
  # body wird ausgelesen
  body = req$body 
  
  
  # Matching durchfuehren
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  controllvariables <- as.character(controllvariables)
  
  # create form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # initialize m.out1
  a <- NULL
  
  # if exact matching
  if (mdistance == "mahalanobis") {
    
    exact_vars<-paste(controllvariables,collapse="+")  
    exact_form<-as.formula(paste(paste("", "~ ", sep=" "),exact_vars))
    
    # matching
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE, exact = exact_form)
  }
  # if other cases of matching 
  else {
    # matching
    body$sex <- factor(body$sex)
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE)
  }
  
  # Construct a matched dataset from a matchit object -> Ausgabedatei fuer die User zur weiteren Analyse
  result_dataset <- match.data(a,
                               data = data.frame(body),
                               group = "all",
                               distance = "propensity score",
                               weights = "Matching weight",
                               subclass = "MatchingID",
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  
  
  # Liste fuer Pre- und Post-Matching-Boxplots
  pre_matching_boxplot <- NULL
  post_matching_boxplot <- NULL
  
  for(i in 1:2) {
    
    if (i == 2) {
      body = result_dataset
    }
    
    # Formel aus Variablen generieren 
    form<-as.formula(paste(paste(controllvariable, "~ ", sep=" "),groupindicator))
    
    # boxplot wird erstellt
    boxplot <- boxplot(form, data = body)
    
    # relevante Daten werden aus boxplot-Objekt ausgelesen
    data_points_array <- boxplot$stats
    outliers <- boxplot$out
    outliers_group <- boxplot$group
    
    # Outliers mit Gruppeninformationen erweitern und Duplikate entfernen
    outliers <- Map(list, outliers_group, outliers) 
    outliers <- unique(outliers)
    # Boxplots beginnend von 0 statt 1 zaehlen
    for (x in 1:length(outliers)) {
      outliers[[x]][[1]] <- outliers[[x]][[1]] - 1
    }
    
    #data_points_array wird in zwei boxplot arrays aufgeteilt
    data_points <- unlist(data_points_array)
    boxplot_one_array <- data_points_array[,1]
    boxplot_two_array <- data_points_array[,2]
    
    #Wertenamen der Boxplots auslesen
    names = list()
    names <- append(names,boxplot$names[1])
    names <- append(names,boxplot$names[2])
    
    if (i == 1) {
      pre_matching_boxplot <- list(outliers = outliers, boxplot_one = boxplot_one_array, boxplot_two = boxplot_two_array, plot_value_names = unlist(names))
    }
    else {
      post_matching_boxplot <- list(outliers = outliers, boxplot_one = boxplot_one_array, boxplot_two = boxplot_two_array, plot_value_names = unlist(names))
    }
    
  }
  
  
  # Umwandlung in JSON und Rueckgabe
  res$body <- toJSON(list(pre_matching = pre_matching_boxplot, post_matching = post_matching_boxplot))
  
  
  res
}


  
#* @param groupindicator Name der Zielvariable, die Kontrollen und Faelle unterscheidet
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param mreplace Matching mit (TRUE) oder ohne (FALSE) Zuruecklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhaeltnis k:1 von Kontrollen zu Faelle
#* @param controllvariable Kontrollvariablen als json-Array
#* @tag plotting
#* @post /histogram
function(req, res, controllvariable, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio) {
  
  # body wird ausgelesen
  body = req$body 
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  controllvariables <- as.character(controllvariables)
  
  # create form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # initialize m.out1
  a <- NULL
  
  # if exact matching
  if (mdistance == "mahalanobis") {
    
    exact_vars<-paste(controllvariables,collapse="+")  
    exact_form<-as.formula(paste(paste("", "~ ", sep=" "),exact_vars))
    
    # matching
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE, exact = exact_form)
  }
  # if other cases of matching 
  else {
    # matching
    body$sex <- factor(body$sex)
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE)
  }
  
  # plot erstellen
  m <- bal.plot(a, controllvariable, which = "both", mirror = TRUE,
                type = "histogram", colors = c("white", "black"))
  # Daten aus ggplot-Objekt auslesen
  p <- ggplot_build(m)
  
  # Variablennamen auf der X-Achse auslesen
  x_axis_labels = unique(m$data$var)
 
  # Umwandlung in JSON und Rueckgabe
  res$body <- toJSON(list(data = p$data[[1]]$y, x_axis_labels = x_axis_labels))
  res
}


#* @tag plotting
#* @param groupindicator Name der Zielvariable, die Kontrollen und Faelle unterscheidet
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param mreplace Matching mit (TRUE) oder ohne (FALSE) Zuruecklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhaeltnis k:1 von Kontrollen zu Faelle
#* @post /pie_chart
function(req, res, groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio) {
  
  # body wird ausgelesen
  body = req$body 
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  controllvariables <- as.character(controllvariables)
  
  # create form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # initialize m.out1
  a <- NULL
  
  print("Line 88")
  
  # if exact matching
  if (mdistance == "mahalanobis") {
    
    exact_vars<-paste(controllvariables,collapse="+")  
    exact_form<-as.formula(paste(paste("", "~ ", sep=" "),exact_vars))
    
    # matching
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE, exact = exact_form)
  }
  # if other cases of matching 
  else {
    # matching
    body$sex <- factor(body$sex)
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE)
  }
  
  # Summary erstellen
  sum <- bal.tab(a, disp = c("means"), un = TRUE, stats = c("m"), thresholds = c(m = .1))
  
  # Daten auslesen
  row_names <- attributes(sum$Balanced.mean.diffs)$row.names
  count <- sum$Balanced.mean.diffs$count
  
  df <- data.frame(row_names, count)
  res$body <- toJSON(df)
  res
}


#* @tag "statistical information"
#* @param groupindicator Name der Zielvariable, die Kontrollen und Faelle unterscheidet
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param zreplace Matching mit (TRUE) oder ohne (FALSE) Zuruecklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhaeltnis k:1 von Kontrollen zu Faelle
#* @post /summary
function(req,res,groupindicator, controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio) {
  
  # body wird ausgelesen
  body = req$body 
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  controllvariables <- as.character(controllvariables)
  
  # create form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # initialize m.out1
  a <- NULL
  
  print("Line 88")
  
  # if exact matching
  if (mdistance == "mahalanobis") {
    
    exact_vars<-paste(controllvariables,collapse="+")  
    exact_form<-as.formula(paste(paste("", "~ ", sep=" "),exact_vars))
    
    # matching
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE, exact = exact_form)
  }
  # if other cases of matching 
  else {
    # matching
    body$sex <- factor(body$sex)
    a <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper, std.caliper = FALSE)
  }
  
  # Summary erstellen
  sum <- bal.tab(a, disp = c("means"), un = TRUE, stats = c("m"), thresholds = c(m = .1))
  
  # Daten auslesen
  row_names <- attributes(sum$Balance)$row.names[-1]
  
  unadjusted_means_treated <- sum$Balance$M.0.Un[-1]
  unadjusted_means_control <- sum$Balance$M.1.Un[-1]
  unadjusted_mean_diff <- sum$Balance$Diff.Un[-1]
  
  adjusted_means_treated <- sum$Balance$M.0.Adj[-1]
  adjusted_means_control <- sum$Balance$M.1.Adj[-1]
  adjusted_mean_diff <- sum$Balance$Diff.Adj[-1]
  
  balance_covariats_post_matching <- sum$Balance$M.Threshold[-1]
  # Balance und threshold in separate arrays trennen
  df <- data.frame(balance_covariats_post_matching)
  df <- str_split_fixed(df$balance_covariats_post_matching, ", ", 2)
  balance_covariats_post_matching <- df[,1]
  balance_thresholds_post_matching <- df[,2]
  
  # Daten in JSON umwandeln und Rueckgabe
  df <- data.frame(row_names, unadjusted_means_treated, 
                   unadjusted_means_control, unadjusted_mean_diff, 
                   adjusted_means_treated, adjusted_means_control, 
                   adjusted_mean_diff, balance_covariats_post_matching,
                   balance_thresholds_post_matching)
  res$body <- toJSON(df)
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
    
    if (is.numeric(body[[i]]) && 2 < number_single_values) {
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
    
    if (2 == number_single_values) {
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