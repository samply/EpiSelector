import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {DataGrid} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Card from "@mui/material/Card";
import {useState} from "react";
import {FormGroup} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function MethodeScoreBerechnung({setScoreMethode}) {

    const [isActiveML, setIsActiveML] = useState(false);
    const [isActiveLR, setIsActiveLR] = useState(false);

    function handleClickOptionLR(){
        if(!isActiveML){
            setIsActiveLR(current => !current);
            setScoreMethode("logistischeRegression");
        }

    }

    function handleClickOptionML () {
        if(!isActiveLR){
            setIsActiveML(current => !current);
            setScoreMethode("MatchingLearningMethode");}


    }


    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching
            </Typography>
            <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}>
                Methode der Score-Berechnung
            </Typography>

            <table style={{width: "100%", height: "75%"}}>
                <tbody>
                <tr style={{
                    height: "85%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionLR}
                             style={{
                                 backgroundColor: isActiveLR? "#1d4189":'rgba(211,211,211, 0.8)',
                                 color: isActiveLR? "white":"#666666",
                                 fontSize:"large",
                                 display: "flex",
                                 width: "15rem",
                                 height: "8rem",
                                 alignItems:"center",
                                 justifyContent: "space-evenly",
                                 borderRadius: "15px",
                                 boxShadow: isActiveLR ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                             }}
                        > Logistische Regression
                        </Box>
                        <Box
                            style={{
                                backgroundColor: isActiveML? "#1d4189":'rgba(211,211,211, 0.8)',
                                color: isActiveML? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveML ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionML}
                        > Matching Learning Methode
                        </Box>
                    </FormGroup>
                </tr>
                </tbody></table>

            <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                <Link style={{textDecoration: "none"}} to='/Matching-Verhältnis'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                <Link style={{textDecoration: "none"}} to='/MatchingAlgorithmus' onClick={()=>visitedSite("algorithmus")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

            </div>

        </CardContent>
    );

}

export default MethodeScoreBerechnung;
