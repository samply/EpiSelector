import '../../App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function MatchingErgebnis() {
    const [value, setValue] = React.useState(2);


    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <table>
                <tr><Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching Ergebnis
                </Typography>
                </tr>
    <tr sx={{width:"200%", height:"80%", backgroundColor:"red"}}>
        hier kommen die Ergebnisse
    </tr>
    <tr>
        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
            <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Matching-Verhältnis'/>
            <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
            <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Dataexport' />
        </BottomNavigation>

    </tr>
</table>

            </CardContent>
        </React.Fragment>
    );
}

export default MatchingErgebnis;
