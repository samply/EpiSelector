import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import '../../assets/summary.json';

function MatchingErgebnis({isAllKontrollvariablen}) {

    const fertigeTabelle=[];

    function createData(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat ) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const rowsTable2 = fertigeTabelle.push(isAllKontrollvariablen.forEach(element => { createData(element.var.toString(),0,0,0,0,0,0,"check"); console.log(element.var.toString()); console.log(isAllKontrollvariablen);}));
    /*const tablePlanB = [
        createDataTable2(isAllKontrollvariablen[0].var, 0,0,0,0,0,0,"check"),
        createDataTable2(isAllKontrollvariablen[1].var, 0,0,0,0,0,0,"check"),
    ];*/

    let Summary=[];

    fetch('../../assets/summary.json')
        .then((res) => res.json())
        .then((resJson) => {
             Summary = JSON.parse(resJson)
        })

    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{fontSize: 14, width:"100%"}} color="text.secondary" gutterBottom>
                            Matching
                </Typography>
                <div style={{display:"flex", flexFlow:"row"}}>
                    <div style={{display:"flex", flexFlow:"column", paddingTop:"2%", paddingLeft:"1%", width:"98%"}}>
                        <Typography sx={{fontSize: 14, paddingBottom:"1%", fontWeight:"bold"}} >
                            Vergleich Fälle - Kontrollen
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210}}
                                    size="small" aria-label="a dense table">
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
                                        {Summary.map((row, index) => {
                                            return  <TableCell  key={index} sx={{backgroundColor:"lightgrey"}} align="right">{row.row_names}</TableCell>
                                        })}
                                       </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isAllKontrollvariablen.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.var}
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
                        <Typography style={{fontSize: "10px", paddingTop:"2%", paddingBottom:"1%"}} >
                            stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                            kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
                            *** 0.05, balanciert
                        </Typography>
                    </div>
                </div>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/uebereinstimmungPropensityScore'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Dataexport' onClick={()=>visitedSite("datenexport")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>



            </CardContent>
    );
}

export default MatchingErgebnis;
