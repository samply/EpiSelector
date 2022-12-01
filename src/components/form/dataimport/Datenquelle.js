import '../../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import {styled} from "@mui/material/styles";
import {FormGroup} from "@material-ui/core";
import { useState} from 'react';
import {visitedSite} from '../../NavB';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {hover} from "@testing-library/user-event/dist/hover";

function Datenquelle({setDatenquelle}) {

    const [isActiveDRE, setIsActiveDRE] = useState(false);
    const [isActiveGeraet, setIsActiveGeraet] = useState(false);

    function handleClickOptionGeraet(){
        if(!isActiveDRE){
            setIsActiveGeraet(current => !current);
            setDatenquelle("Gerät");
        }

    }

    function handleClickOptionDRE () {
        if(!isActiveGeraet){
        setIsActiveDRE(current => !current);
        setDatenquelle("DRE");}
    }

    function löschen(){
        setDatenquelle('defaultQuelle');
        setIsActiveDRE(false);
        setIsActiveGeraet(false);
    }

    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>

                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}} >
                    Datenquelle wählen
                </Typography>
                <div style={{width: "100%", height: "75%"}}>
                    <div style={{
                        height: "70%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom:"7%"
                    }}>
                        <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionGeraet}
                            style={{
                                backgroundColor: isActiveGeraet? "#1d4189":'rgba(211,211,211, 0.8)',
                                color: isActiveGeraet? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveGeraet ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                        > Vom Gerät
                        </Box>
                            <Box
                               style={{
                                    backgroundColor: isActiveDRE? "#1d4189":'rgba(211,211,211, 0.8)',
                                    color: isActiveDRE? "white":"#666666",
                                    fontSize:"large",
                                    display: "flex",
                                    width: "15rem",
                                    height: "8rem",
                                    alignItems:"center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActiveDRE ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOptionDRE}
                            > DRE
                            </Box>
                        </FormGroup>
                    </div>
                </div> <br/>
                    <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"35%"}}>
                            <Link style={{textDecoration: "none"}} to='/Startseite'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                            <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined"onClick={löschen}> <DeleteIcon/>Löschen</Button>
                            <Link style={{textDecoration: "none"}} to='/Datei-hochladen' onClick={()=>visitedSite("dateihochladen")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                    </div>

            </CardContent>
    );

}

export default Datenquelle;
