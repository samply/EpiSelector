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
import {useState} from 'react';
import Form from '../../../model/Form'

function Datenquelle() {
    const [isActiveDRE, setIsActiveDRE] = useState(false);
    const [isActiveGeraet, setIsActiveGeraet] = useState(false);

    const handleClickOptionGeraet = () => {
        // 👇️ toggle
        if(!isActiveDRE){
            setIsActiveGeraet(current => !current);
        }
        Form.state.datenquelle = "vom Gerät";
        // 👇️ or set to true
        // setIsActive(true);
    };
    const handleClickOptionDRE = () => {
        // 👇️ toggle
        if(!isActiveGeraet){
            setIsActiveDRE(current => !current);
        }
        Form.state.datenquelle = "DRE";

        // 👇️ or set to true
        // setIsActive(true);
    };

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
                        <Box
                            style={{

                                backgroundColor: isActiveGeraet? "#1d4189":'rgba(211,211,211, 0.8)',
                                color: isActiveGeraet? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveGeraet ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionGeraet}
                        > Vom Gerät
                        </Box>
                            <Box
                                style={{
                                    backgroundColor: isActiveDRE? "#1d4189":'rgba(211,211,211, 0.8)',
                                    color: isActiveDRE? "white":"#666666",
                                    fontSize:"large",
                                    display: "flex",
                                    width: "15rem",
                                    height: "8rem",
                                    alignItems:"center",
                                    justifyContent: "space-evenly",
                                    borderRadius: "15px",
                                    boxShadow: isActiveDRE ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                }}
                                onClick={handleClickOptionDRE}
                            > DRE
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
