import '../../App.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {Link} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { DataGrid } from '@mui/x-data-grid';


function Zielvariable() {

    const [value, setValue] = React.useState(2);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'variable', headerName: 'Variable', width: 130 },
        { field: 'variableFullname', headerName: 'Bedeutung', width: 200 },

    ];

    const rows = [
        { id: 1, variable: 'encid', variableFullname: 'encounter-ID' },
        { id: 2, variable: '_intime', variableFullname: 'Aufnahmedatum' },
        { id: 3, variable: '_outtime', variableFullname: 'Entlassdatum'},
        { id: 4, variable: 'sepsis_jn', variableFullname: 'Sepsis JN' },
        { id: 5, variable: 'sepsistime', variableFullname: 'Sepsis Zeit' },
        { id: 6, variable: 'gender', variableFullname: 'Geschlecht'},
        { id: 7, variable: 'age', variableFullname: 'Alter' },
        { id: 8, variable: 'height', variableFullname: 'Größe' },
        { id: 9, variable: 'weight', variableFullname: 'Gewicht' },
    ];


    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Zielvariable
                </Typography>
<br/>
                <DataGrid
                    sx={{display:"flex", width:"55%",height:"75%", alignSelf:"center", marginLeft:"10%"}}
                    rows={rows}
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                    checkboxSelection
                />
<br/>
                <div style={{ height: "15%", display:"flex", float:"right"}}>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/Zielvariable'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/Kontrollvariablen'/>
                    </BottomNavigation>
                </div>

            </CardContent>
    );
}

export default Zielvariable;
