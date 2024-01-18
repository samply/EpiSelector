import './App.css';
import TopNav from "./components/TopNav";
import NavB from './components/NavB'
import Mainpage from './components/form/Mainpage';
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
import Matchingtoleranz from "./components/form/Matchingtoleranz";
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
    const [isVerhältnisNav, setVerhältnisNav] = useState('defaultVerhältnis');
    const [isScoreMethode, setScoreMethode] = useState('defaultScoreMethode');
    const [isScoreMehodeNav, setScoreMethodeNav] = useState('defaultScoreMethode');
    const [isAlgorithmus, setAlgorithmus] = useState('defaultAlgo');
    const [isAlgorithmusNav, setAlgorithmusNav] = useState('defaultAlgo');
    const [isÜbereinstimmungswert, setÜbereinstimmungswert] = useState('defaultÜbereinstimmungswert');
    const [isZielvariable, setZielvariable] = useState('defaultZielvariable');
    const [isKontrollvariablen, setKontrollvariablen] = useState('defaultKontrollvariablen');
    const [isMatchingvariablen, setMatchingvariablen] = useState('defaultMatchingvariablen');
    const [isAllMatchingvariablen, setAllMatchingvariablen] = useState('');
    const [isMatchingtoleranz, setMatchingtoleranz] = useState("");
    const [isMatchingtoleranzChip, setMatchingtoleranzChip] = useState("");
    const [isFälleKontrollenGruppenindikator, setFälleKontrollenGruppenindikator] = useState('defaultFälleKontrollenGruppenindikator');
    const [isErsetzung, setErsetzung] = useState('FALSE');
    const [isErsetzungNav, setErsetzungNav] = useState('Ohne Ersetzung');
    const [isDateiSpaltenNamen, setDateiSpaltenNamen] = useState('');
    const [isVollständigeDatei, setVollständigeDatei] = useState('');
    const [isPSJsonPackage, setPSJsonPackage] = useState('defaultPackage');
    const [isEMJsonPackage, setEMJsonPackage] = useState('defaultPackage');
    const [isAllKontrollvariablen, setAllKontrollvariablen] = useState('');
    const [isPackageB, setPackageB] = useState('');
    const [isX, setX] = useState({})
    const [isBeobachtungen, setBeobachtungen] = useState('');
    const [isDisclaimer, setDisclaimer] = useState(true);
    const [isFKChip, setFKChip] = useState(" ");
    const [isClickedKV, setClickedKV] = useState(false);
    const [isClickedMV, setClickedMV] = useState(false);
    const [isWorkflow, setWorkflow] = useState("Startseite");
    const [isOnlyBinaryColumns, setOnlyBinaryColumns] = useState('default');


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
                        <NavB isClickedMV={isClickedMV}
                            setClickedMV={setClickedMV}
                            isClickedKV={isClickedKV}
                            setClickedKV={setClickedKV}
                            setWorkflow={setWorkflow}
                            isDatenquelle={isDatenquelle}
                            isDatei={isDatei}
                            isMatchingMethode={isMatchingMethode}
                            isZielvariable={isZielvariable}
                            isKontrollvariablen={isKontrollvariablen}
                            isMatchingvariablen={isMatchingvariablen}
                            isMatchingtoleranz={isMatchingtoleranz}
                            isFälleKontrollenGruppenindikator={isFälleKontrollenGruppenindikator}
                            isVerhältnis={isVerhältnis}
                            isVerhältnisNav={isVerhältnisNav}
                            isScoreMethode={isScoreMethode}
                            isScoreMethodeNav={isScoreMehodeNav}
                            isAlgorithmus={isAlgorithmus}
                            isAlgorithmusNav={isAlgorithmusNav}
                            isErsetzung={isErsetzung}
                            isErsetzungNav={isErsetzungNav}
                            isÜbereinstimmungswert={isÜbereinstimmungswert}
                            isMatchingtoleranzChip={isMatchingtoleranzChip}
                            isFKChip={isFKChip}
                            isAllKontrollvariablen={isAllKontrollvariablen}
                            isAllMatchingvariablen={isAllMatchingvariablen}
                        />
                    </div>
                    {/*Fragebogen und Graphische-Ergebnisse*/}
                    <div className="MiddleContainer">

                        <div className="FormContainer">
                            <Routes sx={{ borderRadius: '10px 10px 10px 10px' }}>
                                <Route path='/' exact element={<Mainpage isDisclaimer={isDisclaimer} setWorkflow={setWorkflow} />} />
                                <Route path="/Startseite" element={<Mainpage isDisclaimer={isDisclaimer} setWorkflow={setWorkflow} />} />
                                <Route path="/Datenquelle"
                                    element={<Datenquelle setDatenquelle={setDatenquelle}
                                        isDatenquelle={isDatenquelle} />}
                                />
                                <Route path="/Datei-hochladen"
                                    element={<UploadData setDatei={setDatei}
                                        setDateiSpaltenNamen={setDateiSpaltenNamen}
                                        setVollständigeDatei={setVollständigeDatei}
                                        isVollständigeDatei={isVollständigeDatei} isDatei={isDatei}
                                        setBeobachtungen={setBeobachtungen}
                                        setOnlyBinaryColumns={setOnlyBinaryColumns}/>}
                                />
                                <Route path="/Matching-Methode"
                                    element={<MatchingMethode setMatchingMethode={setMatchingMethode}
                                        isMatchingMethode={isMatchingMethode}
                                        isVollständigeDatei={isVollständigeDatei} />}
                                />
                                <Route path="/Zielvariable"
                                    element={<Zielvariable setZielvariable={setZielvariable}
                                        isDateiSpaltenNamen={isDateiSpaltenNamen}
                                        isZielvariable={isZielvariable}
                                        isMatchingMethode={isMatchingMethode}
                                        isOnlyBinaryColumns={isOnlyBinaryColumns}/>}
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
                                    element={<Matchingtoleranz isMatchingtoleranz={isMatchingtoleranz}
                                        setMatchingtoleranz={setMatchingtoleranz}
                                        isAllMatchingvariablen={isAllMatchingvariablen}
                                        setMatchingtoleranzChip={setMatchingtoleranzChip}
                                    />}
                                />
                                <Route path="/FälleKontrollen"
                                    element={<FälleKontrollen setFälleKontrollenGruppenIndikator={setFälleKontrollenGruppenindikator}
                                        isAllMatchingvariablen={isAllMatchingvariablen}
                                        isFälleKontrollenGruppenindikator={isFälleKontrollenGruppenindikator}
                                        setFKChip={setFKChip}
                                        isDateiSpaltenNamen={isDateiSpaltenNamen}
                                        isMatchingvariablen={isMatchingvariablen}
                                    />}
                                />
                                <Route path="/Matching-Verhältnis"
                                    element={<MatchingVerhältnis setVerhältnis={setVerhältnis}
                                                                 setVerhältnisNav={setVerhältnisNav}
                                                                 isVerhältnis={isVerhältnis}
                                                                 isVerhältnisNav={isVerhältnisNav}
                                                                 isMatchingMethode={isMatchingMethode}
                                                                 isFälleKontrollenGruppenindikator={isFälleKontrollenGruppenindikator}
                                                                 isMatchingtoleranz={isMatchingtoleranz}
                                                                 isAllMatchingvariablen={isAllMatchingvariablen}
                                                                 isVollständigeDatei={isVollständigeDatei}
                                                                 isMatchingMethode={isMatchingMethode}
                                                                />}
                                />
                                <Route path="/MethodeScoreBerechnung"
                                    element={<MethodeScoreBerechnung setScoreMethode={setScoreMethode}
                                                                     isScoreMethode={isScoreMethode}
                                                                     isScoreMethodeNav={isScoreMehodeNav}
                                                                     setScoreMethodeNav={setScoreMethodeNav}/>}
                                />
                                <Route path="/MatchingAlgorithmus"
                                    element={<MatchingAlgorithmus setAlgorithmus={setAlgorithmus}
                                                                  isAlgorithmus={isAlgorithmus}
                                                                  isAlgorithmusNav={isAlgorithmusNav}
                                                                  setAlgorithmusNav={setAlgorithmusNav}
                                                                  setErsetzung={setErsetzung}
                                                                  isErsetzung={isErsetzung}
                                                                  isErsetzungNav={isErsetzungNav}
                                                                  setErsetzungNav={setErsetzungNav}/>}
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
                                    element={<MatchingErgebnis isBeobachtungen={isBeobachtungen}
                                                               isAllKontrollvariablen={isAllKontrollvariablen}
                                                               isMatchingMethode={isMatchingMethode}
                                                               isDateiSpaltenNamen={isDateiSpaltenNamen}
                                                               isZielvariable={isZielvariable}
                                                               isFälleKontrollenGruppenindikator={isFälleKontrollenGruppenindikator}
                                    />}
                                    element={<MatchingErgebnis isBeobachtungen={isBeobachtungen}
                                    isAllKontrollvariablen={isAllKontrollvariablen}
                                    isMatchingMethode={isMatchingMethode}
                                    isDateiSpaltenNamen={isDateiSpaltenNamen}
                                    isAlgorithmus={isAlgorithmus}
                                    isVerhältnis={isVerhältnis} isErsetzung={isErsetzung}
                                    isZielvariable={isZielvariable}
                                    isVollständigeDatei={isVollständigeDatei}
                                    isScoreMethode={isScoreMethode}
                                    isÜbereinstimmungswert={isÜbereinstimmungswert}/>}
                                />
                                <Route path="/Dataexport" element={<Dataexport setDisclaimer={setDisclaimer} />} />
                            </Routes>
                        </div>
                        <div className="dynamicResults">
                            <DynamicResult isPackageB={isPackageB} isAlgorithmus={isAlgorithmus}
                                isAllKontrollvariablen={isAllKontrollvariablen}
                                isVerhältnis={isVerhältnis} isErsetzung={isErsetzung}
                                isZielvariable={isZielvariable}
                                isMatchingMethode={isMatchingMethode}
                                isVollständigeDatei={isVollständigeDatei}
                                isScoreMethode={isScoreMethode}
                                isÜbereinstimmungswert={isÜbereinstimmungswert} />
                        </div>
                    </div>
                    {/*Infobox in einem Container*/}
                    <div className="RightContainer">
                        {/*<InputProtokoll/>*/}
                        <InfoBox isWorkflow={isWorkflow} />
                        <Foot />
                    </div>
                </div>
            </Router>
            {/*Fußzeile*/}

        </div>
    );
}

export default App;

