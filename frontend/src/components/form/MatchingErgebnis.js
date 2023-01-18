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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

function MatchingErgebnis({isAllKontrollvariablen, isMatchingMethode, isDateiSpaltenNamen, isBeobachtungen}) {

    const fertigeTabelle=[];

    function createData(variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat ) {
        return { variable, preMatchingIcu_mort0, preMatchingIcu_mort1, preMatchingDif, postMatchingIcu_mort0, postMatchingIcu_mort1, postMatchingDif, balancePostMat };
    }

    const tableXY= summary;
    console.log(tableXY);

    let backFunction = () => {
        if(isMatchingMethode==="Exaktes Matching"){
            return "/Matching-Verhältnis";
        }else{
            return "/ÜbereinstimmungPropensityScore";
        }
    };

    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                    <div style={{display:"flex", flexFlow:"column", paddingTop:"1%", paddingLeft:"1%", width:"95%"}}>
                        <Typography sx={{fontSize: 18, paddingBottom:"2%", paddingLeft:"0.5%"}} >
                            Vergleich Fälle - Kontrollen
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210, fontSize:"small"}} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align={"center"} colSpan={4} sx={{backgroundColor:"#1d4189", color:"white", fontSize:"medium", padding:"8px"}}>PreMatching</TableCell>
                                        <TableCell align={"center"}  colSpan={5} sx={{backgroundColor:"#1d4189", color:"white", fontSize:"medium", padding:"8px", borderLeft:"solid 1px white"}}>PostMatching</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">Variable</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">icu_mort=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">icu_mort=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">Differenz</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">icu_mort=0</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">icu_mort=1</TableCell>
                                        <TableCell  sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">Differenz</TableCell>
                                        <TableCell  colSpan={2} sx={{backgroundColor:"#E8E9EB", fontSize:"small", padding:"8px"}} align="center">Balance</TableCell>
                                    </TableRow>

                                    {tableXY.map((item) => (
                                        <TableRow key={item.id}>
                                            {Object.values(item).map((val) => {
                                                if(val === "Balanced"){
                                                    return(<TableCell style={{textAlign:"center", padding:"2px", paddingLeft:"5px"}}><CheckCircleIcon style={{color:"green", background:"none"}}/></TableCell>)
                                                }else{
                                                    if(val === "<0.1"){ return ("")
                                                    }else{
                                                        if(val === "Not Balanced"){
                                                            return <TableCell style={{textAlign:"center", padding:"2px"}}><DangerousIcon style={{textAlign:"center", color:"red", background:"none"}}/></TableCell>
                                                        }else{
                                                            return (<TableCell style={{textAlign:"center", padding:"2px"}}>{val}</TableCell>)
                                                        }
                                                    }
                                                }
                                            }
                                            )}
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>

                        <Typography style={{fontSize: "10px", paddingTop:"1%", paddingBottom:"3%", paddingLeft:"2%"}} >
                            stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                            kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
                        </Typography>

                        <Typography style={{paddingBottom:"5.5%", paddingLeft:"2%", fontSize:13}}>
                            Variablen: {isDateiSpaltenNamen.length}, Beobachtungen: {isBeobachtungen}
                        </Typography>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to={backFunction()}><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Dataexport' onClick={()=>visitedSite("datenexport")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter<ArrowForwardIcon/></Button></Link>

                </div>



            </CardContent>
        </Card>
    );
}

export default MatchingErgebnis;
