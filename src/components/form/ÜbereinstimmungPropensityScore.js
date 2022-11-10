import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {TextField} from "@material-ui/core";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useState} from "react";


function ÜbereinstimmungPropensityScore({setÜbereinstimmungswert}) {

    const [isWert, setWert] = useState(0);


    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching
            </Typography>

            <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}} >
                Bereich der Übereinstimmung der Propensity-Scores (Caliper)
            </Typography>

            <Typography sx={{fontSize: 15, paddingTop:"5%", paddingLeft:"3%"}}>
                Geben Sie einen Wert zwischen 0 und 1 an:
            </Typography>

           <div style={{display:"flex", flexFlow:"row", gap:"1%", justifyContent:"center", paddingTop:"3%", paddingBottom:"20%"}}>
               <Typography sx={{fontSize: 25}}>±</Typography>
               <TextField defaultValue="0.2" label="Übereinstimmungswert" variant="outlined" onChange={(event) => {if(event.target.value <= 1 && event.target.value >=0){setÜbereinstimmungswert(event.target.value);} setWert(event.target.value);  }}
                          error={isWert>1 || isWert <0}
                          required="true"
               />

           </div>

            <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"46%"}}>
                <Link style={{textDecoration: "none"}} to='/MatchingAlgorithmus'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                <Link style={{textDecoration: "none"}} to='/Matching-Ergebnis' onClick={()=>visitedSite("ergebnisse")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Ergebnisse <ArrowForwardIcon/></Button></Link>

            </div>

        </CardContent>
    );

}

export default ÜbereinstimmungPropensityScore;
