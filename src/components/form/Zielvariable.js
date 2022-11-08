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
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";


function Zielvariable({setZielvariable}) {

    const [value, setValue] = React.useState(2);

    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

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

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
        setZielvariable(selectedRowsData[0].variable);
    };


    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}>
                    Zielvariable
                </Typography>
<br/>
                <DataGrid
                    sx={{display:"flex", width:"55%",height:"60%", alignSelf:"center", marginLeft:"23%", marginBottom:"2%"}}
                    rows={rows}
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    hideColumnsHeader
                    headerHeight={0}

                />
<br/>
                <div style={{ height: "15%", display:"flex", float:"right"}}>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/Matching-Methode'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/Kontrollvariablen'/>
                    </BottomNavigation>
                </div>

            </CardContent>
    );
}

export default Zielvariable;
