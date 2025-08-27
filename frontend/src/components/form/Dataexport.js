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
import { useAuth } from '../../context/AuthContext';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function Dataexport() {
    const { isSummaryData, isResultData, isMatchingMethode, isErsetzung, isToleranzBereichSet, setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setVerhältnisNav, setScoreMethode, setAlgorithmus, setErsetzung, setÜbereinstimmungswert, setDisclaimer, setWorkflow, setVollständigedatei, isZielvariable, isFälleKontrollenGruppenindikator, isErgebnisse, isKontrollvariablen, isVerhältnis, isScoreMethode, isAlgorithmus, isÜbereinstimmungswert, isToleranzBereich, isMatchingvariablen, isAllMatchingvariablen, isMatchingtoleranz } = useContext(AppContext);
    const { user, isAuthenticated, saveMatchingProcess } = useAuth();
    const [results, setResults] = useState([]);
    const [resultData, setResultData] = useState([]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [processName, setProcessName] = useState('');
    const [saving, setSaving] = useState(false);

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;

    const Matchingprotokoll = () => {
        // Prüfe ob Summary-Daten verfügbar sind
        if (!isSummaryData || !Array.isArray(isSummaryData) || isSummaryData.length === 0) {
            alert("Fehler: Keine Summary-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }
        
        console.log("PDF Export - isSummaryData:", isSummaryData);
        
        // Debug: Schaue dir die Struktur der ersten Variable an
        if (isSummaryData.length > 0) {
            console.log("PDF Export - Erste Variable:", isSummaryData[0]);
            console.log("PDF Export - Verfügbare Keys:", Object.keys(isSummaryData[0]));
        }
        
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

        isSummaryData.forEach((variable, index) => {
            console.log(`PDF Export - Variable ${index}:`, variable);
            
            // Alle Variablen verarbeiten, aber nur die gewünschten Eigenschaften verwenden
            // Ignoriere die Meta-Eigenschaften beim Erstellen der Tabelle
            
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
            
            console.log(`PDF Export - Processed ticketData for variable ${index}:`, ticketData);
            tableRows.push(ticketData);
        });

        console.log("PDF Export - Final tableRows:", tableRows);

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

    const downloadCSV = () => {
        // Prüfe ob Result-Daten verfügbar sind
        if (!isResultData || !Array.isArray(isResultData) || isResultData.length === 0) {
            alert("Fehler: Keine Result-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }
        
        console.log("CSV Export - isResultData:", isResultData);
        
        // CSV Header erstellen - verwende die Keys der ersten Zeile
        const headers = Object.keys(isResultData[0]);
        
        // CSV Content erstellen
        let csvContent = headers.join(',') + '\n';
        
        // Datenzeilen hinzufügen
        isResultData.forEach(row => {
            const values = headers.map(header => {
                let value = row[header];
                // Handle special characters and quotes in CSV
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += values.join(',') + '\n';
        });
        
        // CSV-Datei erstellen und herunterladen
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            
            const date = new Date().toString().split(" ");
            const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
            link.setAttribute('download', `matching_datensatz_${dateStr}.csv`);
            
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleSaveProcess = () => {
        if (!isAuthenticated) {
            alert('Sie müssen angemeldet sein, um eine Maske zu speichern.');
            return;
        }
        setSaveDialogOpen(true);
    };

    const saveCurrentProcess = async () => {
        if (!processName.trim()) {
            alert('Bitte geben Sie einen Namen für die Maske ein.');
            return;
        }

        setSaving(true);
        
        try {
            const processData = {
                name: processName,
                matchingMethod: isMatchingMethode,
                resultCount: isResultData ? isResultData.length : 0
            };

            // Nur relevante Parameter je nach Matching-Methode hinzufügen
            if (isMatchingMethode === "Propensity Score") {
                // Propensity Score Parameter
                if (isZielvariable && isZielvariable !== "defaultZielvariable") {
                    processData.targetVariable = isZielvariable;
                }
                if (isKontrollvariablen && isKontrollvariablen !== "defaultKontrollvariablen") {
                    processData.controlVariables = Array.isArray(isKontrollvariablen) ? isKontrollvariablen : [isKontrollvariablen];
                }
                if (isVerhältnis && isVerhältnis !== "defaultVerhältnis") {
                    processData.ratio = isVerhältnis;
                }
                if (isScoreMethode && isScoreMethode !== "defaultScoreMethode") {
                    processData.scoreMethod = isScoreMethode;
                }
                if (isAlgorithmus && isAlgorithmus !== "defaultAlgo") {
                    processData.algorithm = isAlgorithmus;
                }
                if (isÜbereinstimmungswert && isÜbereinstimmungswert !== "defaultÜbereinstimmungswert") {
                    processData.matchValue = isÜbereinstimmungswert;
                }
                if (isErsetzung !== undefined) {
                    processData.replacement = isErsetzung;
                }
            } else if (isMatchingMethode === "Exaktes Matching") {
                // Exaktes Matching Parameter
                if (isFälleKontrollenGruppenindikator) {
                    processData.groupIndicator = isFälleKontrollenGruppenindikator;
                }
                if (isAllMatchingvariablen && isAllMatchingvariablen !== '') {
                    // Extrahiere die Namen der Matching-Variablen
                    const extractVariableNames = (variables) => {
                        if (Array.isArray(variables)) {
                            return variables.map(variable => {
                                if (typeof variable === 'object' && variable !== null) {
                                    return variable.var || variable.name || variable.label || variable.text || '';
                                }
                                return variable;
                            }).filter(name => name); // Entferne leere Namen
                        } else if (typeof variables === 'object' && variables !== null) {
                            const name = variables.var || variables.name || variables.label || variables.text || '';
                            return name ? [name] : [];
                        }
                        return [variables];
                    };
                    
                    processData.matchingVariables = extractVariableNames(isAllMatchingvariablen);
                }
                if (isMatchingtoleranz && isMatchingtoleranz !== '') {
                    processData.matchingTolerance = isMatchingtoleranz;
                }
                if (isVerhältnis && isVerhältnis !== "defaultVerhältnis") {
                    processData.ratio = isVerhältnis;
                }
            } else {
                // Fallback für andere Methoden
                if (isAlgorithmus && isAlgorithmus !== "defaultAlgo") {
                    processData.algorithm = isAlgorithmus;
                }
            }

            const result = await saveMatchingProcess(processData);
            
            if (result.success) {
                alert('Maske erfolgreich gespeichert!');
                setSaveDialogOpen(false);
                setProcessName('');
            }
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            alert('Fehler beim Speichern der Maske: ' + error.message);
        } finally {
            setSaving(false);
        }
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
        <>
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
                        <Button onClick={() => downloadCSV()} style={{ flexFlow: "column" }}>
                            <CollectionsBookmarkIcon sx={{ fontSize: "xxx-large" }} /> Datensatz <br /> herunterladen
                        </Button>
                        <Button 
                            onClick={handleSaveProcess} 
                            style={{ 
                                flexFlow: "column", 
                                color: isAuthenticated ? "#1976d2" : "grey" 
                            }}
                            disabled={!isAuthenticated}
                        >
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

        {/* Dialog zum Speichern der Maske */}
        <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Maske speichern</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name der Maske"
                    fullWidth
                    variant="outlined"
                    value={processName}
                    onChange={(e) => setProcessName(e.target.value)}
                    placeholder="z.B. Herzinsuffizienz Studie 2024"
                    sx={{ mt: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Die folgenden Einstellungen werden gespeichert:
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, pl: 2 }}>
                    • Matching-Methode: {isMatchingMethode}<br/>
                    {isMatchingMethode === "Propensity Score" ? (
                        <>
                            {isZielvariable && isZielvariable !== "defaultZielvariable" && (
                                <>• Zielvariable: {isZielvariable}<br/></>
                            )}
                            {isKontrollvariablen && isKontrollvariablen !== "defaultKontrollvariablen" && (
                                <>• Kontrollvariablen: {Array.isArray(isKontrollvariablen) ? isKontrollvariablen.length : isKontrollvariablen} Variable(n)<br/></>
                            )}
                            {isVerhältnis && isVerhältnis !== "defaultVerhältnis" && (
                                <>• Verhältnis: 1:{isVerhältnis}<br/></>
                            )}
                            {isScoreMethode && isScoreMethode !== "defaultScoreMethode" && (
                                <>• Score-Methode: {isScoreMethode}<br/></>
                            )}
                            {isAlgorithmus && isAlgorithmus !== "defaultAlgo" && (
                                <>• Algorithmus: {isAlgorithmus}<br/></>
                            )}
                            {isÜbereinstimmungswert && isÜbereinstimmungswert !== "defaultÜbereinstimmungswert" && (
                                <>• Übereinstimmungswert: ±{isÜbereinstimmungswert}<br/></>
                            )}
                            {isErsetzung !== undefined && (
                                <>• Ersetzung: {isErsetzung === "TRUE" || isErsetzung === true ? 'Ja' : 'Nein'}<br/></>
                            )}
                        </>
                    ) : isMatchingMethode === "Exaktes Matching" ? (
                        <>
                            {/* Exaktes Matching Parameter */}
                            {isFälleKontrollenGruppenindikator && (
                                <>• Vergleichsgruppen: {isFälleKontrollenGruppenindikator}<br/></>
                            )}
                            {isAllMatchingvariablen && isAllMatchingvariablen !== '' && (
                                <>• Matching-Variablen: {
                                    Array.isArray(isAllMatchingvariablen) 
                                        ? isAllMatchingvariablen.map(variable => 
                                            typeof variable === 'object' && variable !== null 
                                                ? variable.var || variable.name || variable.label || variable.text || ''
                                                : variable
                                          ).filter(name => name).join(', ')
                                        : (typeof isAllMatchingvariablen === 'object' && isAllMatchingvariablen !== null
                                            ? isAllMatchingvariablen.var || isAllMatchingvariablen.name || isAllMatchingvariablen.label || isAllMatchingvariablen.text || ''
                                            : isAllMatchingvariablen)
                                }<br/></>
                            )}
                            {isMatchingtoleranz && isMatchingtoleranz !== '' && (
                                <>• Matching-Toleranz: {
                                    Array.isArray(isMatchingtoleranz) 
                                        ? isMatchingtoleranz.map(tol => typeof tol === 'string' ? tol.trim() : tol).join(', ')
                                        : (typeof isMatchingtoleranz === 'object' 
                                            ? JSON.stringify(isMatchingtoleranz) 
                                            : isMatchingtoleranz)
                                }<br/></>
                            )}
                            {isVerhältnis && isVerhältnis !== "defaultVerhältnis" && (
                                <>• Matching-Verhältnis: 1:{isVerhältnis}<br/></>
                            )}
                        </>
                    ) : (
                        <>• Algorithmus: {isAlgorithmus}<br/></>
                    )}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setSaveDialogOpen(false)} disabled={saving}>
                    Abbrechen
                </Button>
                <Button 
                    onClick={saveCurrentProcess} 
                    variant="contained" 
                    disabled={saving || !processName.trim()}
                    sx={{ 
                        backgroundColor: "#1d4189",
                        "&:hover": { backgroundColor: "#1d4189" }
                    }}
                >
                    {saving ? 'Speichern...' : 'Speichern'}
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default Dataexport;
