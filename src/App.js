import './App.css';
import TopNav from "./components/TopNav";
import NavB from './components/NavB'
import Mainpage from './pages/Mainpage';
import Betapage from './pages/Betapage';
import UploadData from './components/form/dataimport/UploadData';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import InfoBox from "./components/InfoBox";
import InputProtokoll from "./components/InputProtokoll";
import MatchingVerhältnis from "./components/form/MatchingVerhältnis";
import MatchingMethode from "./components/form/MatchingMethode";
import Matchingtoleranz from "./components/form/Matchingtoleranz";
import Zielvariable from "./components/form/Zielvariable";
import Kontrollvariablen from "./components/form/Kontrollvariablen";
import MatchingAlgorithmus from "./components/form/MatchingAlgorithmus";
import MatchingVariablen from "./components/form/MatchingVariablen";
import PropensityScoreBereich from "./components/form/PropsenityScoreBereich";
import Datenquelle from "./components/form/dataimport/Datenquelle";
import MethodeScoreBerechnung from "./components/form/MethodeScoreBerechnung";
import Dataexport from "./components/form/Dataexport";
import VariableFaelleKontrolle from "./components/form/VariableFaelleKontrolle";
import MatchingErgebnis from "./components/form/MatchingErgebnis";
import DynamicResult from "./components/DynamicResults";
import Foot from "./components/Foot";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';




function App() {

    return (
        //Gesamte Ansicht
        <div className="App">
            <Router>
                {/*Kopfzeile*/}
                <TopNav/>
                {/*alles unter der Kopfzeile*/}
                <div className="Main">
                    {/*Navigations-Container*/}
                    <div className="LeftContainer">
                        <NavB/>
                    </div>
                    {/*Fragebogen und Graphische-Ergebnisse*/}
                    <div className="MiddleContainer">

                        <Box sx={{ minWidth: 275 }}>
                            <Card variant="outlined" className="FormContainer">
                                <Switch>
                        <Route path='/' exact component={Mainpage}/>
                        <Route path="/Startseite" component={Mainpage}/>
                        <Route path="/Datei-hochladen" component={UploadData}/>
                        <Route path="/Matching-Methode" component={MatchingMethode}/>
                          <Route path="/Matching-Verhältnis" component={MatchingVerhältnis}/>
                          <Route path="/Matchingtoleranz" component={Matchingtoleranz}/>
                            <Route path="/Matching-Variablen" component={MatchingVariablen}/>
                            <Route path="/Matching-Ergebnis" component={MatchingErgebnis}/>
                          <Route path="/Zielvariable" component={Zielvariable}/>
                          <Route path="/Kontrollvariablen" component={Kontrollvariablen}/>
                          <Route path="/Dataexport" component={Dataexport}/>
                          <Route path="/Datenquelle" component={Datenquelle}/>
                          <Route path="/Matching-Algorithmus" component={MatchingAlgorithmus}/>
                          <Route path="/Bereich-der-Übereinstimmung-der-Propensity-Scores" component={PropensityScoreBereich}/>
                          <Route path="/Variablen-Fälle-Kontrollen" component={VariableFaelleKontrolle}/>
                        <Route path="/Methode-der-Score-Berechnung" component={MethodeScoreBerechnung}/>
                      </Switch>
                            </Card>
                        </Box>
                        <DynamicResult/>
                    </div>
                    {/*Infobox in einem Container*/}
                    <div className="RightContainer">
                        {/*<InputProtokoll/>*/}
                        <InfoBox/>
                    </div>
                </div>
            </Router>
            {/*Fußzeile*/}
            <Foot/>
        </div>
    );
}

export default App;
