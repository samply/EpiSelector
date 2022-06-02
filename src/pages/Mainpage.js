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
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BottomNavigation from "@mui/material/BottomNavigation";

function Mainpage() {
    const [value, setValue] = React.useState(0);


    return (
        <React.Fragment className="Mainpage">
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
            </CardContent>
            <CardActions>


                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
                    <BottomNavigationAction label="Starte Beobachtungsstudien-Assistents" icon={<PlayCircleFilledIcon />} component={Link} to='/Datenquelle' />
                </BottomNavigation>

            </CardActions>
        </React.Fragment>
    );
}

export default Mainpage;
