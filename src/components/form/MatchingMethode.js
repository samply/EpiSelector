import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {FormGroup} from "@material-ui/core";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";


function MatchingMethode({setMatchingMethode, isMatchingMethode}) {

    const [isActiveAusgVar, setIsActiveAusgVar] = useState(false);
    const [isActivePropS, setIsActivePropS] = useState(false);
    const [isActiveZufallsP, setIsActiveZufallsP] = useState(false);

    const handleClickOptionAusgVar = () => {
        if (!isActiveAusgVar) {
            setIsActiveAusgVar(true);
            setMatchingMethode('Exaktes Matching');
            setIsActiveZufallsP(false);
            setIsActivePropS(false);
        }

    };

    const handleClickOptionPropS = () => {
        if (!isActivePropS) {
            setIsActivePropS(true);
            setMatchingMethode('Propensity Score');
            setIsActiveZufallsP(false);
            setIsActiveAusgVar(false);
        }

    };

    const handleClickOptionZufallsP = () => {
        if (!isActiveZufallsP) {
            setIsActiveZufallsP(true);
            setMatchingMethode('Zufallsprinzip');
            setIsActivePropS(false);
            setIsActiveAusgVar(false);
        }

    };

    function löschen(){
        setMatchingMethode('defaultMethode');
        setIsActiveAusgVar(false);
        setIsActivePropS(false);
        setIsActiveZufallsP(false);
    }
    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"8%", paddingLeft:"3%"}} >
                    Matching Methode
                </Typography>

                <div style={{
                    minHeight: "80%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingBottom:"14%"
                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"25px"}}>
                        <Box
                            style={{
                                backgroundColor: isActiveAusgVar || isMatchingMethode ==="Exaktes Matching" ? "#1d4189" : '#E8E9EB',
                                color: isActiveAusgVar || isMatchingMethode ==="Exaktes Matching" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveAusgVar || isMatchingMethode ==="Exaktes Matching" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionAusgVar}
                        > Matching nach <br/> ausgewählten Variablen
                        </Box>

                        <Box
                            style={{
                                backgroundColor: isActivePropS || isMatchingMethode ==="Propensity Score" ? "#1d4189" : '#E8E9EB',
                                color: isActivePropS || isMatchingMethode ==="Propensity Score" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActivePropS || isMatchingMethode ==="Propensity Score" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionPropS}
                        > Propensityscore Matching
                        </Box>

                        <Box
                            style={{
                                backgroundColor: isActiveZufallsP || isMatchingMethode ==="Zufallsprinzip" ? "#1d4189" : '#E8E9EB',
                                color: isActiveZufallsP || isMatchingMethode ==="Zufallsprinzip" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveZufallsP || isMatchingMethode ==="Zufallsprinzip" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionZufallsP}
                        > Zufallsprinzip
                        </Box>
                    </FormGroup>
                </div>

                <div style={{ display:"flex", height: "8%", float:"right", gap:"3%", width:"42%",marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to='/Datei-hochladen'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Zielvariable' onClick={()=>visitedSite("zielvariable")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

        </CardContent>
        </Card>
    );
}

export default MatchingMethode;
