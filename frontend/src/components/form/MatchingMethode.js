import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useContext, useState} from "react";
import {FormGroup} from "@material-ui/core";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {AlertTitle} from "@mui/lab";
import AppContext from '../../AppContext';
import Grid from '@mui/material/Grid';


function MatchingMethode() {

    const { setMatchingMethode, isMatchingMethode, isVollständigeDatei, setWorkflow } = useContext(AppContext);

    const [isActiveAusgVar, setIsActiveAusgVar] = useState(false);
    const [isActivePropS, setIsActivePropS] = useState(false);
    const [isActiveZufallsP, setIsActiveZufallsP] = useState(false);
    const [isgewählteMethode, setgewählteMethode] = useState(false);
    console.log(isVollständigeDatei);

    const handleClickOptionAusgVar = () => {
        if (!isActiveAusgVar) {
            setIsActiveAusgVar(true);
            setMatchingMethode('Exaktes Matching');
            setgewählteMethode('Exaktes Matching');
            setIsActiveZufallsP(false);
            setIsActivePropS(false);
        }

    };

    const handleClickOptionPropS = () => {
        if (!isActivePropS) {
            setIsActivePropS(true);
            setMatchingMethode('Propensity Score');
            setgewählteMethode('Propensity Score');
                setIsActiveZufallsP(false);
            setIsActiveAusgVar(false);
        }

    };

   /* const handleClickOptionZufallsP = () => {
        if (!isActiveZufallsP) {
            setIsActiveZufallsP(true);
            setMatchingMethode('Zufallsprinzip');
            setIsActivePropS(false);
            setIsActiveAusgVar(false);
        }

    };*/

    let toFunction = () => {
        if(isgewählteMethode==="Exaktes Matching"){
            return "/Matchingvariablen";
        }
        if(isgewählteMethode==="Propensity Score"){
            return "/Zielvariable";
        }


    };

    function löschen(){
        setMatchingMethode('defaultMethode');
        setIsActiveAusgVar(false);
        setIsActivePropS(false);
        setIsActiveZufallsP(false);
    }

    const [open, setOpen] = React.useState(false);
    const [isPlaceholder, setPlaceholder] = React.useState(true);



    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "1%", paddingLeft: "3%"}}>
                    Matching Methode
                </Typography>
                <Collapse in={open}>
                    <Alert style={{maxWidth: "82%", marginLeft: "7%"}} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                setPlaceholder(true);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                           sx={{mb: 2}} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Keine Matching Methode — <strong>Sie müssen eine Matching-Methode auswählen, um
                        fortzufahren</strong>
                    </Alert>

                </Collapse>
                <Collapse in={isPlaceholder}>
                    <div style={{margin: "10%"}}></div>
                </Collapse>
                <div style={{
                    minHeight: "80%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingBottom: "11%"
                }}>


                    <FormGroup style={{display: "flex", flexFlow: "row", justifyContent: "space-evenly", gap: "25px"}}>
                        <Box
                            style={{
                                backgroundColor: isActiveAusgVar || isMatchingMethode === "Exaktes Matching" ? "#1d4189" : '#E8E9EB',
                                color: isActiveAusgVar || isMatchingMethode === "Exaktes Matching" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveAusgVar || isMatchingMethode === "Exaktes Matching" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionAusgVar}
                        > Exaktes Matching nach <br/> ausgewählten Variablen
                        </Box>

                        <Box
                            style={{
                                backgroundColor: isActivePropS || isMatchingMethode === "Propensity Score" ? "#1d4189" : '#E8E9EB',
                                color: isActivePropS || isMatchingMethode === "Propensity Score" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActivePropS || isMatchingMethode === "Propensity Score" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionPropS}
                        > Propensity Score Matching
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
                            // onClick={handleClickOptionZufallsP} <-- Hier wird das onClick-Ereignis entfernt
                        >
                            Zufallsprinzip
                        </Box>
                    </FormGroup>
                </div>

            </CardContent>

            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Datei-hochladen")
                }} to='/Datei-hochladen'><Button sx={{
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
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} to={toFunction()} onClick={() => {
                    if (isMatchingMethode === "Exaktes Matching") {
                        visitedSite("matchingvariablen");
                        setWorkflow("Matchingvariablen");
                    }
                    if (isMatchingMethode === "Propensity Score") {
                        visitedSite("zielvariable");
                        setWorkflow("Zielvariable")
                    }
                    if (isMatchingMethode === "defaultMethode") {
                        setOpen(true);
                        setPlaceholder(false);
                    }
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

export default MatchingMethode;
