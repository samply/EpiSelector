import * as React from 'react';
import '../App.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    backgroundColor:'#E9F0FF',
    _minHeight: '100%',
    marginBottom:'4px',
    borderRadius: '3px 3px 3px 3px',
   "&.Mui-expanded":{
        overflow:'auto',
   }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
paddingBottom:'10px',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',

    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),

    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    fontsize:'small',
    backgroundColor:'white',
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',


}));



function InfoBox({isWorkflow}) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const content1 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Der <strong>Beobachtungsstudienassistent "EpiSelector" </strong> unterstützt Forschende unabhängig von ihrer
                Erfahrung und Expertise bei der Auswahl und Bildung von geeigneten Vergleichsgruppen. Die
                Vergleichsgruppen bestehen dabei in der Regel aus Gruppen von einzelnen Patienten. Der besondere
                Schwerpunkt des EpiSelectors liegt in der Unterstützung bei der Anwendung von Verfahren zur Zuordnung
                ähnlicher Beobachtungen, dem sog. Matching).
                Auch in großen Datenbeständen können so valide Vergleichsgruppen reproduzierbar und zeitsparend
                selektiert und gematcht werden.
                Auch wenn der EpiSelector mit größter Sorgfalt erstellt wurde, übernehmen wir keine Gewähr.
                <br/><br/>
               <strong>Warum Matching?</strong> <br/>
                <strong>Matching-Methoden</strong>  werden üblicherweise in <strong>zwei Arten von Settings</strong> eingesetzt:<br/>
                1. Die Outcome-Daten sind noch nicht verfügbar und das Matching wird zur Auswahl der Personen für die
                Nachuntersuchung verwendet.
                Dies ist besonders wichtig für Studien, bei denen aus Kostengründen keine Outcome-Daten für die gesamte
                Vergleichsgruppe erhoben werden können.<br/>
                2. Es liegen bereits alle Outcome-Daten vor, und das Ziel des Matchings besteht darin, Verzerrungen, die
                aus Unterschieden, z.B. im Alter. zwischen den Vergleichsgruppen resultieren könnten, bei der Schätzung
                des Behandlungseffekts zu verringern. (Stuart 2010 <a>https://doi.org/10.1214%2F09-STS313</a> )

            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Es ist möglich, Daten, die lokal auf Ihrem Rechner abgespeichert sind, oder Daten, die im DRE (Digital Reearch Environment) abrufbar sind, hochzuladen und mit dem EpiSelector zu bearbeiten. </div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>In diesem Schritt wird die csv-Datei hochgeladen, mit deren Daten Vergleichsgruppen gebildet werden sollen, also ein Matching durchgeführt werden soll.</div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div><strong>"Exaktes matching nach ausgewählten Variablen":</strong><br/>
                Sollen die Vergleichsgruppen exakt hinsichtlich einer Messgröße, zB des Alters, übereinstimmen, und Paare mit jeweils einem Patienten aus beiden Vergleichsgruppen gebildet werden, wird ein exaktes Matching nach Alter mit einem Matching-Verhältnis von 1:1 durchgeführt. Bei diesem Matching wird dann beispielsweise eine 75-jährigen Person aus der einen Vergleichsgruppe mit einer 75-jährigen Person aus der anderen Gruppe gematcht, also Paare mit jeweils zwei Personen gebildet, die exakt gleich alt sind.
                Die Angabe eines Toleranzbereiches, z.B. +- 3 Jahre, ermöglicht ein Matching von einer 75-jährigen Person mit einer Person im Alter von 72 bis 78 Jahren. In der Regel dient ein Toleranzbereich dazu, die Bildung von Paaren mit ausreichender Ähnlichkeit zu ermöglichen, wenn ein exaktes Matching zu wenige Paare ergibt. Dies könnte schon dadurch erforderlich werden, dass das Alter nicht in Jahren, sondern auch auf Monat und Tag genau bekannt ist, weil beim exakten Matching nach Alter in diesem Fall nur Paare mit Patienten, die auf den Tag genau gleichem alt sind, gebildet werden.
                Exaktes Matching kann auch hinsichtlich mehrerer Messgrößen durchgeführt werden, häufig wird neben dem Alter auch nach Geschlecht gematcht.
                <br/><br/>
                <strong>"Propensity Score Matching"</strong><br/>
                Alle Kovariaten, die als Confounder zwischen Behandlungs- und Vergleichsgruppe auszugleichen sind, werden zu einem einzigen Propensity Score pro Proband zusammengefasst und zum Matching verwendet.
                Der Propensity Score ermöglicht es, eine (nicht-randomisierte) Beobachtungsstudie so zu konzipieren und zu analysieren, dass sie einige der spezifischen Merkmale einer randomisierten kontrollierten Studie nachahmt (Austin 2011 DOI: 10.1080/00273171.2011.568786).
                Der Propensity Score hat den Vorteil, dass die Dimensionen in dem Sinne reduziert werden, dass mehrere Kovariaten durch einen einzigen Score ersetzt werden, um einen Probanden zu beschreiben (Zhao 2021  http://dx.doi.org/10.21037/at ).
            </div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Anhand der Matching-Variablen sollen Unterschiede in den Vergleichsgruppen so gut wie möglich ausgeglichen werden, um mögliche Verzerrungen in den Analysen zu reduzieren. Typische Matching-Variablen können beispielsweise Alter, Geschlecht und der allgemeine Gesundheitszustand, bzw. Vorerkrankungen sein.</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Die Matchingtoleranz erlaubt es, dass z.B. das Matching nach Alter auch dann durchgeführt werden kann, wenn keine bzw. nicht immer exakte Übereinstimmungen hinsichtlich des Altersvorliegen. Z.B. kann bei Angabe einer Matchingtoleranz von +- 5 Jahren eine 70jährige Person mit einer 75jährigen Person gematcht werden.  </div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>Zum Durchführen des Matchings müssen die Gruppen, aus denen Personen gematcht werden sollen, definiert werden. Die Variable, anhand derer die beiden Gruppen definiert werden, muss binär sein und wird hier "Gruppenindikator" genannt.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Um den Propensity Score zu berechnen, muss die Zielvariable des Propensity Scores, die binär ist und zwischen Behandelten und Nichtbehandelten differenziert, definiert werden.
                Klassischerweise enthält die Zielvariable die Informationen zur Behandlungszuweisung z.B. ob jemand eine bestimmte Therapie erhält oder nicht.
            </div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Es ist wichtig, alle Variablen in das Matchingverfahren einzubeziehen, von denen bekannt ist, dass sie sowohl mit der Behandlungszuweisung als auch mit dem Zielgröße der Studie (Outcome) zusammenhängen. Hintergrund dafür ist, die Annahme des Prinzips der ignorierbaren Behandlungszuweisung zu erfüllen.
                Der Entscheidung, welche Kovariaten in den Matching-Prozess einbezogen werden sollen, liegt das Prinzip der strikten Ignoranz zu Grunde. Das bedeutet, dass Matching-Methoden und die meisten nicht-experimentellen Studienmethoden auf Ignoranz beruhen, d. h. auf der <strong>Annahme, dass es keine unbeobachteten Unterschiede zwischen den Vergleichsgruppen gibt</strong>, in Abhängigkeit von den beobachteten Kovariaten.
                (Rubin et al. 1996 <a>https://doi.org/10.2307/2533160</a> ; Stuart et al. 2010 <a>https://doi.org/10.1214%2F09-STS313</a>).
            </div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>Es gibt verschiedene Möglichkeiten der Propensity Score-Berechnung. Aktuell wird im EpiSelector die gängigste Methode, nämlich die Berechnung mittels logistischer Regression, angeboten.
                Geplant ist zu einem späteren Zeitpunkt aber auch die Berechnung des Propensity Scores mit Machine Learning Methoden (Caliendo et al. 2008 <a>https://doi.org/10.1111/j.1467-6419.2007.00527.x</a>); (Inacio 2015 <a>https://doi.org/10.1007/s11999-015-4239-4</a>).
            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div>Propensity-Score-Matching-Schätzer unterscheiden sich nicht nur in der Art und Weise, anhand welches Matching-Algorithmus die behandelten Individuen mit den Nicht-Behandelten gematched werden, sondern auch in Bezug auf die Angabe eines <strong>Calipers</strong>, des <strong>Matching-Ratios</strong> und der <strong>möglichen Mehrfachverwendung</strong> einer Kontrolle (Calinendo et al. 2008 <a>https://doi.org/10.1111/j.1467-6419.2007.00527.x</a> ).</div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>In diesem Schritt geht es darum festzulegen, wie ähnlich die Propensity Scores einer behandelten Person und einer nicht behandelten Person sein sollen, damit diese gematcht werden.
                Z.B. werden bei einem Caliper von 0 die Behandelten mit Nichtbehandelten gematcht, deren Propensity Scores exakt übereinstimmen. Je kleiner der Caliper gewählt wird, desto weniger passende Paare können gefunden werden. Dies kann insbesondere bei einer geringen Gruppengröße dazu führen, dass für eine Studie nicht ausreichend Paare gebildet werden können.
            </div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>Hier geht es darum, das Verhältnis zwischen Behandelten und Nichtbehandelten festzulegen, d.h. ob z.B. eine behandelte Personmit jeweils einer nicht behandelten Person oder mit mehreren Unbehandelten gematcht werden sollen.</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>Am Ende des Matching-Prozesses wird der für das Matching verwendete Datensatz im Hinblick auf einen <strong>Prä-Post-Matching-Vergleich</strong> beschrieben, d. h. im Hinblick auf die Anzahl der Variablen und Beobachtungen sowie die Anzahl der Behandelten und Nichtbehandelten.
                Zum einen wird <strong>tabellarisch</strong> dargestellt, wie und ob das Matching die Mittelwerte bzw. die <strong>standardisierte Mittelwertsdifferenz </strong>(bei kontinuierlichen Variablen) und <strong>die Anteile bzw. die rohe Anteilsdifferenz</strong> (bei kategorialen Variablen) zwischen  den Vergleichsgruppenhinsichtlich der zu balancierenden Variablen angeglichen hat.
                Zum anderen wird die Ausgewogenheit der Kontrollvariablen durch grafische Darstellungen verdeutlicht. Für die kontinuierlichen Variablen werden <strong>Boxplots</strong> verwendet und für die kategorialen Variablen <strong> gespiegelte Histogramme</strong>, um die Balancierung durch das Matching visuell darzustellen.
            </div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Hier haben Sie die Möglichkeit, die gematchten Daten für Ihre weiteren Analysen zu speichern, das Matching-Protokoll für Ihre Publikationen herunterzuladen und die Eingabemaske für weitere Matching-Prozesse zu speichern.</div>);
        }

    }

    const content2 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Matching ist eine Technik, bei der Patienten mit und ohne ein interessierendes Outcome (in Fall-Kontroll-Studien) oder Patienten mit und ohne interessierende Exposition (in Kohortenstudien) so ausgewählt werden, dass sie die gleiche oder ähnliche Verteilungen bestimmter Merkmale aufweisen.
                Diese Technik wird eingesetzt, um die statistische Effizienz und die Kosteneffizienz von Studien zu erhöhen (Iwagami et al. 2022 <a>https://doi.org/10.37737/ace.22005</a> ; Stuart et al.2010 <a>https://doi.org/10.1214%2F09-STS313</a> ).
            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div></div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div></div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div><strong>"Exaktes Matching nach ausgewählten Variablen" </strong> ist eine Methode, bei der Personen der Behandlungsgruppe und Personen der Vergleichsgruppe unter Verwendung der exakt gleichen Werte von im Vorhinein festgelegten Kovariaten einander zugeordnet ("gematched") werden (Zhao 2021  <a>http://dx.doi.org/10.21037/at</a> ).
<br/><br/>
                Der <strong>"Propensity Score" </strong> ist die Wahrscheinlichkeit der Behandlung in Abhängigkeit von den beobachteten Ausgangsmerkmalen.
                Der Propensity Score ist ein ausgleichender Score. Bedingt durch das Matching basierend auf dem Propensity Score wird die Verteilung der beobachteten Ausgangskovariaten, die in die Berechnung des Propensity Score einfließen, zwischen den beiden Vergleichgruppen ähnlich sein (Austin 2011 DOI: 10.1080/00273171.2011.568786).
            </div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div><strong>Matching-Variablen</strong> sind die Merkmale oder Variablen, die bei einem Matching-Prozess verwendet werden, um ähnliche Paare bzw. Vergleichgruppen zu bilden.</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Die <strong>Matchingtoleranz</strong> bestimmt, was als genaue Übereinstimmung gilt (<a>https://cran.r-project.org/web/packages/MatchIt/MatchIt.pdf</a> ).</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>Der <strong>Gruppenindikator</strong> ist die Variable, die bestimmt, ob eine Person der Behandlungs- oder der Vergleichsgruppe angehört.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Die <strong>Zielvariable des Propensity Scores</strong> ist die abhängige binäre - Variable, die in dem Modell zur Berechnung des Propensity Scores verwendet wird und angibt, ob eine Person der Behandlungs- oder der Vergleichsgruppe zuzuordnen ist.
                Die Zielvariable dient der Schätzung derWahrscheinlichkeit für alle Patienten, die Behandlung zu erhalten (also des individuellen Propensity Scores).
            </div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Kontrollvariablen sind Variablen, die im Rahmen der Studie erhoben wurden, aber nicht das Ergebnis oder die Exposition von Interesse darstellen (Inacio 2015 <a>https://doi.org/10.1007/s11999-015-4239-4</a> )   (Caliendo et al. 2008 <a>https://doi.org/10.1111/j.1467-6419.2007.00527.x</a> ).</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>Der <strong>Propensity Score </strong> wird durch Anpassung eines logistischen Regressionsmodells mit der Behandlung als abhängige Variable berechnet.
                Das <strong>logistisches Regressionsmodell </strong> misst die Veränderung der Wahrscheinlichkeit einer bestimmten abhängigen Variable bei einer Reihe unabhängiger Variablen und ist die allgemein am gebräuchlichste Methode, um den Propenisty Score zu berechnen (Inacio et al. 2015 <a>https://doi.org/10.1007/s11999-015-4239-4</a> ) (Rubin et al. 1996 <a>https://doi.org/10.2307/2533160</a> ) (Austin 2011 <a>https://doi.org/10.1080/00273171.2011.568786</a> ).
            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div><strong>Nearest Neighbour Matching (NNM):</strong> In seiner einfachsten Form wählt das 1 : 1 Nearest Neighbor Matching für jedes behandelte Individuum i in einer bestimmten Reihenfolge ein nicht behandeltes individuummit dem geringsten Abstand zum Individuum i. (Stuart et al 2010  10.1214/09-STS313 ; Rubin 1973 https://doi.org/10.2307/2529684; )
                <strong>Das Optimal Matching (OM)</strong> findet die engste Paarung von Individuen unter Berücksichtigung bestimmter Anforderungen oder Beschränkungen für das Gleichgewicht der Kovariaten (Rosenbaum 2020 <a>https://dx.doi.org/10.1146/annurev-statistics-031219-041058</a> ).
                Das Optimal Matching vermeidet das Problem, dass die Reihenfolge, in der die behandelten Subjekte gematcht werden, die Qualität der Matches verändert, indem es bei der Auswahl der einzelnen Matches die Gesamtheit der Matches berücksichtigt und das globales Abstandsmaß minimiert (Rubin et al 1996 <a>https://doi.org/10.2307/2533160</a> ) (Stuart et al 2010 <a>https://doi.org/10.1214%2F09-STS313</a> )
            </div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>Wenn sich die Verteilung der Propensity Scores zwischen der Behandlungs- und der Vergleichsgruppe stark unterscheidet, kann der Abstand zwischen den Propensity Scores eines gematchten Paares sehr groß sein. In diesem Fall ist es ratsam, beim Matching ein Caliper hinzuzufügen. Auf diese Weise können für jeden Fall nur Kontrollen mit einem PS innerhalb eines begrenzten Bereichs gematcht werden. Wenn keine passende nicht behandelte Person gefunden werden kann, sollte diesebehandelte Person verworfen werden (Zhao 2021 <a>http://dx.doi.org/10.21037/atm-20-3998</a> ). </div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>Das <strong>Matchingverhältnis</strong> gibt an, mit wie vielen Nichtbehandelten eine behandelte Person gematcht wird.</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div></div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div></div>);
        }

    }

    const content3 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Bevor Sie den EpiSelector mit dem Klicken auf "Start"-Button starten, lesen und bestätigen Sie bitte den Hinweis.
<br/><br/>
                Bitte beachten Sie folgendes:
                -	Ihre Daten müssen im csv-Format vorliegen. Die Variablen müssen sich in den Spalten, die Beobachtungen in den Zeilen befinden.
                -	Der EpiSelector unterstützt den vollständigen Matching-Prozess, nicht jedoch die vorangehende Datenanalyse zur Identifikation der Kontrollvariablen, deren Ausgeglichenheit zwischen Behandelten und Nichtbehandelten Ziel des Matchings ist.
                -	Wenn Sie bereits Eingabe-Masken aus vorherigen Matching-Sitzungen gespeichert habe, haben Sie die Möglichkeit, eine Ihrer Masken mit Ihren spezifischen Matching-Angaben aufzurufen und für den Matching-Prozess dieser Sitzung anzuwenden. Wählen Sie dazu Ihre Maske aus und klicken Sie dann auf "Start".
            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Wählen Sie eine Datenquelle aus, aus der Sie Ihre Beobachtungen hochladen möchten.
                Sie können Ihre Daten lokal von Ihrem Gerät hochladen oder aus dem DRE (Digital Research Environment).
<br/>
                Für das Hochladen aus dem der (Digital Research Environment) müssen Sie bereits im DRE registriert sein.
<br/>
                Bitte beachten Sie, dass Ihre Daten im csv-Format vorliegen müssen. Die Variablen müssen sich in den Spalten, die Beobachtungen in den Zeilen befinden.
            </div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>Laden Sie hier Ihre csv-Datei hoch. <br/>

                Sie haben hierzu zwei Möglichkeiten: <br/>
                -	Sie ziehen Ihre csv-Datei aus dem Explorer in die vorgegebene eingerahmte Fläche
               <br/> ODER<br/>
                -	Sie klicken auf diese vergebene eingerahmte Fläche, damit sich der Explorer automatisch öffnet. Wählen Sie nun Ihre csv-Datei aus, die Sie für den Matching-Prozess verwenden möchten.
            </div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div>"Exaktes Matching nach ausgewählten Variablen": Diese Methode ist anwendbar, wenn nur wenige Kovariaten die Behandlungszuweisung beeinflussen können.
                Wenn die Anzahl der Kovariablen zunimmt, steigt die Anzahl der möglichen Übereinstimmungen exponentiell an, auch wenn alle Kovariablen binär sind, was zu einem schlechten Übereinstimmungsergebnis führt (Zhao 2021  http://dx.doi.org/10.21037/at).
                In diesem Fall ist dann das "Propensity Score Matching" geeigneter.
            </div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Die Auswahl der Matching-Variablen sollte auf theoretischen Überlegungen und Fachkenntnissen basieren, um sicherzustellen, dass wichtige Einflussfaktoren berücksichtigt werden. Die Matching-Variablen sollten als wichtige Einflussfaktoren auf die Behandlungszuweisung betrachtet werden.
<br/>
                Sie können mehrere Variablen auswählen, nach denen die Behandelten und die Nichtbehandelten gematcht werden sollen.
                Bitte beachten Sie, dass bei diesem Matching-Verfahren der Ausgleich zwischen den Vergleichsgruppen umso schwieriger wird, je mehr Variablen Sie auswählen und je mehr Ausprägungen die Matching-Variablen haben.
                Metrische Variablen (z.B. Alter, bestimmte medizinische Parameter) sind daher für dieses Matching-Verfahren nur dann geeignet, wenn eine entsprechende Matching-Toleranz angegeben wird.
            </div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Die Angabe einer Matchingtoleranz ist besonders dann sinnvoll, wenn durch eine exakte Übereinstimmung der Störgröße (z.B. Alter) zu wenige Matching-Paare gefunden werden können.</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>Es kann hier nur eine einzige Variable als Gruppenindikator ausgewählt werden, da der Gruppenindikator die Variable zur Definition der Zugehörigkeit zur Behandlungsgruppe oder zur Vergleichsgruppe ist.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Wählen Sie hier die Variable aus, die die Information enthält, ob ein:e Patient:in eine Behandlung erhalten hat oder nicht. Diese Variable ist im Propensity Score-Berechnungsmodell die abhängige Variable. Sie können nur eine einzige und binäre Variable auswählen.</div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Wählen Sie hier die Variablen aus, die in die Berechnung des Propensity Scores einfließen sollen und nach den die Behandlungs- und Vergleichsgruppe durch das Matching ausgeglichen werden sollen. Mehrfachnennungen, d.h. die Auswahl mehrerer Variablen, sind möglich.</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>Aktuell steht Ihnen ausschließlich die logistische Regression zur Berechnung des Propensity Scores zur Verfügung.
                Machine Learning Methoden werden Ihnen in einer zukünftigen Version angeboten.
            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div>Beim Matching mit Ersetzung besteht ein Kompromiss zwischen Verzerrung und Varianz. Wenn wir die Ersetzung zulassen, steigt die durchschnittliche Qualität des Abgleichs und die Verzerrung nimmt ab.
                Dies ist von besonderem Interesse bei Daten, bei denen die Propensity-Score-Verteilung in der in der Behandlungs- und in der Vergleichsgruppe sehr unterschiedlich ist (Caliendo 2008 https://doi.org/10.1111/j.1467-6419.2007.00527.x )(Iwagami et al. 2022  https://doi.org/10.37737/ace.22005 ).
            </div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>Beim Nearest-Neighbour-Matching besteht die Gefahr eines schlechten Matches, wenn der nächste
                Nachbar weit entfernt ist. Dies kann vermieden werden, indem eine Toleranzschwelle für den maximalen
                Propensity-Score-Abstand (Caliper) festgelegt wird. Schlechte Matches werden vermieden und die Qualität
                des Matchings erhöht (Caliendo 2008 https://doi.org/10.1111/j.1467-6419.2007.00527.x ). <br/>
                Obwohl es keinen Goldstandard für maximal akzeptable Unterschiede gibt, wurde in einer Simulationsstudie
                von Austin eine Caliper-Breite von 0,2 vorgeschlagen (Austin 2011 https://doi.org/10.1002/pst.433 ).
                Wir schlagen vor, dass <br/>
                1. wenn die Matchingleistung schlecht ist (z. B. wenn einige Kovariaten nicht ausgeglichen sind), das
                Matching mit einer engeren Caliper-Breite durchgeführt werden kann, und
                <br/> 2. wenn das Matching erfolgreich, aber die Anzahl der gematchten Paare gering ist,
                die Caliper-Breite erweitert werden kann (Zhao et al. 2021 https://doi.org/10.21037/atm-20-3998).
            </div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>Bitte geben Sie hier das Verhältnis zwischen Behandelten und Nichtbehandelten an, in dem das Matching durchgeführt werden soll.
                Es kann vorkommen, dass einer behandelten Personnicht die vorgegebene Anzahl an Nichtbehandelten zugeordnet werden kann.
                Beispiel: in einer Fall-Kontroll-Studie mit einem Matchingfaktor von 1:4 können einige Fälle weniger als die geplanten vier Kontrollen finden. Es ist jedoch nicht notwendig, diese Paare auszuschließen, wenn die Matching-Faktoren oder die gematchten Datensätze von Fällen und Kontrollen in der Analyse geschichtet werden. Das Mischen von Paaren mit unterschiedlichen Matching-Faktoren führt nicht zu einer verzerrten Schätzung, solange eine angemessene Anpassung der Matching-Faktoren vorgenommen wird (Iwagami et al. 2022  https://doi.org/10.37737/ace.22005).
            </div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>Hier erhalten Sie tabellarisch und graphisch ihr Matching-Ergebnis und können die Balancierung der von Ihnen ausgewählten Kovariaten überprüfen.</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Hier erhalten Sie die Möglichkeit, folgende Daten lokal zu speichern: <br/>
                1. Ihr Matchingprotokoll:<br/>
                das Matching-Protokoll beinhaltet die Datensatzbeschreibungen Ihres originalen und Ihres gematchten
                Datensatzes. Zusätzlich sind sämtliche Angaben, die Sie im Laufe des Matching-Prozesses getroffen haben,
                sowie Angaben zur Balancierung von Behandlungs- und Vergleichsgruppe inklusive der Graphiken der
                Matching-Ergebnisse enthalten.
                <br/> 2. Ihren gematchten Datensatz: Ihr gematchter Datensatz enthält nur noch die gematchten Paare.
                Personen
                der Behandlungsgruppe, für die keine passende nichtbehandelte Person gefunden werden konnten, oder
                Nichtbehandelte, die nicht zum Matching benötigt wurden, sind nicht mehr im gematchten Datensatz
                enthalten.
                <br/> 3. Ihre Eingabemaske: optional können Sie Ihre getroffenen Angaben im Matching-Prozess für weitere
                Matching-Vorgänge als Maske speichern.
            </div>);
        }

    }
    return (
        <Box className="InfoBox"  >
           <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Worum geht es hier</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content1()}
                        </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography fontSize={"medium"}>Fachbegriffe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content2()}
                    </Typography>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Tipps zur Eingabe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content3()}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}

export default InfoBox;
