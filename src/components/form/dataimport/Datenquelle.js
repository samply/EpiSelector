import '../../../App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


function Datenquelle() {

    const [value, setValue] = React.useState(0);

    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Datenquelle wählen:
                </Typography>

                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
                    <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Startseite' />
                    <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
                    <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Datei-hochladen' />
                </BottomNavigation>

            </CardContent>
        </React.Fragment>
    );
}

export default Datenquelle;
