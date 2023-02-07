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


function ÜbereinstimmungPropensityScore({ isAlgorithmus, isErsetzung, isZielvariable, isAllKontrollvariablen, isScoreMethode, isMatchingMethode, isVollständigeDatei, isVerhältnis, setÜbereinstimmungswert, isJsonPackage, isÜbereinstimmungswert }) {

    const [isWert, setWert] = useState(0);
    const [value, setValue] = useState(() => { if (isÜbereinstimmungswert !== "defaultÜbereinstimmungswert") { return isÜbereinstimmungswert } else { return '' } });

    let logsomething = () => {
        console.log("Log über Fertig-Button");
        console.log(isAlgorithmus)
        console.log(isErsetzung)
        console.log(isZielvariable)
        console.log(isAllKontrollvariablen)
        console.log(isScoreMethode)
        console.log(isMatchingMethode)
        console.log(isVollständigeDatei)
        console.log(isVerhältnis)

        fetch('http://127.0.0.1:8000/control_selection/pie_chart?groupindicator=icu_mort&controllvariables=[age,sex,duration_h]&mmethod=nearest&mdistance=glm&mreplace=TRUE&mratio=2&mcaliper=0.2&controllvariable=sex', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(isVollständigeDatei)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data:")
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });

    }

    // Rest-Aufruf






    if (isJsonPackage !== 'defaultPackage') {
        console.log(isJsonPackage);
    }

    function löschen() {
        setÜbereinstimmungswert('defaultÜbereinstimmungswert');
        setWert(0);
        setValue('');
    }

    global.aktuellerStatus = 'übereinstimmungswert';

    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }} />

            <CardContent sx={{ backgroundColor: "white", width: "100%" }}>

                <Typography sx={{ fontSize: 18, paddingTop: "1%", paddingLeft: "3%" }} >
                    Bereich der Übereinstimmung der Propensity-Scores (Caliper)
                </Typography>

                <Typography sx={{ fontSize: 15, paddingTop: "5%", paddingLeft: "3%" }}>
                    Geben Sie einen Wert zwischen 0 und 1 an:
                </Typography>

                <div style={{ display: "flex", flexFlow: "row", gap: "1%", justifyContent: "center", paddingTop: "3%", paddingBottom: "17.5%" }}>
                    <Typography sx={{ fontSize: 25 }}>±</Typography>
                    <TextField label="Übereinstimmungswert" variant="outlined" defaultValue={value}
                        value={value}
                        onChange={(newValue) => { setValue(newValue.target.value); if (newValue.target.value <= 1 && newValue.target.value >= 0) { setÜbereinstimmungswert(newValue.target.value); } setWert(newValue.target.value); }}
                        error={isWert > 1 || isWert < 0}
                        required="true"

                    />
                </div>
                <br />
                <div style={{ height: "8%", display: "flex", float: "right", gap: "3%", width: "42%", marginRight: "3%" }}>
                    <Link style={{ textDecoration: "none" }} to='/MatchingAlgorithmus'><Button sx={{ height: "100%", width: "auto", borderColor: "#1d4189", "&:hover": { backgroundColor: "white", borderColor: "#1d4189" }, color: "#1d4189" }} variant="outlined"><ArrowBackIcon />Zurück</Button></Link>
                    <Button sx={{ width: "auto", borderColor: "#B11B18", color: "#B11B18", "&:hover": { backgroundColor: "white", borderColor: "#B11B18" } }} variant="outlined" onClick={löschen}><DeleteIcon />Löschen</Button>
                    <Link style={{ textDecoration: "none" }} to='/Matching-Ergebnis' onClick={() => { logsomething(); visitedSite("ergebnisse") }}><Button sx={{ height: "100%", width: "auto", color: "white", border: "none", backgroundColor: "#1d4189", "&:hover": { backgroundColor: "#1d4189" } }} variant="filled">Fertig <ArrowForwardIcon /></Button></Link>
                </div>

            </CardContent>
        </Card>
    );

}

export default ÜbereinstimmungPropensityScore;
