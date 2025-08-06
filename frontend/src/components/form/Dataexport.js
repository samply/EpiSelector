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

const doc = new jsPDF();

function Dataexport() {
    const { isMatchingMethode, isErsetzung, isToleranzBereichSet, setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setVerhältnisNav, setScoreMethode, setAlgorithmus, setErsetzung, setÜbereinstimmungswert, setDisclaimer, setWorkflow, setVollständigedatei, isZielvariable, isFälleKontrollenGruppenindikator, isErgebnisse } = useContext(AppContext);
    const [results, setResults] = useState([]);
    const [resultData, setResultData] = useState([]);

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;

    const Matchingprotokoll = () => {
        // Verwende die resultData aus dem AppContext (von MatchingErgebnis.js)
        const dataToExport = isErgebnisse && Array.isArray(isErgebnisse) ? isErgebnisse : results;
        
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

        dataToExport.forEach(variable => {
            const ticketData = [
                variable.row_names,
                variable.unadjusted_means_treated || variable.preMatchingIcu_mort0,
                variable.unadjusted_means_control || variable.preMatchingIcu_mort1,
                variable.unadjusted_mean_diff || variable.preMatchingDif,
                variable.adjusted_means_treated || variable.postMatchingIcu_mort0,
                variable.adjusted_means_control || variable.postMatchingIcu_mort1,
                variable.adjusted_mean_diff || variable.postMatchingDif,
                variable.balance_covariats_post_matching || variable.balancePostMat,
            ];
            tableRows.push(ticketData);
        });

        const tableColumn1 = ["", "Pre-Matching", "", "", "", "Post-Matching", "", "", ""];
        const tableRows1 = [];

        doc.autoTable(tableColumn1, tableRows1, { startY: 30 });
        doc.autoTable(tableColumn, tableRows, { startY: 38 });
        const date = new Date().toString().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.setFontSize(20);
        doc.text("Matchingprotokoll", 14, 15);
        doc.setFontSize(14); doc.setTextColor(100);
        doc.text("Matching Ergebnisse", 14, 25);
        doc.save(`matchingprotokoll${dateStr}.pdf`);
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
    setDisclaimer(false);

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
