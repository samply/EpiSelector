import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
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
import FHSPSOE from '../../assets/FHS_PS_OE.json';
import FHSPSME from '../../assets/FHS_PS_ME.json';
import FHSEMMT from '../../assets/FHS_EM_MT.json';
import FHSEMOT from '../../assets/FHS_EM_OT.json';
import { Paper, Table, TableBody } from "@material-ui/core";
import Card from "@mui/material/Card";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Cancel from '@mui/icons-material/Cancel';
import AppContext from '../../AppContext';
import Grid from '@mui/material/Grid';


function MatchingErgebnis() {
    const { isAllKontrollvariablen, isMatchingMethode, isDateiSpaltenNamen, isBeobachtungen, isFälleKontrollenGruppenindikator, isZielvariable, setWorkflow, isErsetzung, isToleranzBereichSet } = useContext(AppContext);

    function createData(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const [results, setResults] = useState([]);

   useEffect(() => {
       let data;

       if (isMatchingMethode === "Propensity Score" && isErsetzung === "FALSE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSPSOE)
           data = FHSPSOE;
       } else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSPSME)
           data = FHSPSME;
       }else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSEMOT)
           data = FHSEMOT;
       }else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
           console.log(isMatchingMethode);
           console.log(isErsetzung);
           console.log(isToleranzBereichSet);
           console.log(FHSEMMT)
           data = FHSEMMT;
       }
       setResults(data);

   }, [isMatchingMethode, isErsetzung, isToleranzBereichSet]) ;



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
        if(isMatchingMethode==="Exaktes Matching"){
            return "/Matching-Verhältnis";
        }else{
            return "/ÜbereinstimmungPropensityScore";
        }
    };

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;


    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                <div style={{width: "95%", flexFlow: "row", paddingLeft: "0.5%"}}>
                    <Typography sx={{fontSize: 18}}>
                        Vergleich Fälle - Kontrollen
                    </Typography>
                    <Typography style={{fontSize: "10px", fontWeight: "bold", float: "right"}}>
                        Pre-Matching: {isDateiSpaltenNamen.length} Variablen, {isBeobachtungen} Beobachtungen <br/>
                        Post-Matching:{isDateiSpaltenNamen.length + 3} Variablen, {isBeobachtungen} Beobachtungen
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

                    <div style={{maxHeight: "400px", overflowY: "auto"}}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 210, fontSize: "x-small"}} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow sx={{height: '30px'}}>
                                        <TableCell align="center" colSpan={4} sx={{
                                            backgroundColor: "#1d4189",
                                            color: "white",
                                            fontSize: "medium",
                                            padding: "4px"
                                        }}>
                                            PreMatching
                                        </TableCell>
                                        <TableCell align="center" colSpan={5} sx={{
                                            backgroundColor: "#1d4189",
                                            color: "white",
                                            fontSize: "medium",
                                            padding: "4px",
                                            borderLeft: "solid 1px white"
                                        }}>
                                            PostMatching
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{height: '30px'}}>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">Variable</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">Differenz</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">Differenz</TableCell>
                                        <TableCell colSpan={2}
                                                   sx={{backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px"}}
                                                   align="center">Balance</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{maxHeight: "210px", overflowY: "auto", overflowX: "none"}}>
                            <TableContainer component={Paper} style={{overflowX: "none"}}>
                                <Table sx={{fontSize: "small", border: '1px solid #ddd'}} size="small"
                                       aria-label="a dense table">
                                    <TableBody>

                                        {results.map((item) => (
                                            <TableRow key={item.id}>
                                                {Object.values(item).map((val) => {
                                                    if (val === "Balanced") {
                                                        return (
                                                            <TableCell style={{textAlign: "left", padding: "2px"}}>
                                                                <CheckCircleIcon style={{color: "green", background: "none"}}/>
                                                            </TableCell>
                                                        );
                                                    } else if (val === "<0.1") {
                                                        return null; // Ignoriere diese Zelle
                                                    } else if (val === "Not Balanced") {
                                                        return (
                                                            <TableCell style={{textAlign: "left", padding: "2px"}}>
                                                                <Cancel style={{textAlign: "left", color: "red", background: "none"}}/>
                                                            </TableCell>
                                                        );
                                                    } else {
                                                        return (
                                                            <TableCell style={{textAlign: "left", padding: "2px"}}>
                                                                {val}
                                                            </TableCell>
                                                        );
                                                    }
                                                })}
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>


                <Typography style={{fontSize: "10px", paddingLeft: "1%"}}>
                    stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                    kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
                </Typography>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    if (isMatchingMethode === "Exaktes Matching") {
                        setWorkflow("MatchingVerhältnis");
                    } else {
                        setWorkflow("Kontrollvariablen")
                    }
                }} to={backFunction()}><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
                <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined"><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/Dataexport' onClick={() => {
                    visitedSite("datenexport");
                    setWorkflow("Datenexport")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Weiter<ArrowForwardIcon/></Button></Link>
                </Grid>
            </Grid>
        </Card>
    );
}

export default MatchingErgebnis;
