import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";

import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import summary from '../../assets/summary.json';
import {Paper, Table, TableBody} from "@material-ui/core";
import Card from "@mui/material/Card";


function MatchingErgebnis({isAllKontrollvariablen}) {

    const fertigeTabelle=[];

    function createData(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat ) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const tableXY= summary;
    console.log(tableXY);

    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                    <div style={{display:"flex", flexFlow:"column", paddingTop:"1%", paddingLeft:"1%", width:"95%"}}>
                        <Typography sx={{fontSize: 14, paddingBottom:"1%"}} >
                            Vergleich Fälle - Kontrollen
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210}} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"center"} colSpan={4} sx={{backgroundColor:"#1d4189", color:"white", fontSize:"small"}}>PreMatching</TableCell>
                                        <TableCell align={"center"}  colSpan={5} sx={{backgroundColor:"#1d4189", color:"white", fontSize:"small", borderLeft:"solid 1px white"}}>PostMatching</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor:"#E8E9EB", fontSize:"small"}}>Variable</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">icu_mort=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">icu_mort=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">Differenz</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">icu_mort=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">icu_mort=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">Differenz</TableCell>
                                        <TableCell  colSpan={2} sx={{backgroundColor:"#E8E9EB", fontSize:"small"}} align="center">balance</TableCell>
                                    </TableRow>

                                    {tableXY.map((item) => (
                                        <TableRow key={item.id}>
                                            {Object.values(item).map((val) => (
                                                <TableCell>{val}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                        <Typography style={{fontSize: "10px", paddingTop:"1%", paddingBottom:"1%", paddingLeft:"2%"}} >
                            stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                            kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
                        </Typography>


                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to='/uebereinstimmungPropensityScore'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Dataexport' onClick={()=>visitedSite("datenexport")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter<ArrowForwardIcon/></Button></Link>

                </div>



            </CardContent>
        </Card>
    );
}

export default MatchingErgebnis;
