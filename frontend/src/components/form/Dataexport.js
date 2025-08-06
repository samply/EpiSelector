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
import FHSPSOE from '../../assets/FHS_PS_OE.json';
import FHSPSME from '../../assets/FHS_PS_ME.json';
import FHSEMMT from '../../assets/FHS_EM_MT.json';
import FHSEMOT from '../../assets/FHS_EM_OT.json';
import AppContext from '../../AppContext';
import {visitedSite} from "../NavB";
import Grid from '@mui/material/Grid';

function Dataexport() {
    const { isSummaryData, isMatchingMethode, isErsetzung, isToleranzBereichSet, setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setVerhältnisNav, setScoreMethode, setAlgorithmus, setErsetzung, setÜbereinstimmungswert, setDisclaimer, setWorkflow, setVollständigedatei, isZielvariable, isFälleKontrollenGruppenindikator, isErgebnisse } = useContext(AppContext);
    const [results, setResults] = useState([]);
    const [resultData, setResultData] = useState([]);

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;

    const Matchingprotokoll = () => {
        // Prüfe ob Summary-Daten verfügbar sind
        if (!isSummaryData || !Array.isArray(isSummaryData) || isSummaryData.length === 0) {
            alert("Fehler: Keine Summary-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }
        
        console.log("PDF Export - isSummaryData:", isSummaryData);
        
        const tableColumn = [
            "Variable",
            columnHeader0,
            columnHeader1,
            "Differenz",
            columnHeader0,
            columnHeader1,
            "Differenz",
            "Balance"
        ];        
        const tableRows = [];

        isSummaryData.forEach(variable => {
            // Ignoriere die gleichen Spalten wie in der Tabelle
            if (variable.balance_thresholds_post_matching !== undefined || 
                variable.postmatch_cases !== undefined || 
                variable.postmatch_controls !== undefined || 
                variable.prematch_cases !== undefined || 
                variable.prematch_controls !== undefined) {
                // Skip diese Zeilen oder filtern Sie die Eigenschaften heraus
                return;
            }

            const ticketData = [
                variable.row_names || variable.Variable || "",
                variable.unadjusted_means_treated || variable.preMatchingIcu_mort0 || variable.prematch_mean_treated || "",
                variable.unadjusted_means_control || variable.preMatchingIcu_mort1 || variable.prematch_mean_control || "",
                variable.unadjusted_mean_diff || variable.preMatchingDif || variable.prematch_mean_diff || "",
                variable.adjusted_means_treated || variable.postMatchingIcu_mort0 || variable.postmatch_mean_treated || "",
                variable.adjusted_means_control || variable.postMatchingIcu_mort1 || variable.postmatch_mean_control || "",
                variable.adjusted_mean_diff || variable.postMatchingDif || variable.postmatch_mean_diff || "",
                variable.balance_covariats_post_matching || variable.balancePostMat || variable.balance_post_matching || "Balanced",
            ];
            tableRows.push(ticketData);
        });

        // Neue autoTable Syntax (nicht deprecated)
        const tableColumn1 = [
            ["", "Pre-Matching", "", "", "", "Post-Matching", "", "", ""]
        ];

        const date = new Date().toString().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        
        const newDoc = new jsPDF();
        
        newDoc.setFontSize(20);
        newDoc.text("Matchingprotokoll", 14, 15);
        newDoc.setFontSize(14); 
        newDoc.setTextColor(100);
        newDoc.text("Matching Ergebnisse", 14, 25);
        
        // Header-Tabelle mit neuer Syntax
        newDoc.autoTable({
            head: tableColumn1,
            body: [],
            startY: 30,
            theme: 'grid'
        });
        
        // Haupt-Tabelle mit neuer Syntax
        newDoc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 38,
            theme: 'striped'
        });
        
        newDoc.save(`matchingprotokoll${dateStr}.pdf`);
    };

    useEffect(() => {
        let data;

        if (isMatchingMethode === "Propensity Score" && isErsetzung === "FALSE") {
            data = FHSPSOE;
        } else if (isMatchingMethode === "Propensity Score" && isErsetzung === "TRUE") {
            data = FHSPSME;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "FALSE") {
            data = FHSEMOT;
        } else if (isMatchingMethode === "Exaktes Matching" && isToleranzBereichSet === "TRUE") {
            data = FHSEMMT;
        }
        setResults(data);

        // Setze Disclaimer im useEffect, nicht im Render
        setDisclaimer(false);

    }, [isMatchingMethode, isErsetzung, isToleranzBereichSet, setDisclaimer]);

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
        setVollständigedatei("defaultVollständigedatei");
    };

    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }} />
            <CardContent sx={{ backgroundColor: "white", width: "100%" }}>

                <Typography sx={{ fontSize: 18, paddingTop: "1%", paddingBottom: "4%", paddingLeft: "3%" }}>
                    Datenexport
                </Typography>

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%", paddingBottom: "15%" }}>
                    <div style={{
                        display: "flex",
                        flexFlow: "row",
                        width: "100%",
                        height: "80%",
                        border: "bold solid",
                        justifyContent: "space-evenly"
                    }}>
                        <Button onClick={() => Matchingprotokoll()} style={{ flexFlow: "column" }}>
                            <SimCardDownloadIcon sx={{ fontSize: "xxx-large" }} /> Matchingprotokoll <br />herunterladen
                        </Button>
                        <Button disabled style={{ flexFlow: "column", color: "grey" }}>
                            <CollectionsBookmarkIcon sx={{ fontSize: "xxx-large" }} /> Daten in DRE speichern
                        </Button>
                        <Button disabled style={{ flexFlow: "column", color: "grey" }}>
                            <DashboardIcon sx={{ fontSize: "xxx-large" }} />Maske speichern
                        </Button>
                    </div>
                </div>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float: 'right', bottom: 0, gap: '2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>
                    <Link style={{ textDecoration: "none" }} to='/Matching-Ergebnis'><Button sx={{
                        height: "100%",
                        width: "auto",
                        borderColor: "#1d4189",
                        "&:hover": { backgroundColor: "white", borderColor: "#1d4189" },
                        color: "#1d4189"
                    }} variant="outlined"><ArrowBackIcon />Zurück</Button></Link>
                </Grid>
                <Grid item>
                    <Link style={{ textDecoration: "none" }} onClick={() => {
                        deleteAllData();
                        setWorkflow("Startseite")
                    }} to='/Startseite'><Button sx={{
                        height: "100%",
                        width: "auto",
                        color: "white",
                        border: "none",
                        backgroundColor: "#1d4189",
                        "&:hover": { backgroundColor: "#1d4189" },
                    }}><DoneAllIcon />Beenden</Button></Link>
                </Grid>
            </Grid>
        </Card>

    )
}

export default Dataexport;
