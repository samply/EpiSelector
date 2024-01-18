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
import Cancel from '@mui/icons-material/Cancel';


function MatchingErgebnis({isAllKontrollvariablen, isMatchingMethode, isDateiSpaltenNamen, isBeobachtungen, isFälleKontrollenGruppenindikator, isZielvariable}) {

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

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;


    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                <div style={{width:"95%", flexFlow: "row", paddingLeft:"0.5%"}}>
                    <Typography sx={{fontSize: 18}} >
                        Vergleich Fälle - Kontrollen
                    </Typography>
                    <Typography style={{fontSize: "10px",fontWeight:"bold", float:"right"}}>
                        Pre-Matching: {isDateiSpaltenNamen.length} Variablen, {isBeobachtungen} Beobachtungen <br/>
                        Post-Matching:{isDateiSpaltenNamen.length+3} Variablen, {isBeobachtungen} Beobachtungen
                    </Typography>
                </div>

                <div style={{maxHeight:"1000px", flexFlow:"column", paddingTop:"0%", paddingLeft:"1%", width:"95%", overflowY:"auto", marginBottom:"1%"}}>

                    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 210, fontSize: "x-small" }} size="x-small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow sx={{ height: '30px' }}>
                                        <TableCell align="center" colSpan={4} sx={{ backgroundColor: "#1d4189", color: "white", fontSize: "medium", padding: "4px" }}>
                                            PreMatching
                                        </TableCell>
                                        <TableCell align="center" colSpan={5} sx={{ backgroundColor: "#1d4189", color: "white", fontSize: "medium", padding: "4px", borderLeft: "solid 1px white" }}>
                                            PostMatching
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{ height: '30px' }}>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">Variable</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">Differenz</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">{columnHeader0}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">{columnHeader1}</TableCell>
                                        <TableCell sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">Differenz</TableCell>
                                        <TableCell colSpan={2} sx={{ backgroundColor: "#E8E9EB", fontSize: "small", padding: "4px" }} align="center">Balance</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div style={{ maxHeight: "210px", overflowY: "auto", overflowX:"none" }}>
                            <TableContainer component={Paper} style={{ overflowX:"none"}}>
                                <Table sx={{ fontSize: "small", border: '1px solid #ddd' }} size="small" aria-label="a dense table">
                                    <TableBody>

                                        {tableXY.map((item) => (
                                            <TableRow key={item.id}>
                                                {Object.values(item).map((val) => {
                                                        if(val === "Balanced"){
                                                            return(<TableCell style={{textAlign:"left", padding:"2px"}}><CheckCircleIcon style={{color:"green", background:"none"}}/></TableCell>)
                                                        }else{
                                                            if(val === "<0.1"){ return ("")
                                                            }else{
                                                                if(val === "Not Balanced"){
                                                                    return <TableCell style={{textAlign:"left", padding:"2px"}}><Cancel style={{textAlign:"left", color:"red", background:"none"}} /></TableCell>
                                                                }else{
                                                                    return (<TableCell style={{textAlign:"left", padding:"2px"}}>{val}</TableCell>)
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
                    </div>
                </div>


                <Typography style={{fontSize: "10px", paddingLeft:"1%"}}>
                    stetige Variablen: Mittelwert bzw. Standardisierte Mittelswertsdifferenz (SMD) <br/>
                    kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen <br/>
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
