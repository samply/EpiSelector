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

function MatchingVerhältnis({setVerhältnis}) {

    const [isActive11, setIsActive11] = useState(false);
    const [isActive12, setIsActive12] = useState(false);
    const [isActive13, setIsActive13] = useState(false);
    const [isActive14, setIsActive14] = useState(false);
    const [isActive110, setIsActive110] = useState(false);
    const [isActive1Edit, setIsActive1Edit] = useState(false);

    const handleClickOption11 = () => {
        // 👇️ toggle
        if (!isActive12 && !isActive13 && !isActive14 && !isActive110 && !isActive1Edit) {
            setIsActive11(current => !current);
            setVerhältnis("1:1");
        }

        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption12 = () => {
        // 👇️ toggle
        if (!isActive11 && !isActive13 && !isActive14 && !isActive110 && !isActive1Edit) {
            setIsActive12(current => !current);
            setVerhältnis("1:2");
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption13 = () => {
        // 👇️ toggle
        if (!isActive11 && !isActive12 && !isActive14 && !isActive110 && !isActive1Edit) {
            setIsActive13(current => !current);
            setVerhältnis("1:3");
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption14 = () => {
        // 👇️ toggle
        if (!isActive11 && !isActive12 && !isActive13 && !isActive110 && !isActive1Edit) {
            setIsActive14(current => !current);
            setVerhältnis("1:4");
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption110 = () => {
        // 👇️ toggle
        if (!isActive11 && !isActive12 && !isActive13 && !isActive14 && !isActive1Edit) {
            setIsActive110(current => !current);
            setVerhältnis("1:10");
        }
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOption1Edit = () => {
        // 👇️ toggle
        if (!isActive11 && !isActive12 && !isActive13 && !isActive14 && !isActive110) {
            setIsActive1Edit(current => !current);
            setVerhältnis("1:X");
        }
        // 👇️ or set to true
        // setIsActive(true);
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
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}>
                    Matching Verhältnis
                </Typography>
                <br/> <br/>
<div style={{paddingLeft:"35%", align:"center"}}>
              <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive11 ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive11 ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive11 ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption11}
                            > 1:1
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive12 ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive12 ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive12 ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption12}
                            > 1:2
                            </Box>
            </div>

                <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive13 ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive13 ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive13 ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption13}
                            > 1:3
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive14 ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive14 ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive14 ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption14}
                            > 1:4
                            </Box>

                </div>
                <div style={{display:"flex", flexFlow:"row", gap:"100px", paddingBottom:"5%"}}>

                            <Box
                                style={{

                                    backgroundColor: isActive110 ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive110 ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive110 ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption110}
                            > 1:10
                            </Box>

                            <Box
                                style={{

                                    backgroundColor: isActive1Edit ? "#1d4189" : 'rgba(211,211,211, 0.8)',
                                    color: isActive1Edit ? "white" : "#666666",
                                    fontSize: "large",
                                    display: "flex",
                                    width: "4rem",
                                    height: "4rem",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActive1Edit ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOption1Edit}
                            > 1:__
                            </Box>
                </div>
</div>
                <br/>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/Kontrollvariablen'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen} ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/MethodeScoreBerechnung' onClick={()=>visitedSite("scoremethode")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

            </CardContent>
    );
}

export default MatchingVerhältnis;
