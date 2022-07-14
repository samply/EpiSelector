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
}




