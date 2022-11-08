import './App.css';
import TopNav from "./components/TopNav";
import NavB from './components/NavB'
import Mainpage from './pages/Mainpage';
import UploadData from './components/form/dataimport/UploadData';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import InfoBox from "./components/InfoBox";
import MatchingVerhältnis from "./components/form/MatchingVerhältnis";
import MatchingMethode from "./components/form/MatchingMethode";
import MethodeScoreBerechnung from "./components/form/MethodeScoreBerechnung";
import MatchingAlgorithmus from "./components/form/MatchingAlgorithmus";
import Zielvariable from "./components/form/Zielvariable";
import Kontrollvariablen from "./components/form/Kontrollvariablen";
import Datenquelle from "./components/form/dataimport/Datenquelle";
import ÜbereinstimmungPropensityScore from "./components/form/ÜbereinstimmungPropensityScore";
import Dataexport from "./components/form/Dataexport";
import MatchingErgebnis from "./components/form/MatchingErgebnis";
import DynamicResult from "./components/DynamicResults";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import {useState} from "react";


function App() {

    const [isDatenquelle, setDatenquelle] = useState('defaultQuelle');
    const [isDatei, setDatei] = useState('defaultDatei');
    const [isMatchingMethode, setMatchingMethode] = useState('defaultMethode');
    const [isVerhältnis, setVerhältnis] = useState('defaultVerhältnis');
    const [isScoreMethode, setScoreMethode] = useState('defaultScoreMethode');
    const [isAlgorithmus, setAlgorithmus] = useState('defaultAlgo');
    const [isÜbereinstimmungswert, setÜbereinstimmungswert] = useState('defaultÜbereinstimmungswert');
    const [isZielvariable, setZielvariable] = useState('defaultZielvariable');
    const [isKontrollvariablen, setKontrollvariablen] = useState('defaultKontrollvariablen');
    const [isErsetzung, setErsetzung] = useState('defaultErsetz');


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
                        <NavB isDatenquelle={isDatenquelle} isDatei={isDatei} isMatchingMethode={isMatchingMethode} isZielvariable={isZielvariable} isKontrollvariablen={isKontrollvariablen} isVerhältnis={isVerhältnis} isScoreMethode={isScoreMethode} isAlgorithmus={isAlgorithmus} isErsetzung={isErsetzung} isÜbereinstimmungswert={isÜbereinstimmungswert} />
                    </div>
                    {/*Fragebogen und Graphische-Ergebnisse*/}
                    <div className="MiddleContainer">

                        <Box sx={{ minWidth: 275 }}>
                            <Card variant="outlined" className="FormContainer">
                                <Routes>
                                    <Route path='/' exact element={<Mainpage/>}/>
                                    <Route path="/Startseite" element={<Mainpage/>}/>
                                    <Route path="/Datenquelle" element={<Datenquelle setDatenquelle={setDatenquelle}/>}/>
                                    <Route path="/Datei-hochladen" element={<UploadData setDatei={setDatei}/>} />
                                    <Route path="/Matching-Methode" element={<MatchingMethode setMatchingMethode={setMatchingMethode} />}/>
                                    <Route path="/Zielvariable" element={<Zielvariable setZielvariable={setZielvariable}/>}/>
                                    <Route path="/Kontrollvariablen" element={<Kontrollvariablen setKontrollvariablen={setKontrollvariablen}/>}/>
                                    <Route path="/Matching-Verhältnis" element={<MatchingVerhältnis setVerhältnis={setVerhältnis}/>}/>
                                    <Route path="/MethodeScoreBerechnung" element={<MethodeScoreBerechnung setScoreMethode={setScoreMethode}/>}/>
                                    <Route path="/MatchingAlgorithmus" element={<MatchingAlgorithmus setAlgorithmus={setAlgorithmus} setErsetzung={setErsetzung}/>}/>
                                    <Route path="/ÜbereinstimmungPropensityScore" element={<ÜbereinstimmungPropensityScore setÜbereinstimmungswert={setÜbereinstimmungswert}/>}/>
                                    <Route path="/Matching-Ergebnis" element={<MatchingErgebnis/>}/>
                                    <Route path="/Dataexport" element={<Dataexport/>}/>
                            </Routes>
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

        </div>
    );
}

export default App;

