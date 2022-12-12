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
    borderRadius: '10px 10px 10px 10px',
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



function InfoBox() {
    const [expanded, setExpanded] = React.useState('panel2');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box className="InfoBox"  >
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Worum geht es hier</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={"medium"}>
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
                        <br/><br/>

                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography fontSize={"medium"}>Fachbegriffe</Typography>
                </AccordionSummary>
                <AccordionDetails>

                       <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Exposition: </Typography>
                        <Typography>Faktor, dem eine Gruppe von Menschen ausgesetzt ist.</Typography>
<br/>
                    <Typography style={{ fontWeight: "bold", fontSize:"medium" }}>Fall:</Typography>
                   <Typography>Person, bei der das Risikoereignis eintrat</Typography>
                        <br/>
                    <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Kohortenstudie: </Typography>
                    <Typography>Ziel, einen Zusammenhang zwischen einer oder mehreren Expositionen und dem Auftreten einer Krankheit aufzudecken. Dabei wird eine Gruppe exponierter und eine Gruppe nicht exponierter Personen über einen bestimmten Zeitraum hinsichtlich des Auftretens oder der Sterblichkeit bestimmter Krankheiten beobachtet.</Typography>
                    <br/>
                       <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Kontrolle:</Typography>
                    <Typography>Person, bei der das Risikoereignis nicht eintrat</Typography>
                        <br/>
                       <Typography style={{ fontWeight: "bold", fontSize:"medium" }}> Nested case-control study:</Typography>
                    <Typography>Fälle einer Krankheit, die in einer definierten Kohorte innerhalb einer schon gelaufenen oder noch laufenden Kohortenstudie auftreten, werden identifiziert. Für jeden Fall wird eine bestimmte Anzahl von angepassten Kontrollen aus der Kohorte ausgewählt, die die Krankheit zum Zeitpunkt des Auftretens der Krankheit im Fall nicht entwickelt haben.</Typography>
                    <br/>
                    <Typography style={{ fontWeight: "bold", fontSize:"medium" }}>Score matching:</Typography>
                    <Typography>Matching-Verfahren für Kontrollgruppenselektion um den Selektionsbias zu reduzieren. Bisherige, verzerrte Gruppenzuteilung wird aufgelöst indem für jedes Sample ein Propensity Score (= Wahrscheinlichkeit in der Versuchsgruppe zu landen auf Basis von zuvor erhobenen Hintergrunddaten, meist als Ergebnis einer logistischen Regression) berechnet wird und auf Basis dieser Werte ähnliche Samples zu einer Kontroll-Versuchspaargruppe zusammengefasst werden, die keine Verzerrung mehr enthalten.
                    </Typography>
                    <br/>


                        <br/>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Tipps zur Eingabe</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography fontSize={"medium"}>
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
                        <br/><br/>

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}

export default InfoBox;
