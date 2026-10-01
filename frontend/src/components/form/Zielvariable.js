import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VariableRadioList from './VariableRadioList';
import Card from "@mui/material/Card";
import {CardHeader} from "@mui/material";
import Grid from '@mui/material/Grid';

function Zielvariable({setZielvariable, isDateiSpaltenNamen, isZielvariable, isMatchingMethode, isOnlyBinaryColumns, setWorkflow}) {

    console.log("Spalten: " +isDateiSpaltenNamen);
    console.log("Spalten: " +isDateiSpaltenNamen.length);
    console.log("BinarySpalten: " +isOnlyBinaryColumns);
    console.log("BinarySpalten: " +isOnlyBinaryColumns.length);
    console.log(isMatchingMethode)

    function löschen(){
        setZielvariable('defaultZielvariable');
    }

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%", height: "57%"}}>
                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingLeft: "3%"}}>
                    Group indicator
                </Typography>
                <br/>
                <VariableRadioList variables={isOnlyBinaryColumns}
                                   value={isZielvariable}
                                   onChange={setZielvariable}
                                   height="100%"
                                   ariaLabel="Group indicator"/>
                <br/>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Matching-Methode")
                }} to='/Matching-Methode'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Back</Button></Link>
                </Grid>
               {/* <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/Kontrollvariablen' onClick={() => {
                    visitedSite("kontrollvariablen");
                    setWorkflow("Kontrollvariablen")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Next <ArrowForwardIcon/></Button></Link>
            </Grid>
            </Grid>
        </Card>
    );
}

export default Zielvariable;
