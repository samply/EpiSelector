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


function MatchingVerhältnis() {
    const [value, setValue] = React.useState(2);


    return (
        <React.Fragment className="Mainpage">
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching Verhältnis
                </Typography>

                <table style={{width: "100%", height: "100%"}}>

                    <tr style={{
                        height: "25%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:1</Box>
                        <Box sx={{
                            fontSize:"large",
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:2</Box>
                    </tr>
                    <tr style={{
                        height: "25%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:3</Box>
                        <Box sx={{
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:4</Box>
                    </tr>
                    <tr style={{
                        height: "25%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom:'5%'
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:10</Box>
                        <Box sx={{
                            display: "flex",
                            width: "4rem",
                            height: "4rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            border: "solid lightgrey",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: 'white',
                        }}>1:___</Box>

                    </tr>
                    <tr style={{ width:"100%",height:"20%", display:"flex", justifyContent:"flex-end", alignSelf:"flex-end"}}>
                        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                            setValue(newValue);
                        }} sx={{
                            display: "flex",
                            flexFlow: "right",
                            float: "right",
                            width: "40%"
                        }}>
                            <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Variablen-Fälle-Kontrollen'/>
                            <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
                            <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Matching-Ergebnis' />
                        </BottomNavigation>
                    </tr></table>
            </CardContent>
        </React.Fragment>
    );
}

export default MatchingVerhältnis;
