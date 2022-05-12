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


function MethodeScoreBerechnung() {


    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Methode der Score Berechnung
                </Typography>
            </CardContent>
        </React.Fragment>
    );
}

export default MethodeScoreBerechnung;