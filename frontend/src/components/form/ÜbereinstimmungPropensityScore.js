import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from "@material-ui/core";
import { visitedSite } from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from '@mui/material/Grid';

// let ip_django = "127.0.0.1:8000";


function ÜbereinstimmungPropensityScore({ isAlgorithmus, isErsetzung, isZielvariable, isAllKontrollvariablen, isScoreMethode, isMatchingMethode, isVollständigeDatei, isVerhältnis, setÜbereinstimmungswert, isPSJsonPackage, isÜbereinstimmungswert, setWorkflow }) {

    const [isWert, setWert] = useState(0);
    const [value, setValue] = useState(() => { if (isÜbereinstimmungswert !== "defaultÜbereinstimmungswert") { return isÜbereinstimmungswert } else { return '' } });

   /* let sendVariablesToBackend = () => {
        console.log("Log über Fertig-Button");
        console.log(isAlgorithmus);
        console.log(isErsetzung);
        console.log(isZielvariable);
        console.log(isAllKontrollvariablen);
        console.log(isScoreMethode);
        console.log(isMatchingMethode);
        console.log(isVollständigeDatei);
        console.log(isVerhältnis);

        let selectedVariables = [];
        selectedVariables.push(isVollständigeDatei);
        selectedVariables.push(isMatchingMethode);
        selectedVariables.push(isAlgorithmus);
        selectedVariables.push(isErsetzung);
        selectedVariables.push(isAllKontrollvariablen);
        selectedVariables.push(isScoreMethode);
        selectedVariables.push(isZielvariable);
        selectedVariables.push(isÜbereinstimmungswert);
        selectedVariables.push(isVerhältnis);

        var temp_string = "["
        for (var i = 0; i <= isAllKontrollvariablen.length - 2; i++) {
            console.log(isAllKontrollvariablen[i])
            console.log(isAllKontrollvariablen[i].var)
            temp_string += isAllKontrollvariablen[i].var + ","
        }
        temp_string += isAllKontrollvariablen[isAllKontrollvariablen.length - 1].var
        temp_string += "]"

        var param = {
            groupindicator: isZielvariable,
            controllvariables: temp_string,
            mmethod: isAlgorithmus,
            mdistance: "glm",
            mreplace: isErsetzung,
            mratio: isVerhältnis,
            mcaliper: isÜbereinstimmungswert,
        };

        console.log("selectedVariables to Backend:" +selectedVariables);

        // (B) BUILD URL
        var url = new URL("http://" + ip_django + "/control_selection/summary");
        for (let k in param) {
            url.searchParams.append(k, param[k]);
        }
        //Richtige url einfügen
          fetch('http://127.0.0.1:8000/control_selection/summary', {
              method: "post",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(isVollständigeDatei)
          })
              .then((response) => response.json())
              .then((data) => {
                  console.log("Data:", data);
              })
              .catch((err) => {
                  console.log(err.message);
              });
    }*/

    function löschen() {
        setÜbereinstimmungswert('defaultÜbereinstimmungswert');
        setWert(0);
        setValue('');
    }

    // global.aktuellerStatus = 'übereinstimmungswert';

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingLeft: "3%"}}>
                    Bereich der Übereinstimmung der Propensity-Scores (Caliper)
                </Typography>

                <Typography sx={{fontSize: 15, paddingTop: "5%", paddingLeft: "3%"}}>
                    Geben Sie einen Wert zwischen 0 und 1 an:
                </Typography>

                <div style={{
                    display: "flex",
                    flexFlow: "row",
                    gap: "1%",
                    justifyContent: "center",
                    paddingTop: "3%",
                    paddingBottom: "17.5%"
                }}>
                    <Typography sx={{fontSize: 25}}>±</Typography>
                    <TextField label="Übereinstimmungswert" variant="outlined" defaultValue={value}
                               value={value}
                               onChange={(newValue) => {
                                   setValue(newValue.target.value);
                                   if (newValue.target.value <= 1 && newValue.target.value >= 0) {
                                       setÜbereinstimmungswert(newValue.target.value);
                                   }
                                   setWert(newValue.target.value);
                               }}
                               error={isWert > 1 || isWert < 0}
                               required="true"
                    />
                </div>
                <br/>

            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Matching-Algorithmus")
                }} to='/MatchingAlgorithmus'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
                <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/Matching-Ergebnis' onClick={() => {
                    visitedSite("ergebnisse");
                    setWorkflow("MatchingErgebnis")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Fertig <ArrowForwardIcon/></Button></Link>
                </Grid>
            </Grid>
        </Card>
    );
}

export default ÜbereinstimmungPropensityScore;
