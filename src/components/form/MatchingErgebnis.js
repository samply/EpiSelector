import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Card from "@mui/material/Card";

function MatchingErgebnis() {

    const [value, setValue] = React.useState(2);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>

                       <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Matching Ergebnis
                        </Typography>


                            hier kommen die Ergebnisse
<br/><br/><br/>
                <div style={{ height: "15%", display:"flex", float:"right"}}>
                            <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                                setValue(newValue);
                            }}>
                                <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link}
                                                        to='/ÜbereinstimmungPropensityScore'/>
                                <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                                <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon/>} component={Link}
                                                        to='/Dataexport'/>
                            </BottomNavigation>
            </div>

            </CardContent>
    );
}

export default MatchingErgebnis;
