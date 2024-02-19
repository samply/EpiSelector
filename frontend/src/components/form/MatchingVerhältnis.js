import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useContext, useState} from "react";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import AppContext from "../../AppContext";
import Grid from '@mui/material/Grid';


function MatchingVerhältnis({verhältnisEdit, setVerhältnisEdit, setVerhältnis, isVerhältnis, setVerhältnisNav, isVerhältnisNav, isMatchingMethode, isFälleKontrollenGruppenindikator, isMatchingtoleranz, isAllMatchingvariablen, isVollständigeDatei, isEMJsonPackage, setWorkflow}) {



    const [isActive11, setIsActive11] = useState(false);
    const [isActive12, setIsActive12] = useState(false);
    const [isActive13, setIsActive13] = useState(false);
    const [isActive14, setIsActive14] = useState(false);
    const [isActive110, setIsActive110] = useState(false);
    const [isActive1Edit, setIsActive1Edit] = useState(false);

    const handleClickOption11 = () => {
        // 👇️ toggle
        if (!isActive11) {
            setIsActive11(true);
            setIsActive12(false);
            setIsActive13(false);
            setIsActive14(false);
            setIsActive110(false);
            setIsActive1Edit(false);
            setVerhältnis("1");
            setVerhältnisNav("1:1");
        }

        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption12 = () => {
        // 👇️ toggle
        if (!isActive12) {
            setIsActive12(true);
            setIsActive11(false);
            setIsActive13(false);
            setIsActive14(false);
            setIsActive110(false);
            setIsActive1Edit(false);
            setVerhältnis("2");
            setVerhältnisNav("1:2");

        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption13 = () => {
        // 👇️ toggle
        if (!isActive13) {
            setIsActive13(true);
            setVerhältnis("3");
            setVerhältnisNav("1:3");
            setIsActive12(false);
            setIsActive11(false);
            setIsActive14(false);
            setIsActive110(false);
            setIsActive1Edit(false);
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption14 = () => {
        // 👇️ toggle
        if (!isActive14) {
            setIsActive14(true);
            setVerhältnis("4");
            setVerhältnisNav("1:4");
            setIsActive12(false);
            setIsActive13(false);
            setIsActive11(false);
            setIsActive110(false);
            setIsActive1Edit(false);
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption110 = () => {
        // 👇️ toggle
        if (!isActive110) {
            setIsActive110(true);
            setVerhältnis("10");
            setVerhältnisNav("1:10");
            setIsActive12(false);
            setIsActive13(false);
            setIsActive14(false);
            setIsActive11(false);
            setIsActive1Edit(false);
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption1Edit = () => {

        if (!isActive1Edit) {
            setIsActive1Edit(true);
            setVerhältnisEdit("");
            setIsActive12(false);
            setIsActive14(false);
            setIsActive13(false);
            setIsActive11(false);
            setIsActive110(false);
        }

    };


    let logsomething = () => {
        console.log("Log über Fertig-Button");
        console.log(isMatchingMethode)
        console.log(isAllMatchingvariablen)
        console.log(isVollständigeDatei)
        console.log(isMatchingtoleranz)
        console.log(isFälleKontrollenGruppenindikator)
        console.log(isVerhältnis)

        //Richtige url einfügen
        fetch('http://127.0.0.1:8000/control_selection/pie_chart?groupindicator=icu_mort&controllvariables=[age,sex,duration_h]&mmethod=nearest&mdistance=glm&mreplace=TRUE&mratio=2&mcaliper=0.2&controllvariable=sex', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(isVollständigeDatei)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data:")
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    // Rest-Aufruf

    if (isEMJsonPackage !== 'defaultPackage') {
        console.log(isEMJsonPackage);
    }

    let toFunction = () => {
        if(isMatchingMethode==="Exaktes Matching"){
            return "/Matching-Ergebnis";
        }else{
            return "/MethodeScoreBerechnung";
        }
    };

    let backFunction = () => {
        if(isMatchingMethode==="Exaktes Matching"){
            return "/FälleKontrollen";
        }else{
            return "/Kontrollvariablen";
        }
    };


    function löschen(){
        setIsActive11(false);
        setIsActive12(false);
        setIsActive13(false);
        setIsActive14(false);
        setIsActive110(false);
        setIsActive1Edit(false);
        setVerhältnis("");
        setVerhältnisEdit("");

    }

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "3%", paddingLeft: "3%"}}>
                    Matching Verhältnis
                </Typography>

                <div style={{paddingLeft: "35%", align: "center"}}>
                    <div style={{display: "flex", flexFlow: "row", gap: "100px", paddingBottom: "5%"}}>

                        <Box
                            style={{

                                backgroundColor: isActive11 || isVerhältnisNav === "1:1" ? "#1d4189" : '#E8E9EB',
                                color: isActive11 || isVerhältnisNav === "1:1" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "4rem",
                                height: "4rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActive11 || isVerhältnisNav === "1:1" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOption11}
                        > 1:1
                        </Box>

                        <Box
                            style={{

                                backgroundColor: isActive12 || isVerhältnisNav === "1:2" ? "#1d4189" : '#E8E9EB',
                                color: isActive12 || isVerhältnisNav === "1:2" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "4rem",
                                height: "4rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActive12 || isVerhältnisNav === "1:2" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOption12}
                        > 1:2
                        </Box>
                    </div>

                    <div style={{display: "flex", flexFlow: "row", gap: "100px", paddingBottom: "5%"}}>

                        <Box
                            style={{

                                backgroundColor: isActive13 || isVerhältnisNav === "1:3" ? "#1d4189" : '#E8E9EB',
                                color: isActive13 || isVerhältnisNav === "1:3" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "4rem",
                                height: "4rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActive13 || isVerhältnisNav === "1:3" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOption13}
                        > 1:3
                        </Box>

                        <Box
                            style={{

                                backgroundColor: isActive14 || isVerhältnisNav === "1:4" ? "#1d4189" : '#E8E9EB',
                                color: isActive14 || isVerhältnisNav === "1:4" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "4rem",
                                height: "4rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActive14 || isVerhältnisNav === "1:4" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOption14}
                        > 1:4
                        </Box>

                    </div>
                    <div style={{display: "flex", flexFlow: "row", gap: "100px", paddingBottom: "8.5%"}}>

                        <Box
                            style={{

                                backgroundColor: isActive110 || isVerhältnisNav === "1:10" ? "#1d4189" : '#E8E9EB',
                                color: isActive110 || isVerhältnisNav === "1:10" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "4rem",
                                height: "4rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActive110 || isVerhältnisNav === "1:10" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOption110}
                        > 1:10
                        </Box>

                        <Box
                            style={{
                                backgroundColor:
                                    isActive1Edit || isVerhältnisNav === verhältnisEdit ? "#1d4189" : '#E8E9EB',
                                color: isActive1Edit || isVerhältnisNav === verhältnisEdit ? "white" : "#666666",
                                fontSize: 'large',
                                display: 'flex',
                                width: '4rem',
                                height: '4rem',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                                borderRadius: '15px',
                                boxShadow:
                                    isActive1Edit || isVerhältnisNav === verhältnisEdit ? '0px 1px 2px 0px rgba(29, 65, 137, 1), 0px 2px 6px 2px rgba(60, 64, 67, 0.15)' : '',
                            }}
                            onClick={handleClickOption1Edit}
                        >
                            1:
                            {isActive1Edit ? (
                                <input
                                    type="text"
                                    value={verhältnisEdit}
                                    onChange={(e) => {
                                        setVerhältnis(e.target.value);
                                        setVerhältnisNav("1:" + e.target.value);
                                        setVerhältnisEdit(e.target.value);
                                    }}
                                    style={{
                                        fontSize: '18px',
                                        width: '30px',
                                        textAlign: 'center',
                                        paddingTop: '4px',
                                        background: 'none',
                                        border: 'none',
                                        color: isActive1Edit || verhältnisEdit != '' ? 'white' : '#666666',
                                    }}
                                    autoFocus
                                />
                            ) : (
                                verhältnisEdit
                            )}
                        </Box>

                    </div>
                </div>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    if (isMatchingMethode === "Exaktes Matching") {
                        setWorkflow("VariableFälleKontrolle");
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
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} to={toFunction()} onClick={() => {
                    logsomething();
                    if (isMatchingMethode === "Exaktes Matching") {
                        visitedSite("ergebnisse");
                        setWorkflow("MatchingErgebnis");
                    } else {
                        visitedSite("scoremethode");
                        setWorkflow("ScoreBerechnung")
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

export default MatchingVerhältnis;
