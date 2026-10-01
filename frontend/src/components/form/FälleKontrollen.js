import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { visitedSite } from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import VariableRadioList from './VariableRadioList';
import Grid from '@mui/material/Grid';


function FälleKontrollen({ setFälleKontrollenGruppenIndikator, setFKChip, isAllMatchingvariablen, isFälleKontrollenGruppenindikator,setFälleKontrollenGruppenindikator, isDateiSpaltenNamen, setWorkflow }) {

    let tmpFallID = [];
    let gruppenindikatorToggle = true;

    function selectFallID(event){
        tmpFallID.push(event.value);
    }

    /*  const columns = [
          { field: 'id', headerName: 'ID', width: 0, hide: true},
          { field: 'variable', headerName: 'Variable', width: 255},
          { field: 'gruppenindikator', headerName: 'Gruppenindikator', width: 165,  renderCell: () => (
                  <div>
                      <Checkbox id="checkboxgruppenindikator" onChange={selectGruppenindikator}/>
                  </div>
              ),},
          { field: 'fallID', headerName: 'Fall-ID',     headerClassName: 'super-app-theme--header', width: 165, renderCell: () => (
                  <div>
                      <Checkbox id="checkboxfallid" onChange={selectFallID}/>
                  </div>
              ), },
      ];*/


    let filteredArray;

    if (isAllMatchingvariablen && isAllMatchingvariablen.length > 0) {
        // Wenn isAllMatchingvariablen befüllt ist, filtere die Elemente
        filteredArray = isDateiSpaltenNamen.filter(value => !isAllMatchingvariablen.some(obj => obj.var === value));
    } else {
        // Wenn isAllMatchingvariablen nicht befüllt ist, zeige alle Elemente an
        filteredArray = isDateiSpaltenNamen.slice();     }    console.log('filteredArray' + filteredArray);


    const selectGruppenindikator = (variable) => {
        setFälleKontrollenGruppenIndikator(variable);
        setFKChip("Gruppenindikator: " + variable);
    };


    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "80%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%", height: "59%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingLeft: "2%"}}>
                   Variable zur  Definition der Vergleichsgruppen auswählen
                </Typography>
                <Typography sx={{fontSize: 14, color: "text.secondary", paddingTop: "1%", paddingLeft: "2%"}}>
                    Gruppenindikator setzen
                </Typography>

                <br/>
                <VariableRadioList variables={filteredArray}
                                   value={isFälleKontrollenGruppenindikator}
                                   onChange={selectGruppenindikator}
                                   height="86%"
                                   ariaLabel="Gruppenindikator"/>

                <br/>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Matchingtoleranz")
                }} to='/Matchingtoleranz'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
                {/*<Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={()=>{ setFKChip(' ');}}><DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/Matching-Verhältnis' onClick={() => {
                    visitedSite("matchingverhältnis");
                    setWorkflow("MatchingVerhältnis")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>
                </Grid>

            </Grid>
        </Card>
    );
}

export default FälleKontrollen;
