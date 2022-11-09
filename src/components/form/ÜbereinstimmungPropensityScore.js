import '../../App.css';
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
import {FormGroup, TextField} from "@material-ui/core";
import { useState} from 'react';
import {visitedSite} from "../NavB";

function ÜbereinstimmungPropensityScore({setÜbereinstimmungswert}) {

    const [isValue, setValue] = React.useState(2);



    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

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
               <TextField id="outlined-basic" label="0.2" variant="outlined" onChange={(event) => {setÜbereinstimmungswert(event.target.value);}} />
           </div>


            <div style={{ height: "15%", display:"flex", float:"right"}}>
                    <BottomNavigation showLabels value={isValue} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/MatchingAlgorithmus'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Ergebnisse" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/Matching-Ergebnis' onClick={()=>visitedSite("ergebnisse")}/>
                    </BottomNavigation>
                </div>
        </CardContent>
    );

}

export default ÜbereinstimmungPropensityScore;
