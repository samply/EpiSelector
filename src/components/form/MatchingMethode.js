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
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BottomNavigation from "@mui/material/BottomNavigation";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";

function MatchingMethode() {

    const [value, setValue] = React.useState(2);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    return (
        <React.Fragment className="Mainpage">
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Matching Methode
                </Typography>
                <table style={{width: "100%", height: "100%"}}>

                    <tr style={{
                        height: "85%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                        <Box sx={{
                            display: "flex",
                            width: "15rem",
                            height: "8rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: "#666666",
                        }}>Matching nach  <br/> ausgewählten Variablen</Box>
                        <Box sx={{
                            display: "flex",
                            width: "15rem",
                            height: "8rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: "#666666",
                        }}>Propensityscore Matching</Box>
                        <Box sx={{
                            display: "flex",
                            width: "15rem",
                            height: "8rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: "#666666",
                        }}>Zufallsprinzip</Box>
                    </tr>

                    <tr style={{ height: "15%", display:"flex", justifyContent:"flex-end"}}>
                        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                            setValue(newValue); }}>
                            <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Datei-hochladen'/>
                                <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
                                <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Matching-Variablen' />
                            </BottomNavigation>
                    </tr>
                    </table>
            </CardContent>
        </React.Fragment>
    );
}

export default MatchingMethode;
