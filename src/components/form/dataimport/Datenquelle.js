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
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import {styled} from "@mui/material/styles";
import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, FormGroup} from "@material-ui/core";


function Datenquelle() {

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

                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Datenquelle wählen:
                </Typography>

                <table style={{width: "100%", height: "100%"}}>

                    <tr style={{
                        height: "85%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                        <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box sx={{
                            display: "flex",
                            width: "15rem",
                            height: "8rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            fontSize:"large",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: "#666666"}}
                        >  <FormControlLabel control={<Checkbox defaultChecked />} label="Vom Gerät" />
                        </Box>
                        <Box sx={{
                            fontSize:"large",
                            display: "flex",
                            width: "15rem",
                            height: "8rem",
                            alignItems:"center",
                            justifyContent: "space-evenly",
                            borderRadius: "15px",
                            backgroundColor: 'rgba(211,211,211, 0.8)',
                            color: '#666666',
                        }}><FormControlLabel control={<Checkbox/>} label="DRE" />
                        </Box>
                        </FormGroup>
                    </tr>

                    <tr style={{ height: "15%", display:"flex", float:"right"}}>
                        <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                            <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                    component={Link} to='/Startseite'/>
                            <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                            <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                    component={Link} to='/Datei-hochladen'/>
                        </BottomNavigation>
                    </tr>
                </table>
            </CardContent>
        </React.Fragment>
    );
}

export default Datenquelle;
