import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';



function MatchingAlgorithmus({setAlgorithmusNav, isAlgorithmusNav, setAlgorithmus, setErsetzung, isErsetzung, setErsetzungNav, isErsetzungNav, setWorkflow}) {

    const [isActiveOM, setIsActiveOM] = useState(false);
    const [isActiveNNM, setIsActiveNNM] = useState(false);

    const [isChecked, setChecked] = useState(() => {
        if(isErsetzungNav ==="Ohne Ersetzung"){
            return true;
        }else{
            return false;
        }

    });

    const [isChecked1, setChecked1] = useState(() => {
        if(isErsetzungNav ==="Mit Ersetzung"){
            return true;
        }else{
            return false;
        }
    });

    function handleClickOptionNNM(){
        if(!isActiveNNM){
            setIsActiveNNM(true);
            setAlgorithmus("nearest");
            setAlgorithmusNav("Nearest Neighbour");
            setIsActiveOM(false);
        }
    }

    function handleClickOptionOM () {
        if(!isActiveOM){
            setIsActiveOM(true);
            setAlgorithmus("Optimal Matching");
            setAlgorithmusNav("Optimal Matching");

        }
        setIsActiveNNM(false);
    }

    function löschen(){
        setAlgorithmus('defaultAlgo');
        setAlgorithmusNav('defaultAlgo');
        setIsActiveNNM(false);
        setIsActiveOM(false);
        setErsetzung('FALSE');
        setErsetzungNav('Ohne Ersetzung');

    }

    function defaultValueOE(){
        if(isErsetzungNav === "Ohne Ersetzung"){
            return true;
        }else{
            return false;
        }
    };
    function defaultValueME(){
        if(isErsetzungNav === "Mit Ersetzung"){
            return true;
        }else{
            return false;
        }
    };

    const ersetzungsPart = () => {
        if (isActiveOM === false && (isActiveNNM === true || isAlgorithmusNav === "Nearest Neighbour")) {
            return (
                <div style={{ display: "flex", flexDirection: "column", paddingLeft: "5%", paddingBottom: "4%" }}>
                    <Typography style={{ fontSize: 18, fontWeight: "normal", paddingBottom: "1rem" }}>
                        Selektion der Kontrollen:
                    </Typography>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <input type="radio" value="OhneErsetzung" checked={isChecked} onClick={() => {
                            if (!isChecked) {
                                setChecked(true);
                                setErsetzung("FALSE");
                                console.log("Ersetzung gerade auf FALSE gesetzt");
                                console.log("isErsetzung ist damit: "+ isErsetzung)
                              /*  setErsetzungNav("Ohne Ersetzung");*/
                                setChecked1(false);
                            }
                        }} />
                        <label style={{ marginLeft: "0.5rem" }}>
                            <strong>Ohne Ersetzung</strong>, ein:e Nicht-Behandelte:r kann nur als Nicht-Behandelte:r für eine:n einzige:n Behandelte:n dienen
                        </label>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input type="radio" value="MitErsetzung" checked={isChecked1} onClick={() => {
                            if (!isChecked1) {
                                setChecked1(true);
                                setErsetzung("TRUE");
                                console.log("Ersetzung gerade auf TRUE gesetzt");
                                console.log("isErsetzung ist damit: " + isErsetzung)
                               /* setErsetzungNav("Mit Ersetzung");*/
                                setChecked(false);
                            }
                        }} />
                        <label style={{ marginLeft: "0.5rem" }}>
                            <strong>Mit Ersetzung</strong>, ein:e Nicht-Behandelte:r kann als Nicht-Behandelte:r für mehrere Behandelte dienen
                        </label>
                    </div>
                </div>
            );
        } else {
            return null; // oder eine Alternative, die Sie verwenden möchten, wenn isActiveOM true ist
        }
    }



    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "3%", paddingLeft: "3%"}}>
                    Matching-Algorithmus
                </Typography>
                <div style={{width: "100%", height: "75%"}}>
                    <div style={{
                        height: "60%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom: "5%"

                    }}>
                        <FormGroup style={{
                            display: "flex",
                            flexFlow: "row",
                            justifyContent: "space-evenly",
                            gap: "100px",
                            paddingTop: "2%"
                        }}>
                            <Box onClick={handleClickOptionNNM}
                                 style={{
                                     backgroundColor: isActiveNNM || isAlgorithmusNav === "Nearest Neighbour" ? "#1d4189" : '#E8E9EB',
                                     color: isActiveNNM || isAlgorithmusNav === "Nearest Neighbour" ? "white" : "#666666",
                                     fontSize: "large",
                                     display: "flex",
                                     width: "15rem",
                                     height: "8rem",
                                     alignItems: "center",
                                     justifyContent: "space-evenly",
                                     borderRadius: "15px",
                                     boxShadow: isActiveNNM || isAlgorithmusNav === "Nearest Neighbour" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                 }}
                            > Nearest Neighbour <br/>Matching (NNM)
                            </Box>
                            <Box
                                style={{
                                    backgroundColor: isActiveOM || isAlgorithmusNav === "Optimal Matching" ? "#1d4189" : '#E8E9EB',
                                    color: isActiveOM || isAlgorithmusNav === "Optimal Matching" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "15rem",
                                    height: "8rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActiveOM || isAlgorithmusNav === "Optimal Matching" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                    pointerEvents: "auto",
                                    opacity: 1,
                                }}
                                onClick={handleClickOptionOM}
                            > Optimal Matching (OM)
                            </Box>
                        </FormGroup>
                    </div>
                    {ersetzungsPart()}
                </div>

            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>
                    <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("ScoreBerechnung")
                }} to='/MethodeScoreBerechnung'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
              {/*  <Grid item>
                <Link style={{textDecoration: "none"}}><Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button></Link>
                </Grid>*/}
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/ÜbereinstimmungPropensityScore' onClick={() => {
                    visitedSite("übereinstimmung");
                    setWorkflow("Übereinstimmung"); if(isErsetzung === ''){setErsetzung('FALSE');}
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

export default MatchingAlgorithmus;
