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
import {FormGroup} from "@material-ui/core";
import { useState} from 'react';

function ÜbereinstimmungPropensityScore({setÜbereinstimmung}) {

    const [value, setValue] = React.useState(2);
    const [isActiveDRE, setIsActiveDRE] = useState(false);


    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Bereich der Übereinstimmung der Propensity-Scores (Caliper)
            </Typography>


                <div style={{ height: "15%", display:"flex", float:"right"}}>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/MatchingAlgorithmus'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/Matching-Ergebnis'/>
                    </BottomNavigation>
                </div>
        </CardContent>
    );

}

export default ÜbereinstimmungPropensityScore;
