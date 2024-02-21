import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {FormGroup} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';



function MethodeScoreBerechnung({setScoreMethode, isScoreMethode, isScoreMethodeNav, setScoreMethodeNav, setWorkflow}) {

    const [isActiveML, setIsActiveML] = useState(false);
    const [isActiveLR, setIsActiveLR] = useState(false);

    function handleClickOptionLR(){
        if(!isActiveLR){
            setIsActiveLR(true);
            setScoreMethode("Logistische Regression");
            setScoreMethodeNav("Logistische Regression");
            setIsActiveML(false);
        }

    }

    function handleClickOptionML () {
        if(!isActiveML){
            setIsActiveML(true);
            setScoreMethode("Matching Learning Methode");
            setScoreMethodeNav("Matching Learning Methode");
        setIsActiveLR(false);
        }
    }

    function löschen(){
        setIsActiveLR(false);
        setIsActiveML(false);
        setScoreMethode('defaultScoreMethode');
        setScoreMethodeNav('defaultScoreMethode');
    }

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "8%", paddingLeft: "3%"}}>
                    Methode der Score-Berechnung
                </Typography>

                <div style={{width: "100%", height: "75%"}}>
                    <div style={{
                        height: "85%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom: "14%"

                    }}>
                        <FormGroup
                            style={{display: "flex", flexFlow: "row", justifyContent: "space-evenly", gap: "100px"}}>
                            <Box onClick={handleClickOptionLR}
                                 style={{
                                     backgroundColor: isActiveLR || isScoreMethodeNav === "Logistische Regression" ? "#1d4189" : '#E8E9EB',
                                     color: isActiveLR || isScoreMethodeNav === "Logistische Regression" ? "white" : "#666666",
                                     fontSize: "large",
                                     display: "flex",
                                     width: "15rem",
                                     height: "8rem",
                                     alignItems: "center",
                                     justifyContent: "space-evenly",
                                     borderRadius: "15px",
                                     boxShadow: isActiveLR || isScoreMethode === "Logistische Regression" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                 }}
                            > Logistische Regression
                            </Box>
                            <Box
                                style={{
                                    backgroundColor: '#f4f4f5',
                                    color: "#bababa",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "15rem",
                                    height: "8rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: "",
                                    pointerEvents: "auto", // Pointer-Ereignisse umgekehrt
                                    opacity: 1, // Opazität umgekehrt
                                }}
                            >
                                Matching Learning Methode
                            </Box>


                        </FormGroup>
                    </div>
                </div>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>  <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("MatchingVerhältnis")
                }} to='/Matching-Verhältnis'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
               {/* <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/MatchingAlgorithmus' onClick={() => {
                    visitedSite("algorithmus");
                    setWorkflow("Matching-Algorithmus")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>
                </Grid>

            </Grid>
        </Card>
    );

}

export default MethodeScoreBerechnung;
