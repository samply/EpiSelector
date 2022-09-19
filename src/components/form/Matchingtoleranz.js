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
import {DataGrid} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";


const columns = [
    { field: 'variable', headerName: 'Variable', width: 200 },
    { field: 'toleranzwert', headerName: 'Toleranzwert', width: 200 },

];


const rows = [
    { id: 1, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 2, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 3, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 4, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 5, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 6, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 7, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 8, variable: 'Variable XYZ', toleranzwert: ''},
    { id: 9, variable: 'Variable XYZ', toleranzwert: ''},
];


function Matchingtoleranz() {
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
                    Matchingtoleranz
                </Typography>

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

                <br/>
                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >

                    <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon />} component={Link} to='/Matching-Variablen'/>
                    <BottomNavigationAction label="Löschen" icon={<DeleteIcon />} />
                    <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon />} component={Link} to='/Variablen-Fälle-Kontrollen' />
                </BottomNavigation>

            </CardContent>
        </React.Fragment>
    );
}

export default Matchingtoleranz;
