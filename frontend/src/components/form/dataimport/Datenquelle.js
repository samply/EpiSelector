import '../../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {FormGroup} from "@material-ui/core";
import { useState} from 'react';
import {visitedSite} from '../../NavB';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";


function Datenquelle({setDatenquelle, isDatenquelle, setWorkflow}) {

    const [isActiveDRE, setIsActiveDRE] = useState(false);
    const [isActiveGeraet, setIsActiveGeraet] = useState(false);

    const [isAuswahl, setAuswahl] = useState('');

    function handleClickOptionGeraet(){
        if(!isActiveGeraet ){
            setIsActiveGeraet(true);
            setDatenquelle("Gerät");
            setIsActiveDRE(false);
        }

    }

    function handleClickOptionDRE () {
        if(!isActiveDRE){
        setIsActiveDRE(true);
        setDatenquelle("DRE");}
        setIsActiveGeraet(false);
    }

    function löschen(){
        setDatenquelle('defaultQuelle');
        setIsActiveDRE(false);
        setIsActiveGeraet(false);
    }

    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
        <CardHeader
            title="Matching"
            titleTypographyProps={{fontSize:14, color:"text.secondary"}}
            sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"8%", paddingLeft:"3%"}} >
                    Datenquelle wählen
                </Typography>
                    <div style={{
                        minHeight: "80%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom:"14%"
                    }}>
                        <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionGeraet}
                             title="Laden Sie Ihre Daten Local aus Ihrem Rechner hoch."
                             style={{
                                backgroundColor: isActiveGeraet || isDatenquelle==="Gerät" ? "#1d4189":'#E8E9EB',
                                color: isActiveGeraet || isDatenquelle==="Gerät" ? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveGeraet || isDatenquelle==="Gerät" ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                        > Vom Gerät
                        </Box>
                            <Box style={{
                                backgroundColor: isActiveDRE || isDatenquelle === "DRE" ? "#1d4189" : '#E8E9EB',
                                color: isActiveDRE || isDatenquelle === "DRE" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveDRE || isDatenquelle === "DRE" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                pointerEvents: isActiveDRE || isDatenquelle === "DRE" ? "auto" : "none",
                                opacity: isActiveDRE || isDatenquelle === "DRE" ? 1 : 0.5,
                            }}
                        >
                            DRE
                        </Box>

                        </FormGroup>
                    </div>

                    <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                            <Link style={{textDecoration: "none"}} to='/Startseite' onClick={()=>{setWorkflow("Startseite");}}><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                            <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined"onClick={löschen}> <DeleteIcon/>Löschen</Button>
                            <Link style={{textDecoration: "none"}} to='/Datei-hochladen' onClick={()=>{visitedSite("dateihochladen"); setWorkflow("Datei-hochladen");}}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                    </div>

            </CardContent>
        </Card>
    );

}

export default Datenquelle;
