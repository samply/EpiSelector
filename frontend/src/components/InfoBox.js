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
    const [expanded, setExpanded] = React.useState('panel2');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

   /* const pageWorumgehteshier = () =>{
        if(isWorkflow === "startseite"){
            return (

            )
        }else{
            return(<Typography fontSize={"medium"}>
                test andere seite
            </Typography>)
        }
    }*/

    const content1 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Startseite Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Datenquelle Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>Datei-hochladen Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div>Matching-Methode Text WorumGehtEsHier</div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Matchingvariablen Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Matchingtoleranz Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>VariableFälleKontrolle Text WorumGehtEsHier</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Zielvariable Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Kontrollvariablen Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>ScoreBerechnung Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div>Matching-Algorithmus Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>Übereinstimmung Text WorumGehtEsHier</div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>MatchingVerhältnis Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>MatchingErgebnis Text WorumGehtEsHier</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Datenexport Text WorumGehtEsHier</div>);
        }

    }

    const content2 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Startseite Text <br/> <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Exposition: </Typography>
                <Typography>Faktor, dem eine Gruppe von Menschen ausgesetzt ist.</Typography>
                <br/>
                <Typography style={{ fontWeight: "bold", fontSize:"medium" }}>Fall:</Typography>
                <Typography>Person, bei der das Risikoereignis eintrat</Typography>
                <br/>
                <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Kohortenstudie: </Typography>
                <Typography>Ziel, einen Zusammenhang zwischen einer oder mehreren Expositionen und dem Auftreten einer Krankheit aufzudecken.
                    Dabei wird eine Gruppe exponierter und eine Gruppe nicht exponierter Personen über einen bestimmten
                    Zeitraum hinsichtlich des Auftretens oder der Sterblichkeit bestimmter Krankheiten beobachtet.</Typography>
                <br/>
                <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Kontrolle:</Typography>
                <Typography>Person, bei der das Risikoereignis nicht eintrat</Typography>
                <br/>
                <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Nested case-control study:</Typography>
                <Typography>Fälle einer Krankheit, die in einer definierten Kohorte innerhalb
                    einer schon gelaufenen oder noch laufenden Kohortenstudie auftreten, werden identifiziert.
                    Für jeden Fall wird eine bestimmte Anzahl von angepassten Kontrollen aus der Kohorte ausgewählt,
                    die die Krankheit zum Zeitpunkt des Auftretens der Krankheit im Fall nicht entwickelt haben.</Typography>
                <br/>
                <Typography style={{ fontWeight: "bold", fontSize:"medium" }}>Score matching:</Typography>
                <Typography>Matching-Verfahren für Kontrollgruppenselektion um den Selektionsbias zu reduzieren.
                    Bisherige, verzerrte Gruppenzuteilung wird aufgelöst indem für jedes Sample ein Propensity Score
                    (= Wahrscheinlichkeit in der Versuchsgruppe zu landen auf Basis von zuvor erhobenen Hintergrunddaten,
                    meist als Ergebnis einer logistischen Regression) berechnet wird und auf Basis dieser Werte ähnliche
                    Samples zu einer Kontroll-Versuchspaargruppe zusammengefasst werden, die keine Verzerrung mehr enthalten.
                </Typography>
                <br/>
            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Datenquelle Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>Datei-hochladen Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div>Matching-Methode Text Fachbebriffe</div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Matchingvariablen Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Matchingtoleranz Text Fachbebriffe</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>VariableFälleKontrolle Text Fachbebriffe</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Zielvariable Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Kontrollvariablen Text Fachbebriffe</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>ScoreBerechnung Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div>Matching-Algorithmus Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>Übereinstimmung Text Fachbebriffe</div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>MatchingVerhältnis Text Fachbebriffe</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>MatchingErgebnis Text Fachbebriffe</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Datenexport Text Fachbebriffe</div>);
        }

    }

    const content3 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Startseite Text <br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                <br/><br/></div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Datenquelle Text Tipps</div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>Datei-hochladen Text Tipps</div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div>Matching-Methode Text Tipps</div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Matchingvariablen Text Tipps</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>Matchingtoleranz Text Tipps</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>VariableFälleKontrolle Text Tipps</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Zielvariable Text Tipps</div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Kontrollvariablen Text Tipps</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>ScoreBerechnung Text Tipps</div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div>Matching-Algorithmus Text Tipps</div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>Übereinstimmung Text Tipps</div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>MatchingVerhältnis Text Tipps</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>MatchingErgebnis Text Tipps</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Datenexport Text Tipps</div>);
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
                    { content1()}
                </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography fontSize={"medium"}>Fachbegriffe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        { content2()}
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
