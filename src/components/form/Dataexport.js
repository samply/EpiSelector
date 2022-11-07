import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';


function Dataexport() {
    const [value, setValue] = React.useState(2);

    return (
        <CardContent sx={{width: "200%"}}>
            <table sx={{width: "300%"}}>
                <tbody>
                <tr>
                    <td>
                        <div sx={{height: "20%"}}>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                              Datenexport
                            </Typography></div>
                        <div
                            sx={{display: "flex", flexFlow: "row", width: "300%", height: "80%", border: "bold solid"}}>
                            <Button>
                                <SimCardDownloadIcon sx={{fontSize: "xxx-large"}}/> Matchingprotokoll <br/>herunterladen
                            </Button>
                            <Button>
                                <CollectionsBookmarkIcon sx={{fontSize: "xxx-large"}}/> Daten in DRE speichern
                            </Button>
                            <Button>
                                <DashboardIcon sx={{fontSize: "xxx-large"}}/>Maske speichern
                            </Button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>

            <div sx={{height: "20%"}}><br/>
                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                    <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link}
                                            to='/Matching-Ergebnis'/>
                    <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                    <BottomNavigationAction label="Beenden" icon={<DoneAllIcon/>} component={Link} to='/Startseite'/>
                </BottomNavigation>
            </div>
        </CardContent>
    );
}

export default Dataexport;
