import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";

import { visitedSite } from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CardHeader, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import summary from '../../assets/summary.json';
import FHSPSOE from '../../assets/FHS_PS_OE_V2.json';
import FHSPSME from '../../assets/FHS_PS_ME_V2.json';
import FHSEMMT from '../../assets/FHS_EM_MT_V2.json';
import FHSEMOT from '../../assets/FHS_EM_OT.json';
import { Paper, Table, TableBody } from "@material-ui/core";
import Card from "@mui/material/Card";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import AppContext from '../../AppContext';
import Grid from '@mui/material/Grid';
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTitle } from "@mui/lab";
import Zielvariable from './Zielvariable';


function MatchingErgebnis() {
    const { setErgebnisse, isDatei, isVollständigeDatei, isAllKontrollvariablen, isKontrollvariablen, isMatchingMethode, isDateiSpaltenNamen, isBeobachtungen, isFälleKontrollenGruppenindikator, isZielvariable, setWorkflow, isErsetzung, isToleranzBereichSet, isVerhältnis, isÜbereinstimmungswert, isToleranzBereich, isAlgorithmus, isScoreMethode, isMatchingtoleranz, isMatchingvariablen, isAllMatchingvariablen } = useContext(AppContext);

    // Transform arrays to comma-separated strings once
    const allMatchingvariablenString = Array.isArray(isAllMatchingvariablen) ? isAllMatchingvariablen.map(item => {
        if (typeof item === 'string') return item;
        return item?.var || item?.variable || item?.name || item?.value || String(item);
    }).join(', ') : isAllMatchingvariablen;

    const allKontrollvariablenString = Array.isArray(isAllKontrollvariablen) ? isAllKontrollvariablen.map(item => {
        if (typeof item === 'string') return item;
        return item?.var || item?.variable || item?.name || item?.value || String(item);
    }).join(', ') : isAllKontrollvariablen;

    console.log("isAllMatchingvariablen:", allMatchingvariablenString);
    
    // Debug logging to understand the data structure
    console.log("DEBUG - isAllMatchingvariablen type:", typeof isAllMatchingvariablen);
    console.log("DEBUG - isAllMatchingvariablen isArray:", Array.isArray(isAllMatchingvariablen));
    console.log("DEBUG - isAllMatchingvariablen raw:", isAllMatchingvariablen);
    if (Array.isArray(isAllMatchingvariablen) && isAllMatchingvariablen.length > 0) {
        console.log("DEBUG - First item keys:", Object.keys(isAllMatchingvariablen[0]));
        console.log("DEBUG - First item:", isAllMatchingvariablen[0]);
    }
    console.log("DEBUG - isAllKontrollvariablen type:", typeof isAllKontrollvariablen);
    console.log("DEBUG - isAllKontrollvariablen isArray:", Array.isArray(isAllKontrollvariablen));
    console.log("DEBUG - isAllKontrollvariablen raw:", isAllKontrollvariablen);
    if (Array.isArray(isAllKontrollvariablen) && isAllKontrollvariablen.length > 0) {
        console.log("DEBUG - First Kontroll item keys:", Object.keys(isAllKontrollvariablen[0]));
        console.log("DEBUG - First Kontroll item:", isAllKontrollvariablen[0]);
    }
    

    function createData(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const [results, setResults] = useState([]);

    const postPSMOE = '260';
    const postPSMME = '215';
    const postEMOT = '256';
    const postEMMT = '256';

    const variablePSMOE = '45';
    const variablePSMME = '18';
    const variableEMOT = '44';
    const variableEMMT = '44';

    /**} else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            return postPSMME;
        }else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
            console.log(isMatchingMethode);
            console.log(isToleranzBereichSet);
            return postEMOT; */
    const postBeobachtungen = () => {
        if (isMatchingMethode === "Propensity Score") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            return postPSMOE;

        } else if (isMatchingMethode === "Exaktes Matching") {
            console.log(isMatchingMethode);
            console.log(isToleranzBereichSet);
            return postEMMT;
        }
    };

    const postVariable = () => {
        if (isMatchingMethode === "Propensity Score" && isErsetzung === "FALSE") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            return variablePSMOE;
        } else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            return variablePSMME;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
            console.log(isMatchingMethode);
            console.log(isToleranzBereichSet);
            return variableEMOT;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
            console.log(isMatchingMethode);
            console.log(isToleranzBereichSet);
            return variableEMMT;
        }
    };


    /**else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            console.log(isToleranzBereichSet);
            console.log(FHSPSME);
            console.log(isBeobachtungen);
            data = FHSPSME; 
            
            else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
            console.log(isMatchingMethode);
            console.log(isErsetzung);
            console.log(isToleranzBereichSet);
            console.log(FHSEMMT);
            console.log(isBeobachtungen);
            data = FHSEMMT;
        }*/

    useEffect(() => {
        try {
            let data;

            if (isMatchingMethode === "Propensity Score") {
                console.log("Datei: " + isDatei);
                console.log("VollständigeDatei:", isVollständigeDatei);
                console.log("MatchingMethode: " + isMatchingMethode);            
                console.log("Groupindicator: " + isZielvariable);
                console.log("All Kontrollvariablen:", allKontrollvariablenString);
                console.log("Kontrollvariablen:", isKontrollvariablen);
                console.log("Matchingverhältnis: " + isVerhältnis);
                console.log("Ersetzung: " + isErsetzung);
                console.log("Methode für PS-Score: " + isScoreMethode);
                console.log("Matching Algorithmus: " + isAlgorithmus);
                console.log("Übereinstimmungswert: " + isÜbereinstimmungswert);
                console.log("Toleranzwerte:", isMatchingtoleranz);
                data = FHSPSOE;

            }
            else if (isMatchingMethode === "Exaktes Matching") {
                console.log("Datei: " + isDatei);
                console.log("VollständigeDatei:", isVollständigeDatei);
                console.log("MatchingMethode: " + isMatchingMethode);
                console.log("Groupindicator: " + isFälleKontrollenGruppenindikator);
                console.log("All Matchingvariablen:", allMatchingvariablenString);
                console.log("Ersetzung: " + isErsetzung);
                console.log("Toleranzwerte:", isMatchingtoleranz);
                console.log("DEBUG - isToleranzBereich in useEffect:", isToleranzBereich);
                console.log("DEBUG - isToleranzBereichSet in useEffect:", isToleranzBereichSet);
                console.log("Matchingverhältnis: " + isVerhältnis);
                data = FHSEMMT;
            }
            setResults(data);
        } catch (error) {
            console.error("Error in useEffect:", error);
            console.log("Fallback: Setting empty results array");
            setResults([]);
        }

    }, [isMatchingMethode, isErsetzung, isToleranzBereichSet]);

    var result_data = "";

    const receivedResults = (event) => {
        try {
            console.log("Hier startet receivedResults");

           
            var distance = "";
            var realGroupIndicator = ""
            var realControlVariables = ""
            var replace = ""
            var test = ""
            var realMatchingMethode = ""
            var realErsetzung = ""

            console.log("Vorablog der Ersetzung:")
            console.log("Algorithmus ist: " + isAlgorithmus)
      
            
            


            if(isMatchingMethode == "Exaktes Matching") {
                distance = "mahalanobis"
                realGroupIndicator = isFälleKontrollenGruppenindikator
                realControlVariables = allMatchingvariablenString
                console.log("isAllMatchingvariablen:", allMatchingvariablenString)
                realMatchingMethode = "exact"
                realErsetzung = "FALSE"
            }
            if(isMatchingMethode == "Propensity Score" && isAlgorithmus == "nearest") {
                console.log("Fall Propensity Score Matching Nearest Neighbour tritt ein mit Zielvariable: " + isZielvariable)
                distance = "glm"
                realGroupIndicator = isZielvariable
                realControlVariables = allKontrollvariablenString
                realMatchingMethode = "nearest"
                realErsetzung = isErsetzung
            }
            if(isMatchingMethode == "Propensity Score" && isAlgorithmus == "Optimal Matching") {
                console.log("Fall Optimal-Matching tritt ein")
                distance = "glm"
                realGroupIndicator = isZielvariable
                realControlVariables = allKontrollvariablenString
                realMatchingMethode = "optimal"
            }
      



            console.log("receivedResults Groupindicator: " + realGroupIndicator)
            console.log("receivedResults Kontrollvariablen: " + realControlVariables)
            console.log("receivedResults Matching-Methode: " + isMatchingMethode)
            console.log("receivedResults Distanz: " + distance)        
            console.log("receivedResults Mreplace: " + replace)
            console.log("receivedResults Mratio: " + isVerhältnis)
            console.log("DEBUG - isToleranzBereich type:", typeof isToleranzBereich)
            console.log("DEBUG - isToleranzBereich content:", isToleranzBereich)
            console.log("DEBUG - isMatchingtoleranz type:", typeof isMatchingtoleranz)
            console.log("DEBUG - isMatchingtoleranz content:", isMatchingtoleranz)
            console.log("receivedResults Caliper-Variablen: " + isToleranzBereich)
            console.log("receivedResults Toleranzwerte (alternative): " + isMatchingtoleranz)
            

            // Bestimme welche Variablen und Werte tatsächlich Toleranzwerte haben (nicht 0 oder null)
            let caliperVariables = [];
            let caliperValues = [];
            console.log("DEBUG - Filtering Caliper Variables and Values:");
            console.log("DEBUG - isMatchingtoleranz Array:", isMatchingtoleranz);
            console.log("DEBUG - isAllMatchingvariablen Array:", isAllMatchingvariablen);

            if (Array.isArray(isMatchingtoleranz) && Array.isArray(isAllMatchingvariablen)) {
                console.log("DEBUG - Both arrays are valid, length:", isMatchingtoleranz.length, isAllMatchingvariablen.length);

                for (let i = 0; i < isMatchingtoleranz.length; i++) {
                    const toleranzwert = isMatchingtoleranz[i];
                    console.log(`DEBUG - Index ${i}: Toleranzwert = "${toleranzwert}" (type: ${typeof toleranzwert})`);

                    // Prüfe ob der Toleranzwert gesetzt ist (nicht 0, nicht null, nicht leer)
                    const isNonZero = toleranzwert &&
                                     toleranzwert !== "0.00" &&
                                     toleranzwert !== "0" &&
                                     toleranzwert !== "" &&
                                     toleranzwert !== null &&
                                     parseFloat(toleranzwert) !== 0;

                    console.log(`DEBUG - Index ${i}: isNonZero = ${isNonZero}`);

                    if (isNonZero) {
                        // Sammle sowohl die Variable als auch den Wert
                        caliperValues.push(toleranzwert);
                        if (isAllMatchingvariablen[i]) {
                            const variableName = isAllMatchingvariablen[i].var || isAllMatchingvariablen[i].variable || isAllMatchingvariablen[i].name || String(isAllMatchingvariablen[i]);
                            console.log(`DEBUG - Adding variable: ${variableName} with value: ${toleranzwert}`);
                            caliperVariables.push(variableName);
                        }
                    }
                }
            }
            const caliperVariablesString = `${caliperVariables.join(', ')}`;
            const caliperValuesString = `${caliperValues.join(', ')}`;
            console.log("Caliper-Variables mit Toleranzwerten:", caliperVariablesString);
            console.log("Caliper-Values (nur Nicht-Null):", caliperValuesString);


            // Parameter als Variablen definieren
            const baseUrl = "http://127.0.0.1:8000/control_selection/result_data";
            const params = {
                groupindicator: realGroupIndicator,
                controllvariables: realControlVariables,
                mmethod: realMatchingMethode,
                mdistance: distance,
                mreplace: realErsetzung,
                mratio: isVerhältnis,
                mcaliper: caliperValuesString,
                mcalipervariables: caliperVariablesString,
                dataset: isVollständigeDatei
            };

            // test
            // URL-Parameter in einen Query-String umwandeln
            const queryString = new URLSearchParams({
                groupindicator: params.groupindicator,
                controllvariables: `[${params.controllvariables}]`,
                mmethod: params.mmethod,
                mdistance: params.mdistance,
                mreplace: params.mreplace,
                mratio: params.mratio,
                mcaliper: Array.isArray(params.mcaliper) ? params.mcaliper.join(',') : params.mcaliper,
                mcalipervariables: Array.isArray(params.mcalipervariables) ? params.mcalipervariables.join(',') : params.mcalipervariables
            }).toString();

            // Kompletten URL zusammenbauen
            const fullUrl = `${baseUrl}?${queryString}`;

            // Dataset für den Body - jetzt mit verbesserter Typ-Konvertierung
            const bodyData = isVollständigeDatei
            console.log("Sending dataset with improved type conversion:", bodyData);

            // POST-Request mit Fetch API
            fetch(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token dd6d5f6aff9c4228b9f6c19db94f9408ddf91bc3"
                },
                body: JSON.stringify(bodyData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    console.log("Antwort vom Server:", result);
                    result_data = result


                    

                })
                .catch(error => {
                    console.error("Fehler beim POST-Aufruf:", error);
                });
        } catch (error) {
            console.error("Error in receivedResults:", error);
        }

    }       

    receivedResults("start");

    /*   if (isMatchingMethode === "Propensity Score" && isErsetzung === "FALSE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSPSOE)
           results = FHSPSOE;
       } else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSPSME)
           results = FHSPSME;
       }/* else if (MatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSEMOT)
           return FHSEMOT;
       } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSEMMT)
           return FHSEMMT;
       }*/

    let backFunction = () => {
        if (isMatchingMethode === "Exaktes Matching") {
            return "/Matching-Verhältnis";
        } else {
            return "/ÜbereinstimmungPropensityScore";
        }
    };

    const [open, setOpen] = React.useState(false);
    const [isPlaceholder, setPlaceholder] = React.useState(true);

    const noMatches = () => {
        if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
            return <div>
                <Alert style={{ maxWidth: "82%", marginLeft: "7%", backgroundColor: '#fdeded' }} action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                            setPlaceholder(true);
                        }}
                    >
                    </IconButton>
                }
                    sx={{ mb: 2 }} severity="error">
                    <AlertTitle> <strong>No Matches</strong></AlertTitle>
                    Aufgrund Ihrer gemachten Angaben konnten keine Paare gebildet werden.
                </Alert></div>
        }
    }

    const columnHeader0 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;


    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }} />

            <CardContent sx={{ backgroundColor: "white", width: "100%" }}>
                <div style={{ width: "95%", flexFlow: "row", paddingLeft: "0.5%" }}>
                    <Typography sx={{ fontSize: 18 }}>
                        Matching-Ergebnisse
                    </Typography>

                    <Typography style={{ fontSize: "10px", fontWeight: "bold", float: "right" }}>

                        Pre-Matching: 42 Variablen, 3826 Beobachtungen <br />
                        Post-Matching:{postVariable()} Variablen, {postBeobachtungen()} Beobachtungen
                    </Typography>
                </div>

                <div style={{
                    maxHeight: "1000px",
                    flexFlow: "column",
                    paddingTop: "0%",
                    paddingLeft: "1%",
                    width: "95%",
                    overflowY: "auto",
                    marginBottom: "1%"
                }}>

                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210, fontSize: "x-small" }} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow sx={{ height: '30px' }}>
                                        <TableCell align="center" colSpan={4} sx={{
                                            border: 'solid 2px',
                                            backgroundColor: "#1d4189",
                                            color: "white",
                                            fontSize: "medium",
                                            padding: "4px"
                                        }}>
                                            PreMatching
                                        </TableCell>
                                        <TableCell align="center" colSpan={5} sx={{
                                            border: 'solid 2px',
                                            backgroundColor: "#1d4189",
                                            color: "white",
                                            fontSize: "medium",
                                            padding: "4px",
                                            borderLeft: "solid 1px white"
                                        }}>
                                            PostMatching
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: '30px' }}>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">Variable</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">Differenz</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">Differenz</TableCell>
                                        <TableCell colSpan={2}
                                            sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }}
                                            align="center">Balance</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ maxHeight: "210px", overflowY: "auto", overflowX: "none" }}>
                            <TableContainer component={Paper} style={{ overflowX: "none" }}>
                                <Table sx={{ fontSize: "small", border: '1px solid #ddd' }} size="small"
                                    aria-label="a dense table">
                                    <TableBody>
                                        {result_data.map((item, index) => (
                                            <TableRow key={index}>
                                                {Object.entries(item).map(([key, val], index) => {
                                                    if (key === "row_names") {
                                                        // Behandle den Namen anders
                                                        return (
                                                            <TableCell key={index} style={{ textAlign: "left", paddingRight: "2px", padding: "5px", width: '10px' }}>
                                                                {val}
                                                            </TableCell>

                                                        );
                                                    } else {
                                                        if (val === "Balanced") {
                                                            return (
                                                                <TableCell key={index} style={{ textAlign: "center", padding: "2px" }}>
                                                                    <CheckCircleIcon style={{ color: "green", background: "none" }} />

                                                                </TableCell>
                                                            );

                                                        } else if (val === "Not Balanced") {
                                                            return (
                                                                <TableCell key={index} style={{ textAlign: "center", padding: "2px" }}>
                                                                    <Cancel style={{ color: "red", background: "none" }} />
                                                                </TableCell>
                                                            );
                                                        } else {
                                                            return (
                                                                <TableCell key={index} style={{ textAlign: "center", paddingRight: "70px", padding: "8px" }}>
                                                                    {val}
                                                                </TableCell>
                                                            );
                                                        }
                                                    }
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {noMatches()}
                        </div>
                    </div>
                </div>


                <Typography style={{ fontSize: "10px", paddingLeft: "1%" }}>
                    <strong>PS:</strong> Propensity Score<br />
                    <strong>stetige Variablen:</strong> Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD)) <br />
                    <strong>kategoriale Variablen:</strong> Anteile bzw. rohe Differenz in den Anteilen <br />
                </Typography>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float: 'right', bottom: 0, gap: '2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{ textDecoration: "none" }} onClick={() => {
                    if (isMatchingMethode === "Exaktes Matching") {
                        setWorkflow("MatchingVerhältnis");
                    } else {
                        setWorkflow("Kontrollvariablen")
                    }
                }} to={backFunction()}><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": { backgroundColor: "white", borderColor: "#1d4189" },
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon />Zurück</Button></Link>
                </Grid>
                {/* <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined"><DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>
                    <Link style={{ textDecoration: "none" }} to='/Dataexport' onClick={() => {
                        visitedSite("datenexport");
                        setWorkflow("Datenexport")
                    }}><Button sx={{
                        height: "100%",
                        width: "auto",
                        color: "white",
                        border: "none",
                        backgroundColor: "#1d4189",
                        "&:hover": { backgroundColor: "#1d4189" }
                    }} variant="filled">Weiter<ArrowForwardIcon /></Button></Link>
                </Grid>
            </Grid>
        </Card>
    );
}

export default MatchingErgebnis;
