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

function Matchingtoleranz() {

    const [value, setValue] = React.useState(0);


    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matchingtoleranz
                </Typography>

                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
                    <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Matching-Variablen'/>
                    <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
                    <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Variablen-Fälle-Kontrollen' />
                </BottomNavigation>

            </CardContent>
        </React.Fragment>
    );
}

export default Matchingtoleranz;
