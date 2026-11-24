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
import AppContext from '../../AppContext';
import {visitedSite} from "../NavB";
import Grid from '@mui/material/Grid';
import { useAuth } from '../../context/AuthContext';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import {matchingMethodLabel} from "../../model/matchingMethodLabel";
import {buildMatchingParameterRows} from "../../model/matchingParameters";
import {datensatzUmfang} from "../../model/datensatzUmfang";
import {buildMatchingProtokollMarkdown} from "../../model/protokollMarkdown";
import ArticleIcon from '@mui/icons-material/Article';

// EpiSelector color scheme (mirrors App.css and component color values)
const PDF_FARBEN = {
    primaer: [29, 65, 137],        // #1d4189 – primary blue (top nav, buttons)
    akzent: [177, 27, 24],         // #b11b18 – accent red (delete actions)
    primaerHell: [233, 240, 255],  // #e9f0ff – light blue (card heads)
    linien: [203, 214, 235],       // light blue for table grid
    textMuted: [102, 102, 102],    // #666666 – secondary text
};

function Dataexport() {
    const { isSummaryData, isResultData, isMatchingMethode, isErsetzung, setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setVerhältnisNav, setScoreMethode, setAlgorithmus, setErsetzung, setÜbereinstimmungswert, setDisclaimer, setWorkflow, setVollständigedatei, isZielvariable, isFälleKontrollenGruppenindikator, isErgebnisse, isKontrollvariablen, isVerhältnis, isScoreMethode, isAlgorithmus, isÜbereinstimmungswert, isToleranzBereich, isMatchingvariablen, isAllMatchingvariablen, isMatchingtoleranz, isAllKontrollvariablen, isDateiSpaltenNamen } = useContext(AppContext);
    const { user, isAuthenticated, saveMatchingProcess } = useAuth();
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [processName, setProcessName] = useState('');
    const [saving, setSaving] = useState(false);

    const columnHeader0 = isZielvariable === 'defaultZielvariable'? `${isFälleKontrollenGruppenindikator}=0` : `${isZielvariable}=0`;
    const columnHeader1 = isZielvariable === 'defaultZielvariable' ? `${isFälleKontrollenGruppenindikator}=1` : `${isZielvariable}=1`;

    // Shared data preparation for the PDF and Markdown exports of the matching protocol
    const protokollDaten = () => {
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

        // Fixed 4 decimals so the decimal points line up; non-numbers (e.g. "Balanced") pass through
        const formatiereZahl = (wert) => {
            if (wert === null || wert === undefined || wert === '') return '';
            const zahl = typeof wert === 'number' ? wert : Number(String(wert).trim());
            return Number.isFinite(zahl) ? zahl.toFixed(4) : String(wert);
        };

        // No || here: a legitimate 0 would be skipped as falsy
        const ersterWert = (...werte) => werte.find(w => w !== null && w !== undefined) ?? '';

        isSummaryData.forEach((variable, index) => {
            console.log(`Protokoll Export - Variable ${index}:`, variable);
            
            const ticketData = [
                variable.row_names || variable.Variable || "",
                formatiereZahl(ersterWert(variable.unadjusted_means_treated, variable.preMatchingIcu_mort0, variable.prematch_mean_treated)),
                formatiereZahl(ersterWert(variable.unadjusted_means_control, variable.preMatchingIcu_mort1, variable.prematch_mean_control)),
                formatiereZahl(ersterWert(variable.unadjusted_mean_diff, variable.preMatchingDif, variable.prematch_mean_diff)),
                formatiereZahl(ersterWert(variable.adjusted_means_treated, variable.postMatchingIcu_mort0, variable.postmatch_mean_treated)),
                formatiereZahl(ersterWert(variable.adjusted_means_control, variable.postMatchingIcu_mort1, variable.postmatch_mean_control)),
                formatiereZahl(ersterWert(variable.adjusted_mean_diff, variable.postMatchingDif, variable.postmatch_mean_diff)),
                variable.balance_covariats_post_matching || variable.balancePostMat || variable.balance_post_matching || "Balanced",
            ];
            
            console.log(`Protokoll Export - Processed ticketData for variable ${index}:`, ticketData);
            tableRows.push(ticketData);
        });

        const parameterRows = buildMatchingParameterRows({
            isMatchingMethode,
            isZielvariable,
            isFälleKontrollenGruppenindikator,
            isAllKontrollvariablen,
            isAllMatchingvariablen,
            isVerhältnis,
            isScoreMethode,
            isAlgorithmus,
            isErsetzung,
            isÜbereinstimmungswert,
            isMatchingtoleranz,
        });

        // Same source as the results screen (datensatzUmfang) so the export cannot diverge; the result-key union
        // would undercount because jsonlite drops keys that are NA in every row
        const umfang = datensatzUmfang(isDateiSpaltenNamen, isMatchingMethode);
        const ersteZeile = isSummaryData[0] || {};
        const vorFall = Number(ersteZeile.prematch_cases);
        const vorKontrolle = Number(ersteZeile.prematch_controls);
        const nachFall = Number(ersteZeile.postmatch_cases);
        const nachKontrolle = Number(ersteZeile.postmatch_controls);
        const counts = umfang.preVariablen > 0 && [vorFall, vorKontrolle, nachFall, nachKontrolle].every(Number.isFinite)
            ? {
                variablenPre: umfang.preVariablen,
                variablenPost: umfang.postVariablen,
                vorFall, vorKontrolle, nachFall, nachKontrolle,
            }
            : null;

        return { tableColumn, tableRows, parameterRows, counts };
    };

    const Matchingprotokoll = () => {
        if (!isSummaryData || !Array.isArray(isSummaryData) || isSummaryData.length === 0) {
            alert("Fehler: Keine Summary-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }
        
        const { tableColumn, tableRows, parameterRows, counts } = protokollDaten();

        const date = new Date().toString().split(" ");
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        
        const newDoc = new jsPDF();
        
        newDoc.setFontSize(20);
        newDoc.setTextColor(...PDF_FARBEN.primaer);
        newDoc.setFont('helvetica', 'bold');
        newDoc.text("Matching Protokoll", 14, 15);
        newDoc.setFont('helvetica', 'normal');
        
        let startY = 25;
        if (parameterRows.length > 0) {
            newDoc.autoTable({
                head: [["Matching-Parameter", "Einstellung"]],
                body: parameterRows,
                startY: startY,
                theme: 'grid',
                styles: { lineColor: PDF_FARBEN.linien },
                columnStyles: { 0: { cellWidth: 55, fontStyle: 'bold' } },
                headStyles: { fillColor: PDF_FARBEN.primaer, textColor: 255 },
                alternateRowStyles: { fillColor: PDF_FARBEN.primaerHell }
            });
            startY = newDoc.lastAutoTable.finalY + 10;
        }
        
        // Break heading + counts + table to a new page when space runs out
        if (startY > 250) {
            newDoc.addPage();
            startY = 15;
        }
        // "Matching Ergebnisse" as a level-1 heading, same style as the document title
        newDoc.setFontSize(20);
        newDoc.setTextColor(...PDF_FARBEN.primaer);
        newDoc.setFont('helvetica', 'bold');
        newDoc.text("Matching Ergebnisse", 14, startY);
        newDoc.setFont('helvetica', 'normal');
        startY += 10;
        
        if (counts) {
            const { variablenPre, variablenPost, vorFall, vorKontrolle, nachFall, nachKontrolle } = counts;
            newDoc.setFontSize(9);
            newDoc.setTextColor(...PDF_FARBEN.akzent);
            newDoc.text(`Pre-Matching: ${variablenPre} Variablen, ${vorFall + vorKontrolle} Beobachtungen`, 14, startY);
            newDoc.setTextColor(...PDF_FARBEN.primaer);
            newDoc.text(`Post-Matching: ${variablenPost} Variablen, ${nachFall + nachKontrolle} Beobachtungen`, 14, startY + 5);
            startY += 5 + 4;
        }
        
        // Columns 1-6 (means/differences) right-aligned so the decimal points line up exactly
        const spaltenAusrichtung = ['left', 'right', 'right', 'right', 'right', 'right', 'right', 'center'];
        const kopfZellen = tableColumn.map((titel, index) => ({
            content: titel,
            styles: { halign: spaltenAusrichtung[index] },
        }));
        
        // Pre/Post band spans the column groups via colSpan (instead of a separate 9-column table)
        const vorkopfZellen = [
            { content: "", styles: { fillColor: PDF_FARBEN.primaerHell } },
            {
                content: "Pre-Matching",
                colSpan: 3,
                styles: { fillColor: PDF_FARBEN.akzent, textColor: 255, halign: 'center', fontStyle: 'bold' },
            },
            {
                content: "Post-Matching",
                colSpan: 3,
                styles: { fillColor: PDF_FARBEN.primaer, textColor: 255, halign: 'center', fontStyle: 'bold' },
            },
            { content: "", styles: { fillColor: PDF_FARBEN.primaerHell } },
        ];
        
        newDoc.autoTable({
            head: [vorkopfZellen, kopfZellen],
            body: tableRows,
            startY: startY,
            theme: 'striped',
            styles: { lineColor: PDF_FARBEN.linien },
            headStyles: { fillColor: PDF_FARBEN.primaer, textColor: 255 },
            alternateRowStyles: { fillColor: PDF_FARBEN.primaerHell },
            columnStyles: {
                0: { halign: 'left' },
                1: { halign: 'right' },
                2: { halign: 'right' },
                3: { halign: 'right' },
                4: { halign: 'right' },
                5: { halign: 'right' },
                6: { halign: 'right' },
                7: { halign: 'center' },
            },
        });
        
        // Break legend to a new page when space runs out
        let legendenY = newDoc.lastAutoTable.finalY + 6;
        if (legendenY > 270) {
            newDoc.addPage();
            legendenY = 15;
        }
        newDoc.setFontSize(8);
        newDoc.setTextColor(...PDF_FARBEN.textMuted);
        newDoc.text("PS: Propensity Score", 14, legendenY);
        newDoc.text("stetige Variablen: Mittelwert bzw. standardisierte Mittelwertsdifferenz (SMD)", 14, legendenY + 4);
        newDoc.text("kategoriale Variablen: Anteile bzw. rohe Differenz in den Anteilen", 14, legendenY + 8);
        
        newDoc.save(`matchingprotokoll${dateStr}.pdf`);
    };

    const downloadCSV = () => {
        if (!isResultData || !Array.isArray(isResultData) || isResultData.length === 0) {
            alert("Fehler: Keine Result-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }
        
        console.log("CSV Export - isResultData:", isResultData);
        
        // Header: named dataset columns first (all-NA columns survive jsonlite's omission of NA keys), leftover result keys appended
        const datensatzSpalten = (Array.isArray(isDateiSpaltenNamen) ? isDateiSpaltenNamen : [])
            .filter(name => typeof name === 'string' && name.trim() !== '');
        const allKeys = [...new Set(isResultData.flatMap(row => Object.keys(row)))];
        const firstRowKeys = Object.keys(isResultData[0]);
        const headers = datensatzSpalten.length > 0
            ? datensatzSpalten.concat(allKeys.filter(key => !datensatzSpalten.includes(key)))
            : firstRowKeys.concat(allKeys.filter(key => !firstRowKeys.includes(key)));
        
        // With replacement, MatchIt assigns no pair IDs (one control can serve several pairs) and match.data() drops the MatchingID column entirely
        const hasMatchingID = isResultData.some(
            row => Object.prototype.hasOwnProperty.call(row, 'MatchingID')
        );
        if (!hasMatchingID) {
            alert(
                'Hinweis: Der exportierte Datensatz enthält keine Spalte "MatchingID".\n\n' +
                'Bei Matching mit Zurücklegen (Ersetzung) vergibt MatchIt keine Paar-IDs, da dieselbe ' +
                'Kontrolleinheit mehreren Paaren zugehören kann. Die Spalte erscheint bei Matching ohne ' +
                'Zurücklegen sowie bei Exaktem und Optimalem Matching.'
            );
        }
        
        let csvContent = headers.join(',') + '\n';
        
        isResultData.forEach(row => {
            const values = headers.map(header => {
                let value = row[header];
                // Rows without this key (e.g. MatchingID of unmatched units) export as empty cells
                if (value === undefined || value === null) {
                    return '';
                }
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += values.join(',') + '\n';
        });
        
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

    // Markdown export of the matching protocol: same content as the PDF, formatting in model/protokollMarkdown.js
    const downloadMarkdown = () => {
        if (!isSummaryData || !Array.isArray(isSummaryData) || isSummaryData.length === 0) {
            alert("Fehler: Keine Summary-Daten verfügbar. Bitte führen Sie zuerst das Matching durch.");
            return;
        }

        const markdown = buildMatchingProtokollMarkdown(protokollDaten());

        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);

            const date = new Date().toString().split(" ");
            const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
            link.setAttribute('download', `matchingprotokoll${dateStr}.md`);

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
            const backendData = {
                groupindicator: null,
                controllvariables: [],
                mmethod: isMatchingMethode || null,
                mdistance: null,
                mscoremethod: null,
                mreplace: false,
                mratio: null,
                mcaliper: null,
                mcalipervariables: null,
                dataset_json: '',
            };

            if (isMatchingMethode === "Propensity Score") {
                // Effective group indicator: target variable if set, otherwise the chosen group indicator (mirrors the protocol column heads)
                backendData.groupindicator = isZielvariable !== "defaultZielvariable"
                    ? isZielvariable
                    : (isFälleKontrollenGruppenindikator && isFälleKontrollenGruppenindikator !== 'defaultFälleKontrollenGruppenindikator'
                        ? isFälleKontrollenGruppenindikator
                        : null);
                
                if (isAllKontrollvariablen && Array.isArray(isAllKontrollvariablen)) {
                    backendData.controllvariables = isAllKontrollvariablen.map(variable => 
                        typeof variable === 'object' && variable !== null 
                            ? variable.var || variable.name || variable.label || variable.text || variable
                            : variable
                    ).filter(name => name);
                }
                
                backendData.mdistance = isAlgorithmus !== "defaultAlgo" ? isAlgorithmus : 'nearest';
                
                backendData.mscoremethod = isScoreMethode && isScoreMethode !== "defaultScoreMethode" ? isScoreMethode : null;
                
                backendData.mreplace = isErsetzung === "TRUE" || isErsetzung === true;
                backendData.mratio = isVerhältnis !== "defaultVerhältnis" ? parseInt(isVerhältnis) : 1;
                
                if (isÜbereinstimmungswert && isÜbereinstimmungswert !== "defaultÜbereinstimmungswert") {
                    backendData.mcaliper = parseFloat(isÜbereinstimmungswert);
                }
                
            } else if (isMatchingMethode === "Exaktes Matching") {
                backendData.groupindicator = isFälleKontrollenGruppenindikator || null;
                
                if (isAllMatchingvariablen) {
                    const extractVariableNames = (variables) => {
                        if (Array.isArray(variables)) {
                            return variables.map(variable => {
                                if (typeof variable === 'object' && variable !== null) {
                                    return variable.var || variable.name || variable.label || variable.text || '';
                                }
                                return variable;
                            }).filter(name => name);
                        } else if (typeof variables === 'object' && variables !== null) {
                            const name = variables.var || variables.name || variables.label || variables.text || '';
                            return name ? [name] : [];
                        }
                        return [variables];
                    };
                    backendData.controllvariables = extractVariableNames(isAllMatchingvariablen);
                }
                
                backendData.mdistance = 'exact';
                backendData.mratio = isVerhältnis !== "defaultVerhältnis" ? parseInt(isVerhältnis) : 1;
                
                // Tolerances stored per-variable so each entry maps to mcalipervariables (parseFloat on the whole array would only take the first value)
                if (isMatchingtoleranz && isMatchingtoleranz !== '') {
                    backendData.mcaliper = Array.isArray(isMatchingtoleranz)
                        ? isMatchingtoleranz.map(toleranz => {
                            if (typeof toleranz === 'number') return Number.isFinite(toleranz) ? toleranz : null;
                            if (typeof toleranz === 'string' && toleranz.trim() !== '') {
                                const wert = parseFloat(toleranz.trim());
                                return Number.isFinite(wert) ? wert : null;
                            }
                            return null;
                        })
                        : parseFloat(isMatchingtoleranz);
                    backendData.mcalipervariables = backendData.controllvariables;
                }
            }

            if (isResultData && Array.isArray(isResultData)) {
                backendData.dataset_json = JSON.stringify(isResultData);
            } else {
                backendData.dataset_json = JSON.stringify([]);
            }

            console.log('💾 Sending to Django Backend:', backendData);
            
            const result = await saveMatchingProcess(backendData);
            
            if (result.success) {
                alert('Maske erfolgreich gespeichert!');
                setSaveDialogOpen(false);
                setProcessName('');
                console.log('✅ Matching-Prozess erfolgreich im Backend gespeichert');
            } else {
                throw new Error(result.message || 'Fehler beim Speichern');
            }
        } catch (error) {
            console.error('❌ Fehler beim Speichern:', error);
            alert('Fehler beim Speichern der Maske: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        setDisclaimer(false);
    }, [setDisclaimer]);

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
                            <SimCardDownloadIcon sx={{ fontSize: "xxx-large" }} /> Matchingprotokoll <br />herunterladen (PDF)
                        </Button>
                        <Button onClick={() => downloadMarkdown()} style={{ flexFlow: "column" }}>
                            <ArticleIcon sx={{ fontSize: "xxx-large" }} /> Matchingprotokoll <br />herunterladen (Markdown)
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
                    placeholder="z. B. Herzinsuffizienz-Studie 2024"
                    sx={{ mt: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Die folgenden Einstellungen werden gespeichert:
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, pl: 2 }}>
                    • Matching-Methode: {matchingMethodLabel(isMatchingMethode)}<br/>
                    {isMatchingMethode === "Propensity Score" ? (
                        <>
                            {isZielvariable && isZielvariable !== "defaultZielvariable" && (
                                <>• Zielvariable: {isZielvariable}<br/></>
                            )}
                            {isKontrollvariablen && isKontrollvariablen !== "defaultKontrollvariablen" && isKontrollvariablen.length > 0 && (
                                <>• Kontrollvariablen: {
                                    (() => {
                                        // isAllKontrollvariablen holds the actual variable names; isKontrollvariablen may hold a display string
                                        const variables = isAllKontrollvariablen || isKontrollvariablen;
                                        console.log('DEBUG variables:', variables, 'Type:', typeof variables, 'IsArray:', Array.isArray(variables));
                                        
                                        if (Array.isArray(variables)) {
                                            return variables.map(variable => 
                                                typeof variable === 'object' && variable !== null 
                                                    ? variable.var || variable.name || variable.label || variable.text || variable
                                                    : variable
                                            ).filter(name => name).join(', ');
                                        }
                                        
                                        if (typeof variables === 'string' && variables.includes('Kontrollvariablen')) {
                                            return 'Kontrollvariablen ausgewählt (Details nicht verfügbar)';
                                        }
                                        
                                        return variables;
                                    })()
                                }<br/></>
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
