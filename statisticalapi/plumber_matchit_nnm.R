#
# This is a Plumber API. You can run the API by clicking
# the 'Run API' button above.
#
# Find out more about building APIs with Plumber here:
#
#    https://www.rplumber.io/
#

library(plumber)
library ("MatchIt")
library(rjson)
library("ggplot2")
library("cobalt")
library("lmtest") #coeftest
library("sandwich") #vcovCL

#* @apiTitle Plumber Example API
#* @apiDescription Plumber example description.

##################################################################################################

#* matching
#* @param groupindicator Name der Zielvariable, die Kontrollen und Fälle unterscheidet
#* @param controllvariables Kontrollvariablen als json-Array
#* @param mmethod Methode des Matching-Algorithmus
#* @param mdistance Berechungsmethode des Propensity Scores
#* @param mreplace Matching mit (TRUE) oder ohne (FALSE) Zurücklegen der Kontrollen
#* @param mcaliper Matching innerhalb einer spezifizierten Caliper-Weite
#* @param mratio Verhältnis k:1 von Kontrollen zu Fällen
#* @post /nnmarguments
function(req,res,groupindicator,controllvariables, mdistance, mmethod, mreplace, mcaliper, mratio) {
  # body wird hier ausgelesen
  body = req$body 
  
  # string als boolean konvertieren
  mreplace <- as.logical(mreplace)
  print(mreplace)
  
  # string als numerisch konvertieren
  mratio <- as.integer(mratio)
  print(mratio)
  
  # string als numerisch konvertieren
  mcaliper <- c(as.double(mcaliper))
  
  
  # convert JSON array to R array
  # remove [] from input
  trimed_string <- substr(controllvariables, 2, nchar(controllvariables)-1)
  # split string by commas and create array
  controllvariables <- as.array(strsplit(trimed_string, ",")[[1]])
  
  
  for (i in 1:length(controllvariables)){
    print(controllvariables[i])
  }

  # creat form out of controllvariables array
  vars<-paste(controllvariables,collapse="+")  
  form<-as.formula(paste(paste(groupindicator, "~ ", sep=" "),vars))
  
  # matching
  m.out1 <- matchit(form, data = body, method = mmethod, distance = mdistance, replace = mreplace, ratio = mratio, caliper = mcaliper)
  
  print(class(m.out1))
  print(typeof(m.out1))
      
  
  # Construct a matched dataset from a matchit object -> Ausgabedatei für die User zur weiteren Analyse
  result_dataset <- match.data(m.out1,
                               group = "all",
                               distance = "distance",
                               weights = "weights",
                               subclass = "subclass",
                               data = body,
                               include.s.weights = TRUE,
                               drop.unmatched = TRUE)
  
  
  # Spaltennamen ausgeben lassen wegen _row (entspricht der ID?, wird durch Json für jede Zeile gebildet)
  # str(result_dataset)
  # names(result_dataset)
  
  
  # dataframe nach row sortieren
  # df <-result_dataset[order(result_dataset$row),]
  
  # Konvertieren des df nach Json (serialisiertes Format)
  back_to_JSON <- jsonlite::toJSON(result_dataset, rownames = FALSE)
  
  print(back_to_JSON)
  
  # markiert den Rückgabewert
  # return(back_to_JSON)
  res$body <- back_to_JSON
  res
  
  
# #  balance diagnostics #############################################################################################################
#     # Checking balance prior to matching
#   summary(body)
#   
#   # Checking balance after matching
#   summary(m.out1, un = FALSE)
#   # un:	logical; whether to compute balance statistics for the unmatched sample. Default TRUE; set to FALSE for more concise output.
#   
#   bal.tab(m.out1, un = TRUE, stats = c("m", "v", "ks"))
#   # setting stats = c("m", "v", "ks") we requested mean differences, variance ratios, and Kolmogorov-Smirnov statistics
#   # Kolmogorov-Smirnov: p-Wert kleiner als 0,05 -> signifikante Abweichung von der Normalverteilung / Daten nicht normalverteilt sind
#   # graphische Überprüfung der Normalverteilung anhand Quantil-Quantil-plots Q-Q-plots
#   # Q-Q-Plots: Gegenüberstellung der theoretischen Quantile, welche die Daten aufweisen sollten, wenn sie perfekt normalverteilt wären, und der Quantilen der Messwerte 
#   # Wenn die Daten perfekt normalverteilt wären, würden alle Punkte auf der Line liegen
#   
#   # Love plot
#   love.plot(m.out1, binary = "std")
#   
#   # Density plot 
#   bal.plot(m.out1, var.name = "controllvariables")
#   
#   bal.plot(m.out1, var.name = "controllvariables")
  
  # Mirrored histogram
  bal.plot(m.out1, var.name = controllvariables[3], 
           type = "histogram", mirror = TRUE)
  
  # grouped boxplots
  # 
  # #eQQ plot
  # plot(m.out1, type = "qq", which.xs = c(controllvariables[3]))
  # 
  # # t test of coefficients
  # # noch anpassen
  # #fit1 <- lm(re78 ~ treat + age + educ + race + married + nodegree + 
  #  #            re74 + re75, data = result_dataset, weights = weights)
  # 
  # #coeftest(fit1, vcov. = vcovCL, cluster = ~subclass)
}




