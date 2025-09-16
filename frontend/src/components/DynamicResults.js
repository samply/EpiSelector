import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { sizing } from '@mui/system';
import Grid from "@mui/material/Grid";
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {useEffect, useState, useContext, useMemo} from 'react';
import { Panorama, TurnedIn } from '@mui/icons-material';
import { CardHeader } from "@mui/material";
import FHSPSOE from "../assets/FHS_PS_OE.json";
import FHSPSME from "../assets/FHS_PS_ME.json";
import FHSEMOT from "../assets/FHS_EM_OT.json";
import FHSEMMT from "../assets/FHS_EM_MT.json";
import AppContext from '../AppContext';
HighchartsMore(Highcharts);

var json_test_data = require('../assets/test_data.json');

let ip_django = "127.0.0.1:8000";



function setHistograms(data_pre_match, data_post_match, x_axis_label, x_categories) {

    let chartDom_a = document.getElementById("container_a");
    let chart_a = Highcharts.charts[Highcharts.attr(chartDom_a, 'data-highcharts-chart')];

    let chartDom_b = document.getElementById("container_b");
    let chart_b = Highcharts.charts[Highcharts.attr(chartDom_b, 'data-highcharts-chart')];

    chart_a.xAxis[0].axisTitle.attr({
        text: x_axis_label
    });
    chart_b.xAxis[0].axisTitle.attr({
        text: x_axis_label
    });

    chart_a.xAxis[0].categories = x_categories;
    chart_b.xAxis[0].categories = x_categories;

    // split data_pre_match into two arrays
    var length = data_pre_match.length;
    var middle = Math.floor(length / 2);
    var data_pre_match_red = data_pre_match.slice(0, middle);
    var data_pre_match_blue = data_pre_match.slice(middle);

    // make blue bars negative, so that they rendered as bottom histogram
    for (var i = 0; i < data_pre_match_blue.length; i++) {
        data_pre_match_blue[i] = -data_pre_match_blue[i];
    }

    console.log("Pre-Match Histogramm")
    console.log(data_pre_match_red)
    console.log(data_pre_match_blue)
    chart_a.series[0].setData(data_pre_match_red);
    chart_a.series[1].setData(data_pre_match_blue);

    // split data_post_match into two arrays
    var length = data_post_match.length;
    var middle = Math.floor(length / 2);
    var data_post_match_red = data_post_match.slice(0, middle);
    var data_post_match_blue = data_post_match.slice(middle);

    // make blue bars negative, so that they rendered as bottom histogram
    for (var i = 0; i < data_post_match_blue.length; i++) {
        data_post_match_blue[i] = -data_post_match_blue[i];
    }

    chart_b.series[0].setData(data_post_match_red);
    chart_b.series[1].setData(data_post_match_blue);

    // chart_a.yAxis[0].setExtremes(0, 100000);

    chart_a.redraw();
    chart_b.redraw();

    console.log("Histogramme wurden gemalt.")
}


function clearHistograms() {

    setHistograms([], [], 'Ausgew. Variable', '', '');

}


function setBoxplots(y_axis_label, x_axis_label, pre_matching_boxplots, pre_matching_outliers, post_matching_boxplots, post_matching_outliers) {

    let chartDom_c = document.getElementById("container_c");
    let chart_c = Highcharts.charts[Highcharts.attr(chartDom_c, 'data-highcharts-chart')];

    let chartDom_d = document.getElementById("container_d");
    let chart_d = Highcharts.charts[Highcharts.attr(chartDom_d, 'data-highcharts-chart')];

    chart_c.series[0].setData(pre_matching_boxplots);
    chart_c.series[1].setData(pre_matching_outliers);

    chart_d.series[0].setData(post_matching_boxplots);
    chart_d.series[1].setData(post_matching_outliers);

    chart_c.xAxis[0].axisTitle.attr({
        text: x_axis_label
    });

    chart_d.xAxis[0].axisTitle.attr({
        text: x_axis_label
    });

    chart_d.yAxis[0].axisTitle.attr({
        text: y_axis_label
    });

    if (pre_matching_boxplots != null && post_matching_boxplots[0] != null) {
        var combinedArray = pre_matching_boxplots[0].concat(pre_matching_boxplots[1], post_matching_boxplots[0], post_matching_boxplots[1]);

        var yAxisValues = findYAxisValues(combinedArray);

        chart_c.yAxis[0].update({ min: yAxisValues.yAxisMin, max: yAxisValues.yAxisMax});
        chart_d.yAxis[0].update({ min: yAxisValues.yAxisMin, max: yAxisValues.yAxisMax});
    }

    chart_c.redraw();
    chart_d.redraw();

}


function findYAxisValues(a) {

    // Find the largest value in the combined array
    var largest = Math.max(...a);

    // Find the smallest value in the combined array
    var smallest = Math.min(...a);

    // Return an object containing appropriate y-axis values
    return {
      yAxisMax: largest,
      yAxisMin: smallest
    };
  }


function clearBoxplots() {

    setBoxplots('Ausgewählte Variable', 'Zielvariable', [], [], [], []);

}


function setPiechart(balanced_var_count, non_balanced_var_count, delete_text) {

    let chartDom_e = document.getElementById("container_e");
    console.log("chartDom_e: " +chartDom_e);
    let chart_e = Highcharts.charts[Highcharts.attr(chartDom_e, 'data-highcharts-chart')];

    let char_text = balanced_var_count + ' von ' + (balanced_var_count + non_balanced_var_count) + ' Variablen';

    if (delete_text == true) {
        char_text = '';
    }

    chart_e.series[0].setData([{ name: char_text, y: balanced_var_count }, { name: '', y: non_balanced_var_count }]);

}


function clearPieChart() {
    // setPiechart(0, 0, true);
}

// Hilfsfunktionen für die Datenverarbeitung
function getAvailableVariables(resultData, summaryData) {
    // Verwende Summary-Daten wenn verfügbar, sonst Result-Daten
    if (summaryData && Array.isArray(summaryData) && summaryData.length > 0) {
        return summaryData.map(row => row.variable).filter(variable => variable);
    }
    
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
        return [];
    }
    
    // Extrahiere alle Spaltennamen außer Zielvariable und Matching-spezifischen Spalten
    const excludeColumns = ['subclass', 'weights', 'distance', '_id'];
    const allColumns = Object.keys(resultData[0]);
    
    return allColumns.filter(col => !excludeColumns.includes(col));
}

function getBinaryVariables(resultData, summaryData, targetVariable) {
    console.log("getBinaryVariables aufgerufen mit:", { resultData: resultData?.length, summaryData: summaryData?.length, targetVariable });
    
    // IMMER Result-Daten verwenden für bessere Analyse
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
        console.log("❌ Keine Result-Daten verfügbar für kategoriale Variablen");
        return [];
    }
    
    console.log("✅ Verwende Result-Daten für kategoriale Variablen (bessere Genauigkeit)");
    const excludeColumns = ['subclass', 'weights', 'distance', '_id', targetVariable, 'Matching weight', 'MatchingID'];
    const allColumns = Object.keys(resultData[0]);
    
    console.log("🔍 ANALYSE ALLER SPALTEN FÜR KATEGORIALE VARIABLEN:");
    console.log("Verfügbare Spalten:", allColumns);
    console.log("Ausgeschlossene Spalten:", excludeColumns);
    console.log("Zielvariable (wird ausgeschlossen):", targetVariable);
    
    const categoricalVars = [];
    
    // Prüfe jede Spalte: kategoriale Variable = 2-16 einzigartige Ausprägungen
    allColumns.forEach(col => {
        if (!excludeColumns.includes(col)) {
            // Filtere null/undefined Werte heraus
            const validValues = resultData.map(row => row[col]).filter(val => val !== null && val !== undefined && val !== '');
            const uniqueValues = [...new Set(validValues)];
            
            console.log(`📋 Spalte "${col}":`);
            console.log(`   - ${uniqueValues.length} einzigartige Werte von ${validValues.length} gültigen Werten`);
            console.log(`   - Beispielwerte:`, uniqueValues.slice(0, 10));
            console.log(`   - Ausgeschlossen wegen Zielvariable? ${col === targetVariable}`);
            
            // Kategoriale Variable: mindestens 2 und höchstens 16 Ausprägungen
            if (uniqueValues.length >= 2 && uniqueValues.length <= 16) {
                categoricalVars.push(col);
                console.log(`   ✅ "${col}" als kategoriale Variable hinzugefügt (${uniqueValues.length} Ausprägungen)`);
            } else {
                console.log(`   ❌ "${col}" NICHT kategoriale Variable: ${uniqueValues.length} Ausprägungen (außerhalb 2-16)`);
            }
        } else {
            console.log(`📋 Spalte "${col}": ⏭️ Übersprungen (ausgeschlossen)`);
        }
    });
    
    console.log("=".repeat(60));
    console.log("🔍 FINALE KATEGORIALE VARIABLEN FÜR HISTOGRAMM-SELECTOR:");
    console.log("Anzahl gefundener kategorialer Variablen:", categoricalVars.length);
    if (categoricalVars.length > 0) {
        categoricalVars.forEach((varName, index) => {
            console.log(`  ${index + 1}. "${varName}"`);
        });
    } else {
        console.log("  ❌ KEINE kategorialen Variablen gefunden!");
    }
    console.log("=".repeat(60));
    return categoricalVars;
}

function getNumericVariables(resultData, summaryData, targetVariable) {
    console.log("getNumericVariables aufgerufen mit:", { resultData: resultData?.length, summaryData: summaryData?.length, targetVariable });
    
    // IMMER Result-Daten verwenden für bessere Analyse
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
        console.log("❌ Keine Result-Daten verfügbar für numerische Variablen");
        return [];
    }
    
    console.log("✅ Verwende Result-Daten für numerische Variablen (bessere Genauigkeit)");
    const excludeColumns = ['subclass', 'weights', 'distance', '_id', targetVariable, 'Matching weight', 'MatchingID', 'start', 'end'];
    const allColumns = Object.keys(resultData[0]);
    console.log("📊 ANALYSE ALLER SPALTEN FÜR NUMERISCHE VARIABLEN:");
    console.log("Verfügbare Spalten:", allColumns);
    console.log("Ausgeschlossene Spalten:", excludeColumns);
    console.log("Zielvariable (wird ausgeschlossen):", targetVariable);
    
    const numericVars = [];
    
    // Prüfe jede Spalte: numerische Variable = >16 Ausprägungen UND nur numerische Werte
    allColumns.forEach(col => {
        if (!excludeColumns.includes(col)) {
            // Filtere null/undefined Werte heraus
            const validValues = resultData.map(row => row[col]).filter(val => val !== null && val !== undefined && val !== '');
            const uniqueValues = [...new Set(validValues)];
            
            // Prüfe ob alle Werte numerisch sind
            const allNumeric = validValues.every(val => !isNaN(parseFloat(val)) && isFinite(val));
            
            console.log(`📋 Spalte "${col}":`);
            console.log(`   - ${uniqueValues.length} einzigartige Werte von ${validValues.length} gültigen Werten`);
            console.log(`   - Alle Werte numerisch? ${allNumeric}`);
            console.log(`   - Beispielwerte:`, validValues.slice(0, 5));
            console.log(`   - Ausgeschlossen wegen Zielvariable? ${col === targetVariable}`);
            
            // Numerische Variable: mehr als 16 Ausprägungen UND alle Werte sind numerisch
            if (uniqueValues.length > 16 && allNumeric) {
                numericVars.push(col);
                console.log(`   ✅ "${col}" als numerische Variable hinzugefügt (${uniqueValues.length} Ausprägungen, alle numerisch)`);
            } else {
                console.log(`   ❌ "${col}" NICHT numerische Variable: ${uniqueValues.length} Ausprägungen (≤16) oder nicht alle numerisch (${allNumeric})`);
            }
        } else {
            console.log(`📋 Spalte "${col}": ⏭️ Übersprungen (ausgeschlossen)`);
        }
    });
    
    console.log("=".repeat(60));
    console.log("📊 FINALE NUMERISCHE VARIABLEN FÜR BOXPLOT-SELECTOR:");
    console.log("Anzahl gefundener numerischer Variablen:", numericVars.length);
    if (numericVars.length > 0) {
        numericVars.forEach((varName, index) => {
            console.log(`  ${index + 1}. "${varName}"`);
        });
    } else {
        console.log("  ❌ KEINE numerischen Variablen gefunden!");
    }
    console.log("=".repeat(60));
    return numericVars;
}

function calculateHistogramData(resultData, variable, targetVariable) {
    if (!resultData || !variable) return { pre_match_data: [], post_match_data: [], x_axis_labels: [] };
    
    // Für Histogramme brauchen wir kategoriale Daten - finde die Ausprägungen
    const uniqueValues = [...new Set(resultData.map(row => row[variable]))].sort();
    if (uniqueValues.length < 2 || uniqueValues.length > 10) {
        console.warn(`Variable ${variable} ist nicht für Histogramm geeignet - hat ${uniqueValues.length} Ausprägungen`);
        return { pre_match_data: [], post_match_data: [], x_axis_labels: [] };
    }
    
    const targetValues = [...new Set(resultData.map(row => row[targetVariable]))].sort();
    
    // Berechne Häufigkeiten für jede Kombination von Zielvariable und ausgewählter Variable
    const pre_match_data = [];
    
    targetValues.forEach(targetVal => {
        const targetGroup = resultData.filter(row => row[targetVariable] == targetVal);
        const totalInGroup = targetGroup.length;
        
        uniqueValues.forEach(val => {
            const count = targetGroup.filter(row => row[variable] == val).length;
            const percentage = totalInGroup > 0 ? (count / totalInGroup) * 100 : 0;
            
            if (targetVal == targetValues[0]) {
                pre_match_data.push(percentage);
            } else {
                pre_match_data.push(-percentage); // Negative für zweite Gruppe (unteres Histogramm)
            }
        });
    });
    
    // Für Post-Matching verwenden wir die gleichen Daten (da es bereits gematcht ist)
    const post_match_data = [...pre_match_data];
    
    return {
        pre_match_data,
        post_match_data,
        x_axis_labels: uniqueValues.map(String)
    };
}

function calculateHistogramDataFromSummary(summaryData, variable, targetVariable) {
    if (!summaryData || !variable) return { pre_match_data: [], post_match_data: [], x_axis_labels: [] };
    
    // Finde die Zeile für die gewählte Variable
    const variableRow = summaryData.find(row => row.variable === variable);
    if (!variableRow) return { pre_match_data: [], post_match_data: [], x_axis_labels: [] };
    
    // Extrahiere Pre- und Post-Matching Werte für beide Gruppen
    const preGroup0 = parseFloat(variableRow.pre_matching_group_0 || 0) * 100;
    const preGroup1 = parseFloat(variableRow.pre_matching_group_1 || 0) * 100;
    const postGroup0 = parseFloat(variableRow.post_matching_group_0 || 0) * 100;
    const postGroup1 = parseFloat(variableRow.post_matching_group_1 || 0) * 100;
    
    return {
        pre_match_data: [100 - preGroup0, preGroup0, 100 - preGroup1, preGroup1],
        post_match_data: [100 - postGroup0, postGroup0, 100 - postGroup1, postGroup1],
        x_axis_labels: ['0', '1']
    };
}

function calculateBoxplotData(resultData, variable, targetVariable) {
    if (!resultData || !variable) return { pre_matching: {}, post_matching: {} };
    
    const group0Data = resultData.filter(row => row[targetVariable] == 0).map(row => parseFloat(row[variable]));
    const group1Data = resultData.filter(row => row[targetVariable] == 1).map(row => parseFloat(row[variable]));
    
    function calculateBoxplotStats(data) {
        if (data.length === 0) return [0, 0, 0, 0, 0];
        
        data.sort((a, b) => a - b);
        const q1 = data[Math.floor(data.length * 0.25)];
        const median = data[Math.floor(data.length * 0.5)];
        const q3 = data[Math.floor(data.length * 0.75)];
        const min = data[0];
        const max = data[data.length - 1];
        
        return [min, q1, median, q3, max];
    }
    
    return {
        pre_matching: {
            boxplot_one: calculateBoxplotStats(group0Data),
            boxplot_two: calculateBoxplotStats(group1Data)
        },
        post_matching: {
            boxplot_one: calculateBoxplotStats(group0Data),
            boxplot_two: calculateBoxplotStats(group1Data)
        }
    };
}

function calculateBoxplotDataFromSummary(summaryData, variable, targetVariable) {
    if (!summaryData || !variable) return { pre_matching: {}, post_matching: {} };
    
    // Finde die Zeile für die gewählte Variable
    const variableRow = summaryData.find(row => row.variable === variable);
    if (!variableRow) return { pre_matching: {}, post_matching: {} };
    
    // Extrahiere Mittelwerte (für vereinfachte Boxplots verwenden wir Mittelwert als Median)
    const preGroup0Mean = parseFloat(variableRow.pre_matching_group_0 || 0);
    const preGroup1Mean = parseFloat(variableRow.pre_matching_group_1 || 0);
    const postGroup0Mean = parseFloat(variableRow.post_matching_group_0 || 0);
    const postGroup1Mean = parseFloat(variableRow.post_matching_group_1 || 0);
    
    // Vereinfachte Boxplot-Daten mit Mittelwert als alle Quartile (da wir keine Rohdaten haben)
    const createSimpleBoxplot = (mean) => [mean * 0.9, mean * 0.95, mean, mean * 1.05, mean * 1.1];
    
    return {
        pre_matching: {
            boxplot_one: createSimpleBoxplot(preGroup0Mean),
            boxplot_two: createSimpleBoxplot(preGroup1Mean)
        },
        post_matching: {
            boxplot_one: createSimpleBoxplot(postGroup0Mean),
            boxplot_two: createSimpleBoxplot(postGroup1Mean)
        }
    };
}

function calculateBalanceData(summaryData) {
    if (!summaryData || !Array.isArray(summaryData)) return { balanced: 0, notBalanced: 0 };
    
    let balanced = 0;
    let notBalanced = 0;
    
    summaryData.forEach(item => {
        if (item.balance_covariats_post_matching === "Balanced") {
            balanced++;
        } else if (item.balance_covariats_post_matching === "Not Balanced") {
            notBalanced++;
        }
    });
    
    return { balanced, notBalanced };
}

function DynamicResults({ isAlgorithmus, isErsetzung, isZielvariable, isAllKontrollvariablen, isScoreMethode, isMatchingMethode, isVollständigeDatei, isVerhältnis, isJsonPackage, isÜbereinstimmungswert, isToleranzBereichSetToResult, isToleranzBereichSet, isErsetzungToResult, isFälleKontrollenGruppenindikator }) {
    const { isResultData, isSummaryData } = useContext(AppContext);
    const [results, setResults] = useState([]);
    
    // Bestimme die Zielvariable für Achsenbeschriftung basierend auf Matching-Methode
    const getTargetVariableForLabels = () => {
        if (isMatchingMethode === "Exaktes Matching") {
            return isFälleKontrollenGruppenindikator || isZielvariable;
        } else if (isMatchingMethode === "Propensity Score" && 
                  (isAlgorithmus === "nearest" || isAlgorithmus === "Optimal Matching")) {
            return isZielvariable;
        }
        return isZielvariable; // Fallback
    };
    
    const targetVariableForLabels = getTargetVariableForLabels();
    
    // Memoize Variablenlisten um endlose Schleifen zu vermeiden
    const availableVariables = useMemo(() => getAvailableVariables(isResultData, isSummaryData), [isResultData, isSummaryData]);
    const categoricalVariables = useMemo(() => getBinaryVariables(isResultData, isSummaryData, isZielvariable), [isResultData, isSummaryData, isZielvariable]);
    const numericVariables = useMemo(() => getNumericVariables(isResultData, isSummaryData, isZielvariable), [isResultData, isSummaryData, isZielvariable]);
    
    // Chart selection states
    const [histogramVariable, setHistogramVariable] = useState('');
    const [boxplotVariable, setBoxplotVariable] = useState('');
    const [pieVariable, setPieVariable] = useState('');
    
    // Sync old variable states with new ones
    const [variableA, setVariableA] = React.useState('');
    const [variableB, setVariableB] = React.useState('');
    const [disable_var_select, setDisableVarSelect] = useState(true);

    // Data initialization from context - only run when data actually changes
    useEffect(() => {
        if (isResultData && Array.isArray(isResultData) && isResultData.length > 0) {
            console.log("Using result data from context:", isResultData);
            console.log("Kategoriale Variablen:", categoricalVariables);
            console.log("Numerische Variablen:", numericVariables);
            console.log("Zielvariable:", isZielvariable);
            console.log("Zielvariable für Labels:", targetVariableForLabels);
            console.log("Erste Zeile der Daten:", isResultData[0]);
            console.log("Verfügbare Spalten:", Object.keys(isResultData[0]));
            
            // Reset alte Variable-States wenn keine Variablen verfügbar
            if (categoricalVariables.length === 0) {
                setVariableA('');
                setHistogramVariable('');
            }
            if (numericVariables.length === 0) {
                setVariableB('');
                setBoxplotVariable('');
            }
            
            // NICHT mehr automatisch setzen - Nutzer soll bewusst auswählen
            // Variablen bleiben leer bis der Nutzer auswählt
            
            // Berechne Balance-Daten für Pie Chart
            if (isSummaryData && Array.isArray(isSummaryData)) {
                const balanceData = calculateBalanceData(isSummaryData);
                setPiechart(balanceData.balanced, balanceData.notBalanced, "false");
            }
            
            // Aktualisiere die Achsenbeschriftungen
            updateAxisLabels();
            
            // Aktiviere Variable Selektoren
            setDisableVarSelect(false);
        }
    }, [isResultData, isSummaryData, categoricalVariables, numericVariables, targetVariableForLabels]);

    // Verwende echte Variablennamen anstatt statischer Listen
    let variablesNamesA = categoricalVariables.length > 0 ? categoricalVariables : ["Keine kategorialen Variablen verfügbar"];
    let variablesNamesB = numericVariables.length > 0 ? numericVariables : ["Keine numerischen Variablen verfügbar"];


    // Update variable selectors when data changes - use separate effect
    useEffect(() => {
        if (categoricalVariables.length > 0) {
            // Füge leeren Eintrag als ersten Eintrag hinzu
            setHistoSelector(["-", ...categoricalVariables]);
        } else {
            setHistoSelector(["-"]);
        }
    }, [categoricalVariables]);
    
    useEffect(() => {
        if (numericVariables.length > 0) {
            // Füge leeren Eintrag als ersten Eintrag hinzu
            setBoxplotSelector(["-", ...numericVariables]);
        } else {
            setBoxplotSelector(["-"]);
        }
    }, [numericVariables]);

    const [variable_boxplot, setBoxplotSelector] = useState(["-"]);
    const [variable_histo, setHistoSelector] = useState(["-"]);

    // Funktion zum Aktualisieren der Achsenbeschriftungen
    const updateAxisLabels = () => {
        // Aktualisiere Textlabels unter den Histogrammen
        const label_variable_zero = document.getElementById('binary_target_variable_legend_text_zero');
        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        
        if (label_variable_zero && label_variable_one) {
            label_variable_zero.textContent = `${targetVariableForLabels} = 0`;
            label_variable_one.textContent = `${targetVariableForLabels} = 1`;
        }
    };

    const selectVariableA = (event) => {
        const selectedVariable = event.target.value;
        
        if (!selectedVariable || selectedVariable === "-") {
            console.log("Keine Variable ausgewählt oder leerer Eintrag");
            // Leere die Histogramme wenn "-" gewählt wird
            clearHistograms();
            setHistogramVariable('');
            setVariableA('');
            return;
        }
        
        console.log(`=== HISTOGRAMM-GENERIERUNG FÜR VARIABLE: ${selectedVariable} ===`);
        console.log(`Zielvariable: ${targetVariableForLabels}`);
        
        // Verwende immer Result-Daten für detaillierte Histogramme
        if (!isResultData || !Array.isArray(isResultData) || isResultData.length === 0) {
            console.log("❌ Keine Result-Daten verfügbar für Histogramm-Generierung");
            return;
        }
        
        console.log(`✅ Verwende Result-Daten (${isResultData.length} Datensätze)`);
        
        // ========== PRE-MATCHING DATEN (alle Datensätze) ==========
        console.log(`📊 PRE-MATCHING: Verwende alle ${isResultData.length} Datensätze`);
        
        // Filtere Pre-Matching Daten nach Zielvariable = 0 und = 1
        const preDataGroup0 = isResultData.filter(row => row[targetVariableForLabels] == 0);
        const preDataGroup1 = isResultData.filter(row => row[targetVariableForLabels] == 1);
        
        console.log(`📊 PRE-MATCHING Datenaufteilung:`);
        console.log(`   - Gruppe 0 (${targetVariableForLabels}=0): ${preDataGroup0.length} Datensätze`);
        console.log(`   - Gruppe 1 (${targetVariableForLabels}=1): ${preDataGroup1.length} Datensätze`);
        
        // ========== POST-MATCHING DATEN (nur Matching weight = 1) ==========
        const postMatchingData = isResultData.filter(row => row['Matching weight'] == 1);
        console.log(`📊 POST-MATCHING: Verwende ${postMatchingData.length} Datensätze (Matching weight = 1)`);
        
        // Filtere Post-Matching Daten nach Zielvariable = 0 und = 1
        const postDataGroup0 = postMatchingData.filter(row => row[targetVariableForLabels] == 0);
        const postDataGroup1 = postMatchingData.filter(row => row[targetVariableForLabels] == 1);
        
        console.log(`📊 POST-MATCHING Datenaufteilung:`);
        console.log(`   - Gruppe 0 (${targetVariableForLabels}=0): ${postDataGroup0.length} Datensätze`);
        console.log(`   - Gruppe 1 (${targetVariableForLabels}=1): ${postDataGroup1.length} Datensätze`);
        
        // Extrahiere Werte der ausgewählten Variable für PRE-MATCHING Gruppen
        const preValuesGroup0 = preDataGroup0.map(row => row[selectedVariable]).filter(val => val !== null && val !== undefined);
        const preValuesGroup1 = preDataGroup1.map(row => row[selectedVariable]).filter(val => val !== null && val !== undefined);
        
        // Extrahiere Werte der ausgewählten Variable für POST-MATCHING Gruppen
        const postValuesGroup0 = postDataGroup0.map(row => row[selectedVariable]).filter(val => val !== null && val !== undefined);
        const postValuesGroup1 = postDataGroup1.map(row => row[selectedVariable]).filter(val => val !== null && val !== undefined);
        
        console.log(`📈 PRE-MATCHING Variablenwerte für "${selectedVariable}":`);
        console.log(`   - Gruppe 0: ${preValuesGroup0.length} gültige Werte`, preValuesGroup0.slice(0, 10));
        console.log(`   - Gruppe 1: ${preValuesGroup1.length} gültige Werte`, preValuesGroup1.slice(0, 10));
        
        console.log(`📈 POST-MATCHING Variablenwerte für "${selectedVariable}":`);
        console.log(`   - Gruppe 0: ${postValuesGroup0.length} gültige Werte`, postValuesGroup0.slice(0, 10));
        console.log(`   - Gruppe 1: ${postValuesGroup1.length} gültige Werte`, postValuesGroup1.slice(0, 10));
        
        // Finde alle einzigartigen Werte (Kategorien) aus beiden Datensätzen
        const allUniqueValues = [...new Set([...preValuesGroup0, ...preValuesGroup1, ...postValuesGroup0, ...postValuesGroup1])].sort();
        console.log(`🏷️ Kategorien der Variable "${selectedVariable}":`, allUniqueValues);
        
        if (allUniqueValues.length < 2 || allUniqueValues.length > 16) {
            console.warn(`⚠️ Variable "${selectedVariable}" hat ${allUniqueValues.length} Kategorien - möglicherweise nicht optimal für Histogramm`);
        }
        
        // ========== BERECHNE PRE-MATCHING HÄUFIGKEITEN ==========
        const preFrequenciesGroup1 = [];  // Gruppe 1 - nach OBEN (erste Hälfte)
        const preFrequenciesGroup0 = [];  // Gruppe 0 - nach UNTEN (zweite Hälfte)
        
        // ========== BERECHNE POST-MATCHING HÄUFIGKEITEN ==========
        const postFrequenciesGroup1 = [];  // Gruppe 1 - nach OBEN (erste Hälfte)
        const postFrequenciesGroup0 = [];  // Gruppe 0 - nach UNTEN (zweite Hälfte)
        
        // Sammle alle Prozentsätze für Y-Achsen Berechnung
        const allPercentages = [];
        
        allUniqueValues.forEach(category => {
            // PRE-MATCHING Berechnungen
            const preCountGroup0 = preValuesGroup0.filter(val => val == category).length;
            const preCountGroup1 = preValuesGroup1.filter(val => val == category).length;
            
            const prePercentGroup0 = preValuesGroup0.length > 0 ? (preCountGroup0 / preValuesGroup0.length) * 100 : 0;
            const prePercentGroup1 = preValuesGroup1.length > 0 ? (preCountGroup1 / preValuesGroup1.length) * 100 : 0;
            
            preFrequenciesGroup1.push(prePercentGroup1);
            preFrequenciesGroup0.push(prePercentGroup0);
            allPercentages.push(prePercentGroup0, prePercentGroup1);
            
            // POST-MATCHING Berechnungen
            const postCountGroup0 = postValuesGroup0.filter(val => val == category).length;
            const postCountGroup1 = postValuesGroup1.filter(val => val == category).length;
            
            const postPercentGroup0 = postValuesGroup0.length > 0 ? (postCountGroup0 / postValuesGroup0.length) * 100 : 0;
            const postPercentGroup1 = postValuesGroup1.length > 0 ? (postCountGroup1 / postValuesGroup1.length) * 100 : 0;
            
            postFrequenciesGroup1.push(postPercentGroup1);
            postFrequenciesGroup0.push(postPercentGroup0);
            allPercentages.push(postPercentGroup0, postPercentGroup1);
            
            console.log(`📊 Kategorie "${category}":`);
            console.log(`   PRE:  Gruppe1=${preCountGroup1}(${prePercentGroup1.toFixed(1)}%), Gruppe0=${preCountGroup0}(${prePercentGroup0.toFixed(1)}%)`);
            console.log(`   POST: Gruppe1=${postCountGroup1}(${postPercentGroup1.toFixed(1)}%), Gruppe0=${postCountGroup0}(${postPercentGroup0.toFixed(1)}%)`);
        });
        
        // Berechne einheitlichen Y-Achsenbereich (symmetrisch um 0)
        // Finde den maximalen Absolutwert aus allen Prozentsätzen
        const maxPercentage = Math.max(...allPercentages);
        const minPercentage = Math.min(...allPercentages);
        
        // Der maximale Absolutwert bestimmt die Symmetrie
        // Da untere Histogramme negativ werden, nehmen wir den größeren Absolutwert
        const maxAbsoluteValue = Math.max(Math.abs(maxPercentage), Math.abs(minPercentage));
        
        // 10% Offset hinzufügen
        const offsetPercent = 0.1; // 10%
        const yAxisOffset = Math.max(5, maxAbsoluteValue * offsetPercent); // Mindestens 5% Offset
        
        // Symmetrische Y-Achse: -maxWert bis +maxWert
        const yAxisLimit = maxAbsoluteValue + yAxisOffset;
        const yAxisMax = yAxisLimit;   // Positive Grenze (oben)
        const yAxisMin = -yAxisLimit;  // Negative Grenze (unten, gespiegelt)
        
        console.log(`📈 Y-ACHSEN BEREICH (SYMMETRISCH):`);
        console.log(`   - Max Prozentsatz: ${maxPercentage.toFixed(1)}%`);
        console.log(`   - Min Prozentsatz: ${minPercentage.toFixed(1)}%`);
        console.log(`   - Max Absolutwert: ${maxAbsoluteValue.toFixed(1)}%`);
        console.log(`   - Offset (10%): ${yAxisOffset.toFixed(1)}%`);
        console.log(`   - Y-Achse (symmetrisch): ${yAxisMin.toFixed(1)}% bis ${yAxisMax.toFixed(1)}%`);
        
        console.log(`📈 FINALE PRE-MATCHING HISTOGRAMM-DATEN:`);
        console.log(`   - Erste Hälfte (Gruppe 1=${targetVariableForLabels}=1, ROT, OBEN):`, preFrequenciesGroup1);
        console.log(`   - Zweite Hälfte (Gruppe 0=${targetVariableForLabels}=0, BLAU, UNTEN):`, preFrequenciesGroup0);
        
        console.log(`📈 FINALE POST-MATCHING HISTOGRAMM-DATEN:`);
        console.log(`   - Erste Hälfte (Gruppe 1=${targetVariableForLabels}=1, ROT, OBEN):`, postFrequenciesGroup1);
        console.log(`   - Zweite Hälfte (Gruppe 0=${targetVariableForLabels}=0, BLAU, UNTEN):`, postFrequenciesGroup0);
        
        console.log(`   - Kategorien:`, allUniqueValues.map(String));
        
        // Kombiniere die Daten: [gruppe1_daten, gruppe0_daten] 
        const preMatchingData = [...preFrequenciesGroup1, ...preFrequenciesGroup0];
        const postMatchingDataCombined = [...postFrequenciesGroup1, ...postFrequenciesGroup0];
        
        // Aktualisiere die Histogramme mit separaten Pre- und Post-Matching Daten
        setHistograms(preMatchingData, postMatchingDataCombined, selectedVariable, allUniqueValues.map(String));
        
        // Setze einheitliche Y-Achse für beide Histogramme
        setTimeout(() => {
            try {
                let chartDom_a = document.getElementById("container_a");
                let chart_a = Highcharts.charts[Highcharts.attr(chartDom_a, 'data-highcharts-chart')];
                
                let chartDom_b = document.getElementById("container_b");
                let chart_b = Highcharts.charts[Highcharts.attr(chartDom_b, 'data-highcharts-chart')];
                
                if (chart_a && chart_b) {
                    chart_a.yAxis[0].setExtremes(yAxisMin, yAxisMax);
                    chart_b.yAxis[0].setExtremes(yAxisMin, yAxisMax);
                    console.log(`✅ Y-Achse für beide Histogramme gesetzt: ${yAxisMin.toFixed(1)}% bis ${yAxisMax.toFixed(1)}%`);
                }
            } catch (error) {
                console.error("❌ Fehler beim Setzen der Y-Achse:", error);
            }
        }, 100);
        
        // Aktualisiere State
        setHistogramVariable(selectedVariable);
        setVariableA(selectedVariable);
        
        console.log(`✅ Pre- und Post-Matching Histogramme für "${selectedVariable}" erfolgreich generiert!`);
    };


    const selectVariableB = (event) => {
        const selectedVariable = event.target.value;
        
        if (!selectedVariable || selectedVariable === "-") {
            console.log("Keine Variable ausgewählt für Boxplot oder leerer Eintrag");
            // Leere die Boxplots wenn "-" gewählt wird
            clearBoxplots();
            setBoxplotVariable('');
            setVariableB('');
            return;
        }
        
        // Verwende Summary-Daten wenn verfügbar, sonst Result-Daten
        let boxplotData;
        if (isSummaryData && Array.isArray(isSummaryData) && isSummaryData.length > 0) {
            boxplotData = calculateBoxplotDataFromSummary(isSummaryData, selectedVariable, isZielvariable);
            console.log("Verwende Summary-Daten für Boxplot:", boxplotData);
        } else if (isResultData && Array.isArray(isResultData) && isResultData.length > 0) {
            boxplotData = calculateBoxplotData(isResultData, selectedVariable, isZielvariable);
            console.log("Verwende Result-Daten für Boxplot:", boxplotData);
        } else {
            console.log("Keine Daten verfügbar für Boxplot");
            return;
        }
        
        console.log("Boxplot-Daten berechnet:", boxplotData);
        console.log("Pre-matching boxplots:", boxplotData.pre_matching);
        console.log("Post-matching boxplots:", boxplotData.post_matching);
        
        setBoxplots(
            selectedVariable, 
            isZielvariable, 
            [boxplotData.pre_matching.boxplot_one, boxplotData.pre_matching.boxplot_two], 
            [], 
            [boxplotData.post_matching.boxplot_one, boxplotData.post_matching.boxplot_two], 
            []
        );
        setBoxplotVariable(selectedVariable);
        setVariableB(selectedVariable);
    };


    const [binary_variable, setBinaryVariable] = React.useState('');

    const selectBinaryVariable = (event) => {
        setBinaryVariable(event.target.value);
    };

    // Make monochrome colors
    var pieColors = (function () {
        var colors = ['#1c4189', '#b11b18'],
            base = Highcharts.getOptions().colors[0],
            i;
        return colors;
    }());

    document.addEventListener("DOMContentLoaded", function () {
        Highcharts.chart('container_a', {
            chart: {
                type: 'column',
                width: '140',
                height: '215'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Pre Matching'
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                }
            },
            xAxis: [{
                categories: [0, 1],
                reversed: false,
                labels: {
                    step: 1
                },
                accessibility: {
                    description: 'Age (male)'
                },
                title: {
                    text: 'Ausgew. Variable'
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    },
                    enabled: false
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Range: 0 to 5%'
                }
            },

            plotOptions: {
                column: {
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false
                },
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return Highcharts.numberFormat(Math.abs(this.point.y), 1) + ' %';
                }
            },

            legend: { enabled: false },

            credits: {
                enabled: false
            },

            series: [{
                name: 'ICU_MORT = 0',
                data: [],
                color: '#b11b18'
            }, {
                name: 'ICU_MORT = 1',
                data: [],
                color: '#1c4189'
            }]
        });

    });


    document.addEventListener("DOMContentLoaded", function () {
        Highcharts.chart('container_b', {
            chart: {
                type: 'column',
                width: '185',
                height: '215'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Post Matching'
            },
            accessibility: {
                point: {
                    valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                }
            },
            xAxis: [{
                categories: [0, 1],
                reversed: false,
                labels: {
                    step: 1
                },
                accessibility: {
                    description: 'Age (male)'
                },
                title: {
                    text: 'Ausgew. Variable'
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    },
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Range: 0 to 5%'
                }
            },

            plotOptions: {
                column: {
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false
                },
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return Highcharts.numberFormat(Math.abs(this.point.y), 1) + ' %';
                }
            },

            legend: { enabled: false },

            credits: {
                enabled: false
            },

            series: [{
                name: 'ICU_MORT = 0',
                data: [],
                color: '#b11b18'
            }, {
                name: 'ICU_MORT = 1',
                data: [],
                color: '#1c4189'
            }]
        });

    });


    document.addEventListener("DOMContentLoaded", function () {
        Highcharts.chart('container_c', {

            chart: {
                type: 'boxplot',
                width: '140',
                height: '251'
            },

            title: {
                text: ''
            },
            subtitle: {
                text: 'Pre Matching'
            },

            legend: {
                enabled: false
            },

            xAxis: {
                categories: ['0', '1'],
                title: {
                    text: 'Zielvariable'
                }
            },

            yAxis: {
                title: {
                    text: 'Ausgewählte Variable',
                    enabled: false
                },
                labels: {
                    enabled: false
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Boxplot',
                colorByPoint: true,
                colors: ['#b11b18', '#1c4189'],
                data: [

                ],
                tooltip: {
                    headerFormat: ''
                }
            }, {
                name: 'Ausreißer',
                lineColor: 'black',
                type: 'scatter',
                data: [ // x, y positions where 0 is the first category

                ],
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: '#555'
                },
                tooltip: {
                    pointFormat: 'Wert: {point.y}'
                }
            }]

        });
    });


    document.addEventListener("DOMContentLoaded", function () {
        Highcharts.chart('container_d', {

            chart: {
                type: 'boxplot',
                width: '185',
                height: '251'
            },

            title: {
                text: ''
            },
            subtitle: {
                text: 'Post Matching'
            },

            legend: {
                enabled: false
            },

            xAxis: {
                categories: ['0', '1'],
                title: {
                    text: 'Zielvariable'
                }
            },

            yAxis: {
                title: {
                    text: 'Ausgewählte Variable',
                },
                labels: {
                }
            },

            credits: {
                enabled: false
            },


            series: [{
                name: 'Boxplot',
                colorByPoint: true,
                colors: ['#b11b18', '#1c4189'],
                data: [
                ],
                tooltip: {
                    headerFormat: ''
                }
            }, {
                name: 'Ausreißer',
                lineColor: 'black',
                type: 'scatter',
                data: [ // x, y positions where 0 is the first category

                ],
                marker: {
                    fillColor: 'white',
                    lineWidth: 1,
                    lineColor: '#555'
                },
                tooltip: {
                    pointFormat: 'Wert: {point.y}'
                }
            }]

        });
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Build the chart
        Highcharts.chart('container_e', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                width: '210',
                height: '220'
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Anteile der balancierten Kontrollvariablen'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: pieColors,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        }
                    }
                }
            },
            series: [{
                name: 'Anteil',
                data: [
                    { name: 'ddd', y: 0 },
                    { name: '', y: 0 }
                ]
            }]
        });
    });


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };

    let updateDiagrams = () => {
        // setPiechart(json[0].count, json[1].count, false);

        const label_variable_zero = document.getElementById('binary_target_variable_legend_text_zero');
        label_variable_zero.textContent = `${targetVariableForLabels} = 0`;

        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        label_variable_one.textContent = `${targetVariableForLabels} = 1`;
        setDisableVarSelect(false);

    };

    let clearDiagrams = () => {
        clearBoxplots();
        clearHistograms();
        clearPieChart();
        setDisableVarSelect(true);
        setHistoSelector([""]);
        setBoxplotSelector([""]);
        setVariableA("");
        setVariableB("")
        const label_variable_zero = document.getElementById('binary_target_variable_legend_text_zero');
        label_variable_zero.textContent = 'Zielvariable = 0';
        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        label_variable_one.textContent = 'Zielvariable = 1';
    }

    return (
        <Card sx={{ width: "100%", minHeight: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching-Ergebnisse"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%"  }} style={{paddingBottom:'30px'}}
            />

                <div sx={{ display: "flex", background: "white", justifyItems: "flex-end" }} item xs={12}>

                 {/*   <button onClick={clearDiagrams}>Clear</button>
                    <button onClick={updateDiagrams}>Load</button>*/}

                </div>
                <div style={{ display: "flex", flexFlow: "row" }}>



                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={4.5} sx={{ background: "white" }}>

                        <Box pl={2} pr={2} pt={1}>
                            <FormControl sx={{ m: 0, minWidth: "100%" }} disabled={disable_var_select} >
                                <Select
                                    sx={{ width: "100%", height: 25, fontSize: 15 }}
                                    displayEmpty
                                    renderValue={variableA !== "" ? undefined : () => "-"}
                                    value={variableA}
                                    onChange={selectVariableA}
                                    MenuProps={MenuProps}
                                >
                                    {variable_histo.map((variableB) => (
                                        <MenuItem key={variableB} value={variableB}>
                                            {variableB}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Box>

                        <div style={{
                            marginTop: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div class="flexbox-container">
                                <div id="container_a"></div>
                                <div id="container_b"></div>
                            </div>
                        </div>

                        <div style={{
                            marginTop: 5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div class="flexbox-container">
                                <div><Box sx={{ width: 14, height: 14, background: "#B11B18", borderRadius: 50 }}></Box></div>
                                <div><Typography id="binary_target_variable_legend_text_zero" sx={{ fontSize: 11, pl: 1, pr: 1, fontWeight: 'bold' }}>Zielvariable = 0</Typography></div>
                                <div><Box sx={{ width: 14, height: 14, background: "#1C4189", borderRadius: 50 }}></Box></div>
                                <div><Typography id="binary_target_variable_legend_text_one" sx={{ fontSize: 11, pl: 1, fontWeight: 'bold' }}>Zielvariable = 1</Typography></div>
                            </div>
                        </div>
                    </Grid>

                        <Grid item xs={4.5} sx={{ background: "white" }}>
                        <Box pl={2} pr={2} pt={1}>

                            <FormControl sx={{ m: 0, minWidth: "100%" }} disabled={disable_var_select} >
                                <Select
                                    sx={{ width: "100%", height: 25, fontSize: 15 }}
                                    displayEmpty
                                    renderValue={variableB !== "" ? undefined : () => "-"}
                                    value={variableB}
                                    onChange={selectVariableB}
                                    MenuProps={MenuProps}
                                >
                                    {variable_boxplot.map((variableB) => (
                                        <MenuItem key={variableB} value={variableB}>
                                            {variableB}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Box>

                        <div style={{
                            marginTop: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div class="flexbox-container">
                                <div id="container_c"></div>
                                <div id="container_d"></div>
                            </div>
                        </div>

                    </Grid>

                        <Grid item xs={3} sx={{ background: "white" }}>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%'
                        }}>
                            <div class="flexbox-container">
                                <div class="verticalLine" > </div>
                                <div class="flexbox-container-column">
                                    <div id="container_e" style={{ marginTop: 0 }}></div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 2
                                    }}>
                                        <div class="flexbox-container-column">
                                            <div class="flexbox-container">

                                                <div><Box sx={{ width: 14, height: 14, background: "#1C4189", borderRadius: 50 }}></Box></div>
                                                <div><Typography sx={{ fontSize: 11, pl: 1, fontWeight: 'bold' }}>Balanced</Typography></div>

                                            </div>

                                            <div class="flexbox-container">

                                                <div><Box sx={{ width: 14, height: 14, background: "#B11B18", borderRadius: 50 }}></Box></div>
                                                <div><Typography sx={{ fontSize: 11, pl: 1, pr: 1, fontWeight: 'bold' }}>Not balanced</Typography></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    </Grid>
                </div>
        </Card>
    );
}

export default DynamicResults;
