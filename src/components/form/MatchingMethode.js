import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BottomNavigation from "@mui/material/BottomNavigation";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import {useState} from "react";
import {FormGroup} from "@material-ui/core";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function MatchingMethode({setMatchingMethode}) {

    const [isActiveAusgVar, setIsActiveAusgVar] = useState(false);
    const [isActivePropS, setIsActivePropS] = useState(false);
    const [isActiveZufallsP, setIsActiveZufallsP] = useState(false);

    const handleClickOptionAusgVar = () => {
        if (!isActivePropS && !isActiveZufallsP) {
            setIsActiveAusgVar(current => !current);
            setMatchingMethode('Exaktes Matching');
        }

    };

    const handleClickOptionPropS = () => {
        if (!isActiveAusgVar && !isActiveZufallsP) {
            setIsActivePropS(current => !current);
            setMatchingMethode('Propensity Score');
        }

    };

    const handleClickOptionZufallsP = () => {
        if (!isActiveAusgVar && !isActivePropS) {
            setIsActiveZufallsP(current => !current);
            setMatchingMethode('Zufallsprinzip');
        }

    };

    function löschen(){
        setMatchingMethode('defaultMethode');
        setIsActiveAusgVar(false);
        setIsActivePropS(false);
        setIsActiveZufallsP(false);
    }
    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching
            </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}} >
                    Matching Methode
                </Typography>

            <table style={{width: "100%", height: "75%"}}>
                <tbody>
                <tr style={{
                    height: "80%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingBottom:"5%"
                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"25px"}}>
                        <Box
                            style={{
                                backgroundColor: isActiveAusgVar ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                color: isActiveAusgVar ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveAusgVar ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionAusgVar}
                        > Matching nach <br/> ausgewählten Variablen
                        </Box>

                        <Box
                            style={{
                                backgroundColor: isActivePropS ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                color: isActivePropS ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActivePropS ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionPropS}
                        > Propensityscore Matching
                        </Box>

                        <Box
                            style={{
                                backgroundColor: isActiveZufallsP ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                color: isActiveZufallsP ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveZufallsP ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionZufallsP}
                        > Zufallsprinzip
                        </Box>
                    </FormGroup>
                </tr>
                </tbody>
            </table>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/Datei-hochladen'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Zielvariable' onClick={()=>visitedSite("zielvariable")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

        </CardContent>
    );
}

export default MatchingMethode;
