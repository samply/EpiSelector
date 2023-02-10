import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import MatchingMethode from "./MatchingMethode";

function MatchingVerhältnis({setVerhältnis, isVerhältnis, isMatchingMethode}) {

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

        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption13 = () => {
        // 👇️ toggle
        if (!isActive13) {
            setIsActive13(true);
            setVerhältnis("3");
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
        // 👇️ toggle
        if (!isActive1Edit) {
            setIsActive1Edit(true);
            setVerhältnis("X");
            setIsActive12(false);
            setIsActive13(false);
            setIsActive14(false);
            setIsActive110(false);
            setIsActive11(false);
        }
        // 👇️ or set to true
        // setIsActive(true);
    };

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
        setVerhältnis("defaultVerhältnis");
    }

    return (
        <Card sx={{width:"100%",borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"3%", paddingLeft:"3%"}}>
                    Matching Verhältnis
                </Typography>

<div style={{paddingLeft:"35%", align:"center"}}>
              <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive11 || isVerhältnis ==="1:1" ? "#1d4189" : '#E8E9EB',
                                    color: isActive11 || isVerhältnis ==="1:1" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive11 || isVerhältnis ==="1:1" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption11}
                            > 1:1
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive12 || isVerhältnis ==="1:2" ? "#1d4189" : '#E8E9EB',
                                    color: isActive12 || isVerhältnis ==="1:2" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive12 || isVerhältnis ==="1:2" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption12}
                            > 1:2
                            </Box>
            </div>

                <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive13 || isVerhältnis ==="1:3" ? "#1d4189" : '#E8E9EB',
                                    color: isActive13 || isVerhältnis ==="1:3" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive13 || isVerhältnis ==="1:3" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption13}
                            > 1:3
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive14|| isVerhältnis ==="1:4" ? "#1d4189" : '#E8E9EB',
                                    color: isActive14 || isVerhältnis ==="1:4" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive14 || isVerhältnis ==="1:4" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption14}
                            > 1:4
                            </Box>

                </div>
                <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"8.5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive110 || isVerhältnis ==="1:10" ? "#1d4189" : '#E8E9EB',
                                    color: isActive110 || isVerhältnis ==="1:10" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive110 || isVerhältnis ==="1:10" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption110}
                            > 1:10
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive1Edit || isVerhältnis ==="1:X" ? "#1d4189" : '#E8E9EB',
                                    color: isActive1Edit || isVerhältnis ==="1:X" ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive1Edit || isVerhältnis ==="1:X" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption1Edit}
                            > 1:__
                            </Box>
                </div>
</div>


                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to={backFunction()}><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen} ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}}  to={toFunction()} onClick={()=> {
                        if(isMatchingMethode==="Exaktes Matching"){  visitedSite("ergebnisse")}else{visitedSite("scoremethode")}
                    }}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>
                </div>

            </CardContent>
        </Card>
    );
}

export default MatchingVerhältnis;
