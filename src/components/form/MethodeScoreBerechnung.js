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

    function löschen(){
        setIsActiveLR(false);
        setIsActiveML(false);
        setScoreMethode('defaultScoreMethode');
    }

    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

            <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"8%", paddingLeft:"3%"}}>
                Methode der Score-Berechnung
            </Typography>

            <div style={{width: "100%", height: "75%"}}>
                <div style={{
                    height: "85%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingBottom:"14%"

                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionLR}
                             style={{
                                 backgroundColor: isActiveLR? "#1d4189":'#E8E9EB',
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
                                backgroundColor: isActiveML? "#1d4189":'#E8E9EB',
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
                </div>
            </div>

            <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                <Link style={{textDecoration: "none"}} to='/Matching-Verhältnis'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen} ><DeleteIcon/>Löschen</Button>
                <Link style={{textDecoration: "none"}} to='/MatchingAlgorithmus' onClick={()=>visitedSite("algorithmus")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

            </div>

        </CardContent>
        </Card>
    );

}

export default MethodeScoreBerechnung;
