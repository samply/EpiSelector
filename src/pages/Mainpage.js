import '../App.css';
import MainpageNav from "../components/MainpageNav";
import {Link} from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Mainpage() {
    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
            </CardContent>
            <CardActions>
                <Link to='/Datenquelle'>
                    <button>Starte Beobachtungsassistent</button>
                </Link>
            </CardActions>
        </React.Fragment>
    );
}

export default Mainpage;
