import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {visitedSite} from "../NavB";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";


function Dataexport({setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setScoreMethode, setAlgorithmus,setErsetzung, setÜbereinstimmungswert, setDisclaimer}){

    const deleteAllData = () => {
        setDatenquelle("defaultQuelle");
        setDatei("defaultQuelle");
        setMatchingMethode("defaultMethode");
        setZielvariable("defaultZielvariable");
        setKontrollvariablen("defaultKontrollvariablen");
        setVerhältnis("defaultVerhältnis");
        setScoreMethode("defaultScoreMethode");
        setAlgorithmus("defaultAlgo");
        setErsetzung("defaultErsetz");
        setÜbereinstimmungswert("defaultÜberinstimmungswert");
    };

    setDisclaimer(false);


    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"4%", paddingLeft:"3%"}} >
                Datenexport
            </Typography>

                <div style={{display:"flex", justifyContent:"center", paddingTop:"5%", paddingBottom:"15%"}}>

                        <div sx={{display: "flex", flexFlow: "row", width: "100%", height: "80%", border: "bold solid", justifyContent:"space-evenly"}}>
                            <Button style={{flexFlow:"column"}}>
                                <SimCardDownloadIcon sx={{fontSize: "xxx-large"}}/> Matchingprotokoll <br/>herunterladen
                            </Button>
                            <Button style={{flexFlow:"column"}}>
                                <CollectionsBookmarkIcon sx={{fontSize: "xxx-large"}}/> Daten in DRE speichern
                            </Button>
                            <Button style={{flexFlow:"column"}}>
                                <DashboardIcon sx={{fontSize: "xxx-large"}}/>Maske speichern
                            </Button>
                        </div>
                </div>

            <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"43%", marginRight:"3%"}}>
                <Link style={{textDecoration: "none"}} to='/Matching-Ergebnis'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                <Button onClick={deleteAllData} sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                <Link style={{textDecoration: "none"}} onClick={deleteAllData} to='/Startseite' ><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled"><DoneAllIcon/>Beenden </Button></Link>

            </div>


        </CardContent>
        </Card>
    );
}

export default Dataexport;
