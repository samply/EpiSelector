import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import summary from '../../assets/summary.json';
import AppContext from '../../AppContext';
import {visitedSite} from "../NavB";
import Grid from '@mui/material/Grid';



const doc = new jsPDF();

// define a generatePDF function that accepts a tickets argument
const Matchingprotokoll = tickets => {
    // initialize jsPDF

    // define the columns we want and their titles
    const tableColumn = ["Variable", "icu_mort=0", "icu_mort=1", "Differenz", "icu_mort=0", "icu_mort=1", "Differenz", "Balance"];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    summary.forEach(variable => {
        const ticketData = [
            variable.row_names,
            variable.unadjusted_means_treated,
            variable.unadjusted_means_control,
            variable.unadjusted_mean_diff,
            variable.adjusted_means_treated,
            variable.adjusted_means_control,
            variable.adjusted_mean_diff,
            variable.balance_covariats_post_matching,
            variable.balance_thresholds_post_matching,
            // called date-fns to format the date on the ticket


        ];
        // push each tickcet's info into a row
        tableRows.push(ticketData);
    });

    const tableColumn1 = ["         ", "Pre-Matching","      ","      ","     ", "Post-Matching"," "," "];
    const tableRows1 = [];

    // startY is basically margin-top
    doc.autoTable(tableColumn1, tableRows1, {startY:30})
    doc.autoTable(tableColumn, tableRows, { startY: 38 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.setFontSize(20);
    doc.text("Matchingprotokoll", 14, 15);
    doc.setFontSize(14); doc.setTextColor(100);
    doc.text("Matching Ergebnisse", 14, 25);
    // we define the name of our PDF file.
    doc.save(`matchingprotokoll${dateStr}.pdf`);
};


function Dataexport() {
    const { setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis,setVerhältnisNav, setScoreMethode, setAlgorithmus, setErsetzung, setÜbereinstimmungswert, setDisclaimer, setWorkflow } = useContext(AppContext);
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            try {
                const response = await axios.get("http://localhost:3000/results");
                setResultData(response.data.resultData);
            } catch (err) {
                console.log("error");
            }
        };
        getResults();
    }, []);

    const ergebnisse = resultData.filter(result => result.status === "completed");

   /* const wordsApi = new WordsApi("####-####-####-####-####", "##################");

    const docRTF = doc;
    const request = new model.ConvertDocumentRequest({
        document: docRTF,
        format: "rtf"
    });

    const convert = wordsApi.convertDocument(request)
        .then((convertDocumentResult) => {
            console.log("Result of ConvertDocument: ", convertDocumentResult);
        });*/

    function deleteAllData() {
        setDatenquelle("defaultQuelle");
        setDatei("defaultDatei");
        setMatchingMethode("defaultMethode");
        setZielvariable("defaultZielvariable");
        setKontrollvariablen("defaultKontrollvariablen");
        setVerhältnis("defaultVerhältnis");
        setVerhältnisNav("defaultVerhältnis");
        setScoreMethode("defaultScoreMethode");
        setAlgorithmus("defaultAlgo");
        setErsetzung("defaultErsetz");
        setÜbereinstimmungswert("defaultÜbereinstimmungswert");
    };

    setDisclaimer(false);


    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "4%", paddingLeft: "3%"}}>
                    Datenexport
                </Typography>

                <div style={{display: "flex", justifyContent: "center", paddingTop: "5%", paddingBottom: "15%"}}>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "100%",
                        height: "80%",
                        border: "bold solid",
                        justifyContent: "space-evenly"
                    }}>
                        <Button onClick={() => Matchingprotokoll(ergebnisse)} style={{flexFlow: "column"}}>
                            <SimCardDownloadIcon sx={{fontSize: "xxx-large"}}/> Matchingprotokoll <br/>herunterladen
                        </Button>
                        <Button disabled style={{flexFlow: "column", color: "grey"}}>
                            <CollectionsBookmarkIcon sx={{fontSize: "xxx-large"}}/> Daten in DRE speichern
                        </Button>
                        <Button disabled style={{flexFlow: "column", color: "grey"}}>
                            <DashboardIcon sx={{fontSize: "xxx-large"}}/>Maske speichern
                        </Button>
                    </div>
                </div>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>
            <Link style={{textDecoration: "none"}} to='/Matching-Ergebnis'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
                <Grid item>
                <Button onClick={deleteAllData} sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined"><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} onClick={() => {
                    deleteAllData();
                    setWorkflow("Startseite")
                }} to='/Startseite'><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189", "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled"><DoneAllIcon/>Beenden </Button></Link>
                </Grid>

            </Grid>
        </Card>
    );
}

export default Dataexport;
