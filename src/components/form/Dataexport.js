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
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";


function Dataexport() {
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
                Datenexport
            </Typography>
    <div style={{display:"flex", justifyContent:"center", paddingTop:"10%", paddingBottom:"21%"}}>

                        <div sx={{display: "flex", flexFlow: "row", width: "100%", height: "80%", border: "bold solid", justifyContent:"space-evenly"}}>
                            <Button style={{flexFlow:"column"}}>
                                <SimCardDownloadIcon sx={{fontSize: "xxx-large"}}/> Matchingprotokoll <br/>herunterladen
                            </Button>
                            <Button style={{flexFlow:"column"}}>
                                <CollectionsBookmarkIcon sx={{fontSize: "xxx-large"}}/> Daten in DRE speichern
                            </Button>
                            <Button style={{flexFlow:"column"}}>
                                <DashboardIcon sx={{fontSize: "xxx-large"}}/>Maske speichern
                            </Button>
                        </div>
    </div>

            <div style={{ height: "5%", display:"flex", float:"right"}}>
                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                    <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link}
                                            to='/Matching-Ergebnis'/>
                    <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                    <BottomNavigationAction label="Beenden" icon={<DoneAllIcon/>} component={Link} to='/Startseite' />
                </BottomNavigation>
            </div>
        </CardContent>
    );
}

export default Dataexport;
