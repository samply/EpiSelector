import './App.css';
import TopNav from "./components/TopNav";
import NavB from './components/NavB'
import Mainpage from './pages/Mainpage';
import UploadData from './components/form/dataimport/UploadData';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InfoBox from "./components/InfoBox";
import MatchingVerhältnis from "./components/form/MatchingVerhältnis";
import MatchingMethode from "./components/form/MatchingMethode";
import MethodeScoreBerechnung from "./components/form/MethodeScoreBerechnung";
import MatchingAlgorithmus from "./components/form/MatchingAlgorithmus";
import Zielvariable from "./components/form/Zielvariable";
import Kontrollvariablen from "./components/form/Kontrollvariablen";
import Matchingvariablen from "./components/form/Matchingvariablen";
import Matchingtoleranz from "./components/Matchingtoleranz";
import FälleKontrollen from "./components/form/FälleKontrollen";
import Datenquelle from "./components/form/dataimport/Datenquelle";
import ÜbereinstimmungPropensityScore from "./components/form/ÜbereinstimmungPropensityScore";
import Dataexport from "./components/form/Dataexport";
import MatchingErgebnis from "./components/form/MatchingErgebnis";
import DynamicResult from "./components/DynamicResults";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import { useState } from "react";
import Foot from "./components/Foot";




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
    const [isMatchingvariablen, setMatchingvariablen] = useState('defaultMatchingvariablen');
    const [isAllMatchingvariablen, setAllMatchingvariablen] = useState('');
    const [isMatchingtoleranz, setMatchingtoleranz] = useState('defaultMatchingtoleranz');
    const [isFälleKontrollenGrupenindikator, setFälleKontrollenGruppenindikator] = useState('defaultFälleKontrollenGruppenindikator');
    const [isFälleKontrollenFallID, setFälleKontrollenFallID] = useState('defaultFälleKontrollenFallID');
    const [isErsetzung, setErsetzung] = useState('Ohne Ersetzung');
    const [isDateiSpaltenNamen, setDateiSpaltenNamen] = useState('');
    const [isVollständigeDatei, setVollständigeDatei] = useState('');
    const [isJsonPackage, setJsonPackage] = useState('defaultPackage');
    const [isAllKontrollvariablen, setAllKontrollvariablen] = useState('');
    const [isPackageB, setPackageB] = useState('');
    const [isX, setX] = useState({})



    // isX = {
    //         datei: { isVollständigeDatei },
    //         matchingMethode: { isMatchingMethode },
    //         matchingVerhältnis: { isVerhältnis },
    //         scoreMethode: { isScoreMethode },
    //         matchingAlgorithmus: { isAlgorithmus },
    //         übereinstimmungswert: { isÜbereinstimmungswert },
    //         zielvariable: { isZielvariable },
    //         kontrollvariablen: { isAllKontrollvariablen },
    //         ersetzung: { isErsetzung }
    // }



    return (
        //Gesamte Ansicht
        <div className="App">
            <Router>
                {/*Kopfzeile*/}
                <TopNav />
                {/*alles unter der Kopfzeile*/}
                <div className="Main">
                    {/*Navigations-Container*/}
                    <div className="LeftContainer">
                        <NavB isDatenquelle={isDatenquelle}
                              isDatei={isDatei}
                              isMatchingMethode={isMatchingMethode}
                              isZielvariable={isZielvariable}
                              isKontrollvariablen={isKontrollvariablen}
                              isMatchingvariablen={isMatchingvariablen}
                              isMatchingtoleranz={isMatchingtoleranz}
                              isFälleKontrollenGruppenindikator={isFälleKontrollenGrupenindikator}
                              isFälleKontrollenFallID={{isFälleKontrollenFallID}}
                              isVerhältnis={isVerhältnis}
                              isScoreMethode={isScoreMethode}
                              isAlgorithmus={isAlgorithmus}
                              isErsetzung={isErsetzung}
                              isÜbereinstimmungswert={isÜbereinstimmungswert}
                        />
                    </div>
                    {/*Fragebogen und Graphische-Ergebnisse*/}
                    <div className="MiddleContainer">

                        <div className="FormContainer">
                            <Routes sx={{ borderRadius: '10px 10px 10px 10px' }}>
                                <Route path='/' exact element={<Mainpage />} />
                                <Route path="/Startseite" element={<Mainpage />} />
                                <Route path="/Datenquelle"
                                       element={<Datenquelle setDatenquelle={setDatenquelle}
                                                             isDatenquelle={isDatenquelle} />}
                                />
                                <Route path="/Datei-hochladen"
                                       element={<UploadData setDatei={setDatei}
                                                            setDateiSpaltenNamen={setDateiSpaltenNamen}
                                                            setVollständigeDatei={setVollständigeDatei}
                                                            isVollständigeDatei={isVollständigeDatei} isDatei={isDatei} />}
                                />
                                <Route path="/Matching-Methode"
                                       element={<MatchingMethode setMatchingMethode={setMatchingMethode}
                                                                 isMatchingMethode={isMatchingMethode} />}
                                />
                                <Route path="/Zielvariable"
                                       element={<Zielvariable setZielvariable={setZielvariable}
                                                              isDateiSpaltenNamen={isDateiSpaltenNamen}
                                                              isZielvariable={isZielvariable}
                                                              isMatchingMethode={isMatchingMethode}/>}
                                />
                                <Route path="/Kontrollvariablen"
                                       element={<Kontrollvariablen setKontrollvariablen={setKontrollvariablen}
                                                                   setAllKontrollvariablen={setAllKontrollvariablen}
                                                                   isDateiSpaltenNamen={isDateiSpaltenNamen}
                                                                   isAllKontrollvariablen={isAllKontrollvariablen} />}
                                />
                                <Route path="/Matchingvariablen"
                                       element={<Matchingvariablen setMatchingvariablen={setMatchingvariablen}
                                                                   setAllMatchingvariablen={setAllMatchingvariablen}
                                                                   isDateiSpaltenNamen={isDateiSpaltenNamen}
                                                                   isAllMatchingvariablen={isAllMatchingvariablen} />}
                                />
                                <Route path="/Matchingtoleranz"
                                       element={<Matchingtoleranz setMatchingtoleranz={setMatchingvariablen}
                                                                  isAllMatchingvariablen={isAllMatchingvariablen}
                                       />}
                                />
                                <Route path="/FälleKontrollen"
                                       element={<FälleKontrollen setFälleKontrollenGruppenIndikator={setFälleKontrollenGruppenindikator}
                                                                 setFälleKontrollenFallID={setFälleKontrollenFallID}
                                                                  isAllMatchingvariablen={isAllMatchingvariablen}
                                       />}
                                />
                                <Route path="/Matching-Verhältnis"
                                       element={<MatchingVerhältnis setVerhältnis={setVerhältnis}
                                                                    isVerhältnis={isVerhältnis}
                                                                    isMatchingMethode={isMatchingMethode}/>}
                                />
                                <Route path="/MethodeScoreBerechnung"
                                       element={<MethodeScoreBerechnung setScoreMethode={setScoreMethode}
                                                                        isScoreMethode={isScoreMethode} />}
                                />
                                <Route path="/MatchingAlgorithmus"
                                       element={<MatchingAlgorithmus setAlgorithmus={setAlgorithmus}
                                                                     setErsetzung={setErsetzung}
                                                                     isErsetzung={isErsetzung}
                                                                     isAlgorithmus={isAlgorithmus} />}
                                />
                                <Route path="/ÜbereinstimmungPropensityScore"
                                       element={<ÜbereinstimmungPropensityScore isAlgorithmus={isAlgorithmus}
                                                                                isAllKontrollvariablen={isAllKontrollvariablen}
                                                                                isVerhältnis={isVerhältnis} isErsetzung={isErsetzung}
                                                                                isZielvariable={isZielvariable}
                                                                                isMatchingMethode={isMatchingMethode}
                                                                                isVollständigeDatei={isVollständigeDatei}
                                                                                isScoreMethode={isScoreMethode}
                                                                                setÜbereinstimmungswert={setÜbereinstimmungswert}
                                                                                isÜbereinstimmungswert={isÜbereinstimmungswert} />}
                                />
                                <Route path="/Matching-Ergebnis"
                                       element={<MatchingErgebnis isAllKontrollvariablen={isAllKontrollvariablen} isMatchingMethode={isMatchingMethode}/>}
                                />
                                <Route path="/Dataexport" element={<Dataexport />} />
                            </Routes>
                        </div>
                        <div className="dynamicResults">
                            <DynamicResult isPackageB={isPackageB} />
                        </div>
                    </div>
                    {/*Infobox in einem Container*/}
                    <div className="RightContainer">
                        {/*<InputProtokoll/>*/}
                        <InfoBox />
                        <Foot />
                    </div>
                </div>
            </Router>
            {/*Fußzeile*/}

        </div>
    );
}

export default App;

