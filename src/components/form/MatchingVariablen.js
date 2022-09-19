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
import { DataGrid } from '@mui/x-data-grid';
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import UploadData from "./dataimport/UploadData";


/*
const rows= UploadData.getTableRows();
*/

const columns = [
    { field: 'variable', headerName: 'Variable', width: 400 },
];

const rows = [
    { id: 1, variable: 'Variable XYZ'},
    { id: 2, variable: 'Variable XYZ'},
    { id: 3, variable: 'Variable XYZ'},
    { id: 4, variable: 'Variable XYZ'},
    { id: 5, variable: 'Variable XYZ'},
    { id: 6, variable: 'Variable XYZ'},
    { id: 7, variable: 'Variable XYZ'},
    { id: 8, variable: 'Variable XYZ'},
    { id: 9, variable: 'Variable XYZ'},
];

function MatchingVariablen(){
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
                    Matchingvariablen
                </Typography>

                {/*-------------------------*/}
                <br/>

                    <div style={{display:"flex",  height: 330, width: '60%', paddingLeft:"20%", alignItems:"center", justifyItems:"center", justifyContent:"space-evenly", alignSelf:"center", alignContent:"center" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>

                {/*-------------------------*/}

                <br/>
                <div style={{ width:"100%",height:"100%", display:"flex", justifyContent:"flex-end"}}>
                    <br/><br/>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link}
                                                to='/Datenquelle'/>
                        <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon/>} component={Link}
                                                to='/Matchingtoleranz'/>
                    </BottomNavigation>
                </div>
            </CardContent>
        </React.Fragment>
    );
}

export default MatchingVariablen;
