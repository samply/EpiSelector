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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {visitedSite} from "../NavB";

function MatchingErgebnis() {

    const [value, setValue] = React.useState(2);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    function createDataTable1(variable, einheit) {
        return { variable, einheit };
    }

    const rowsTable1 = [
        createDataTable1('encid', "num"),
        createDataTable1('_intime', "POSIXct"),
        createDataTable1('_outtime', "POSIXct"),
        createDataTable1('sepsis_jn', "num"),
        createDataTable1('sepsistime', "num"),
        createDataTable1('gender', "chr"),
        createDataTable1('age', "num"),
        createDataTable1('height', "num"),
        createDataTable1('weight', "num"),
    ];

    function createDataTable2(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat ) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const rowsTable2 = [
        createDataTable2('encid', 0,0,0,0,0,0,"check"),
        createDataTable2('_intime', 0,0,0,0,0,0,"check"),
        createDataTable2('_outtime', 0,0,0,0,0,0,"check"),
    ];


    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>

                <Typography sx={{fontSize: 14, width:"100%"}} color="text.secondary" gutterBottom>
                            Matching
                </Typography>
                <div style={{display:"flex", flexFlow:"row"}}>
                    <div style={{display:"flex", flexFlow:"column", width:"22%", height:"83%", paddingTop:"2%"}}>
                        <Typography sx={{fontSize: 14, paddingBottom:"1%", fontWeight:"bold"}} >
                            Datensatzbeschreibung
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 80 }} size="small" aria-label="a dense table">
                                <TableBody>
                                    {rowsTable1.map((row) => (
                                        <TableRow
                                            key={row.variable}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.variable}
                                            </TableCell>
                                            <TableCell align="right">{row.einheit}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography sx={{fontSize: 11, paddingTop:"4%"}} >
                            Variablen: X <br/>
                            Beobachtungen: X
                        </Typography>
                    </div>

                    <div style={{display:"flex", flexFlow:"column", paddingTop:"2%", paddingLeft:"1%", width:"78%"}}>
                        <Typography sx={{fontSize: 14, paddingBottom:"1%", fontWeight:"bold"}} >
                            Vergleich Fälle - Kontrollen
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210}} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189", color:"white"}} >PreMatching</TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189", color:"white"}} >PostMatching</TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                        <TableCell sx={{backgroundColor:"#1d4189"}}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor:"lightgrey"}}>Variable</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">icu_mort<br/>=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">icu_mort<br/>=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">Dif</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">icu_mort<br/>=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">icu_mort<br/>=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">Dif</TableCell>
                                        <TableCell  sx={{backgroundColor:"lightgrey"}} align="right">balance<br/>PostMat</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsTable2.map((row) => (
                                        <TableRow
                                            key={row.variable}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.variable}
                                            </TableCell>
                                            <TableCell align="right">{row.preMatchingIcu_mort0}</TableCell>
                                            <TableCell align="right">{row.preMatchingIcu_mort1}</TableCell>
                                            <TableCell align="right">{row.preMatchingDif}</TableCell>
                                            <TableCell align="right">{row.postMatchingIcu_mort0}</TableCell>
                                            <TableCell align="right">{row.postMatchingIcu_mort1}</TableCell>
                                            <TableCell align="right">{row.postMatchingDif}</TableCell>
                                            <TableCell align="right">{row.balancePostMat}</TableCell>
                                        </TableRow>

                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography sx={{fontSize: 11, paddingTop:"2%"}} >
                            stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                            kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
                            *** 0.05, balanciert
                        </Typography>
                    </div>
                </div>
                <div style={{ height: "15%", display:"flex", float:"right"}}>
                            <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}}>
                                <BottomNavigationAction label="Zurück" icon={<ArrowCircleLeftIcon/>} component={Link} to='/ÜbereinstimmungPropensityScore'/>
                                <BottomNavigationAction label="Löschen" icon={<DeleteIcon/>}/>
                                <BottomNavigationAction label="Weiter" icon={<ArrowCircleRightIcon/>} component={Link} to='/Dataexport' onClick={()=>visitedSite("datenexport")} />
                            </BottomNavigation>
                </div>

            </CardContent>
    );
}

export default MatchingErgebnis;
