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
import AppContext from '../AppContext';
import { MAX_CATEGORICAL_LEVELS, MIN_CATEGORICAL_LEVELS } from '../matchingConfig';
HighchartsMore(Highcharts);




function setHistograms(data_pre_match, data_post_match, x_axis_label, x_categories, group_labels = []) {

    let chartDom_a = document.getElementById("container_a");
    let chart_a = Highcharts.charts[Highcharts.attr(chartDom_a, 'data-highcharts-chart')];

    let chartDom_b = document.getElementById("container_b");
    let chart_b = Highcharts.charts[Highcharts.attr(chartDom_b, 'data-highcharts-chart')];

    chart_a.xAxis[0].setTitle({ text: x_axis_label }, false);
    chart_b.xAxis[0].setTitle({ text: x_axis_label }, false);

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

    console.log("Pre-Match Histogram")
    console.log(data_pre_match_red)
    console.log(data_pre_match_blue)
    chart_a.series[0].setData(data_pre_match_red);
    chart_a.series[1].setData(data_pre_match_blue);

    if (group_labels.length === 2) {
        chart_a.series[0].update({ name: group_labels[1] }, false);
        chart_a.series[1].update({ name: group_labels[0] }, false);
    }

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

    if (group_labels.length === 2) {
        chart_b.series[0].update({ name: group_labels[1] }, false);
        chart_b.series[1].update({ name: group_labels[0] }, false);
    }

    // chart_a.yAxis[0].setExtremes(0, 100000);

    chart_a.redraw();
    chart_b.redraw();

    console.log("Histograms have been rendered.")
}


function clearHistograms() {

    setHistograms([], [], 'Selected Variable', '', '');

}


function setBoxplots(y_axis_label, x_axis_label, pre_matching_boxplots, pre_matching_outliers, post_matching_boxplots, post_matching_outliers, x_categories = []) {

    let chartDom_c = document.getElementById("container_c");
    let chart_c = Highcharts.charts[Highcharts.attr(chartDom_c, 'data-highcharts-chart')];

    let chartDom_d = document.getElementById("container_d");
    let chart_d = Highcharts.charts[Highcharts.attr(chartDom_d, 'data-highcharts-chart')];

    chart_c.series[0].setData(pre_matching_boxplots);
    chart_c.series[1].setData(pre_matching_outliers);

    chart_d.series[0].setData(post_matching_boxplots);
    chart_d.series[1].setData(post_matching_outliers);

    chart_c.xAxis[0].setCategories(x_categories, false);
    chart_d.xAxis[0].setCategories(x_categories, false);

    chart_c.xAxis[0].setTitle({ text: x_axis_label }, false);
    chart_d.xAxis[0].setTitle({ text: x_axis_label }, false);
    chart_c.yAxis[0].setTitle({ text: y_axis_label }, false);
    chart_d.yAxis[0].setTitle({ text: y_axis_label }, false);

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

    setBoxplots('Selected Variable', 'Target Variable', [], [], [], []);

}


function setPiechart(balanced_var_count, non_balanced_var_count, delete_text) {

    let chartDom_e = document.getElementById("container_e");
    console.log("chartDom_e: " +chartDom_e);
    let chart_e = Highcharts.charts[Highcharts.attr(chartDom_e, 'data-highcharts-chart')];

    let char_text = balanced_var_count + ' of ' + (balanced_var_count + non_balanced_var_count) + ' variables';

    if (delete_text == true) {
        char_text = '';
    }

    chart_e.series[0].setData([{ name: char_text, y: balanced_var_count }, { name: '', y: non_balanced_var_count }]);

}


function clearPieChart() {
    // setPiechart(0, 0, true);
}

// Hilfsfunktionen für die Datenverarbeitung
function getBinaryVariables(resultData, summaryData, targetVariable) {
    console.log("getBinaryVariables called with:", { resultData: resultData?.length, summaryData: summaryData?.length, targetVariable });
    
    // IMMER Result-Daten verwenden für bessere Analyse
    if (!resultData || !Array.isArray(resultData) || resultData.length === 0) {
        console.log("❌ No result data available for categorical variables");
        return [];
    }
    
    console.log("✅ Using result data for categorical variables (better accuracy)");
    const excludeColumns = ['subclass', 'weights', 'distance', '_id', targetVariable, 'Matching weight', 'MatchingID'];
    const allColumns = Object.keys(resultData[0]);
    
    console.log("🔍 ANALYZING ALL COLUMNS FOR CATEGORICAL VARIABLES:");
    console.log("Verfügbare Spalten:", allColumns);
    console.log("Ausgeschlossene Spalten:", excludeColumns);
    console.log("Zielvariable (wird ausgeschlossen):", targetVariable);
    
    const categoricalVars = [];
    
    // Treat variables within the configured level range as categorical.
    allColumns.forEach(col => {
        if (!excludeColumns.includes(col)) {
            // Filtere null/undefined Werte heraus
            const validValues = resultData.map(row => row[col]).filter(val => val !== null && val !== undefined && val !== '');
            const uniqueValues = [...new Set(validValues)];
            
            console.log(`📋 Spalte "${col}":`);
            console.log(`   - ${uniqueValues.length} einzigartige Werte von ${validValues.length} gültigen Werten`);
            console.log(`   - Beispielwerte:`, uniqueValues.slice(0, 10));
            console.log(`   - Ausgeschlossen wegen Zielvariable? ${col === targetVariable}`);
            
            // Categorical variables must stay within the configured level range.
            if (uniqueValues.length >= MIN_CATEGORICAL_LEVELS && uniqueValues.length <= MAX_CATEGORICAL_LEVELS) {
                categoricalVars.push(col);
                console.log(`   ✅ "${col}" als kategoriale Variable hinzugefügt (${uniqueValues.length} Ausprägungen)`);
            } else {
                console.log(`   ❌ "${col}" is not categorical: ${uniqueValues.length} levels (expected ${MIN_CATEGORICAL_LEVELS}-${MAX_CATEGORICAL_LEVELS})`);
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
    
    // Numeric variables must exceed the configured categorical level limit.
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
            if (uniqueValues.length > MAX_CATEGORICAL_LEVELS && allNumeric) {
                numericVars.push(col);
                console.log(`   ✅ "${col}" als numerische Variable hinzugefügt (${uniqueValues.length} Ausprägungen, alle numerisch)`);
            } else {
                console.log(`   ❌ "${col}" is not numeric: ${uniqueValues.length} levels (must exceed ${MAX_CATEGORICAL_LEVELS}) or contains non-numeric values (${allNumeric})`);
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

function calculateBoxplotData(resultData, variable, targetVariable, targetValues) {
    if (!resultData || !variable || targetValues.length !== 2) return { pre_matching: {}, post_matching: {} };

    const [firstTargetValue, secondTargetValue] = targetValues;
    
    console.log(`=== BOXPLOT-BERECHNUNG FÜR VARIABLE: ${variable} ===`);
    console.log(`Zielvariable: ${targetVariable}`);
    console.log(`Gesamte Datensätze: ${resultData.length}`);
    
    // ========== PRE-MATCHING: Alle Daten ==========
    const preGroup0Data = resultData
        .filter(row => row[targetVariable] == firstTargetValue)
        .map(row => parseFloat(row[variable]))
        .filter(val => !isNaN(val));
    
    const preGroup1Data = resultData
        .filter(row => row[targetVariable] == secondTargetValue)
        .map(row => parseFloat(row[variable]))
        .filter(val => !isNaN(val));
    
    console.log(`📊 PRE-MATCHING (alle ${resultData.length} Datensätze):`);
    console.log(`   - Group 1 (${targetVariable}=${firstTargetValue}): ${preGroup0Data.length} values`);
    console.log(`   - Group 2 (${targetVariable}=${secondTargetValue}): ${preGroup1Data.length} values`);
    
    // ========== POST-MATCHING: Nur Matching weight > 0 ==========
    const postMatchingData = resultData.filter(row => row['Matching weight'] > 0);
    console.log(`📊 POST-MATCHING: ${postMatchingData.length} Datensätze (Matching weight > 0)`);
    
    const postGroup0Data = postMatchingData
        .filter(row => row[targetVariable] == firstTargetValue)
        .map(row => parseFloat(row[variable]))
        .filter(val => !isNaN(val));
    
    const postGroup1Data = postMatchingData
        .filter(row => row[targetVariable] == secondTargetValue)
        .map(row => parseFloat(row[variable]))
        .filter(val => !isNaN(val));
    
    console.log(`📊 POST-MATCHING Datenaufteilung:`);
    console.log(`   - Group 1 (${targetVariable}=${firstTargetValue}): ${postGroup0Data.length} values`);
    console.log(`   - Group 2 (${targetVariable}=${secondTargetValue}): ${postGroup1Data.length} values`);
    
    function calculateBoxplotStats(data, label) {
        if (data.length === 0) {
            console.warn(`⚠️ Keine Daten für ${label} - verwende Nullwerte`);
            return [0, 0, 0, 0, 0];
        }
        
        data.sort((a, b) => a - b);
        const q1 = data[Math.floor(data.length * 0.25)];
        const median = data[Math.floor(data.length * 0.5)];
        const q3 = data[Math.floor(data.length * 0.75)];
        const min = data[0];
        const max = data[data.length - 1];
        
        console.log(`📈 ${label}: Min=${min.toFixed(2)}, Q1=${q1.toFixed(2)}, Median=${median.toFixed(2)}, Q3=${q3.toFixed(2)}, Max=${max.toFixed(2)}`);
        
        return [min, q1, median, q3, max];
    }
    
    const result = {
        pre_matching: {
            boxplot_one: calculateBoxplotStats(preGroup0Data, `PRE Group 1 (${targetVariable}=${firstTargetValue})`),
            boxplot_two: calculateBoxplotStats(preGroup1Data, `PRE Group 2 (${targetVariable}=${secondTargetValue})`)
        },
        post_matching: {
            boxplot_one: calculateBoxplotStats(postGroup0Data, `POST Group 1 (${targetVariable}=${firstTargetValue})`),
            boxplot_two: calculateBoxplotStats(postGroup1Data, `POST Group 2 (${targetVariable}=${secondTargetValue})`)
        }
    };
    
    console.log(`✅ Boxplot-Daten erfolgreich berechnet für "${variable}"`);
    return result;
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
    const targetValues = useMemo(() => {
        if (!Array.isArray(isResultData) || !targetVariableForLabels) return [];

        return [...new Set(
            isResultData
                .map((row) => row[targetVariableForLabels])
                .filter((value) => value !== null && value !== undefined && value !== '')
        )].sort((left, right) => String(left).localeCompare(String(right), undefined, { numeric: true }));
    }, [isResultData, targetVariableForLabels]);
    
    // Memoize Variablenlisten um endlose Schleifen zu vermeiden
    const categoricalVariables = useMemo(() => getBinaryVariables(isResultData, isSummaryData, targetVariableForLabels), [isResultData, isSummaryData, targetVariableForLabels]);
    const numericVariables = useMemo(() => getNumericVariables(isResultData, isSummaryData, targetVariableForLabels), [isResultData, isSummaryData, targetVariableForLabels]);
    
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
    }, [isResultData, isSummaryData, categoricalVariables, numericVariables, targetVariableForLabels, targetValues]);

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
            label_variable_zero.textContent = targetValues.length === 2
                ? `${targetVariableForLabels} = ${targetValues[0]}`
                : 'Group 1';
            label_variable_one.textContent = targetValues.length === 2
                ? `${targetVariableForLabels} = ${targetValues[1]}`
                : 'Group 2';
        }
    };

    const selectVariableA = (event) => {
        const selectedVariable = event.target.value;
        
        if (!selectedVariable || selectedVariable === "-") {
            console.log("No variable selected or empty entry");
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

        if (targetValues.length !== 2) {
            console.error('The group indicator must contain exactly two values.');
            return;
        }

        const [firstTargetValue, secondTargetValue] = targetValues;
        
        // ========== PRE-MATCHING DATEN (alle Datensätze) ==========
        console.log(`📊 PRE-MATCHING: Verwende alle ${isResultData.length} Datensätze`);
        
        // Split pre-matching data by the observed group-indicator values.
        const preDataGroup0 = isResultData.filter(row => row[targetVariableForLabels] == firstTargetValue);
        const preDataGroup1 = isResultData.filter(row => row[targetVariableForLabels] == secondTargetValue);
        
        console.log(`📊 PRE-MATCHING Datenaufteilung:`);
        console.log(`   - Group 1 (${targetVariableForLabels}=${firstTargetValue}): ${preDataGroup0.length} records`);
        console.log(`   - Group 2 (${targetVariableForLabels}=${secondTargetValue}): ${preDataGroup1.length} records`);
        
        // ========== POST-MATCHING DATEN (nur Matching weight > 0) ==========
        const postMatchingData = isResultData.filter(row => row['Matching weight'] > 0);
        console.log(`📊 POST-MATCHING: Verwende ${postMatchingData.length} Datensätze (Matching weight > 0)`);
        
        // Split post-matching data by the observed group-indicator values.
        const postDataGroup0 = postMatchingData.filter(row => row[targetVariableForLabels] == firstTargetValue);
        const postDataGroup1 = postMatchingData.filter(row => row[targetVariableForLabels] == secondTargetValue);
        
        console.log(`📊 POST-MATCHING Datenaufteilung:`);
        console.log(`   - Group 1 (${targetVariableForLabels}=${firstTargetValue}): ${postDataGroup0.length} records`);
        console.log(`   - Group 2 (${targetVariableForLabels}=${secondTargetValue}): ${postDataGroup1.length} records`);
        
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
        
        if (allUniqueValues.length < MIN_CATEGORICAL_LEVELS || allUniqueValues.length > MAX_CATEGORICAL_LEVELS) {
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
        console.log(`   - First half (${targetVariableForLabels}=${secondTargetValue}, red, top):`, preFrequenciesGroup1);
        console.log(`   - Second half (${targetVariableForLabels}=${firstTargetValue}, blue, bottom):`, preFrequenciesGroup0);
        
        console.log(`📈 FINALE POST-MATCHING HISTOGRAMM-DATEN:`);
        console.log(`   - First half (${targetVariableForLabels}=${secondTargetValue}, red, top):`, postFrequenciesGroup1);
        console.log(`   - Second half (${targetVariableForLabels}=${firstTargetValue}, blue, bottom):`, postFrequenciesGroup0);
        
        console.log(`   - Kategorien:`, allUniqueValues.map(String));
        
        // Kombiniere die Daten: [gruppe1_daten, gruppe0_daten] 
        const preMatchingData = [...preFrequenciesGroup1, ...preFrequenciesGroup0];
        const postMatchingDataCombined = [...postFrequenciesGroup1, ...postFrequenciesGroup0];
        
        // Aktualisiere die Histogramme mit separaten Pre- und Post-Matching Daten
        const groupLabels = targetValues.map((value) => `${targetVariableForLabels} = ${value}`);
        setHistograms(preMatchingData, postMatchingDataCombined, selectedVariable, allUniqueValues.map(String), groupLabels);
        
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
            console.log("No variable selected for boxplot or empty entry");
            // Leere die Boxplots wenn "-" gewählt wird
            clearBoxplots();
            setBoxplotVariable('');
            setVariableB('');
            return;
        }
        
        console.log(`=== BOXPLOT-GENERIERUNG FÜR VARIABLE: ${selectedVariable} ===`);
        console.log(`Zielvariable: ${targetVariableForLabels}`);
        
        // Verwende immer Result-Daten für detaillierte Boxplots (wie bei Histogrammen)
        if (!isResultData || !Array.isArray(isResultData) || isResultData.length === 0) {
            console.log("❌ Keine Result-Daten verfügbar für Boxplot-Generierung");
            return;
        }
        
        console.log(`✅ Verwende Result-Daten (${isResultData.length} Datensätze)`);
        
        // Berechne Boxplot-Daten mit korrekter Pre/Post-Matching Unterscheidung
        const boxplotData = calculateBoxplotData(isResultData, selectedVariable, targetVariableForLabels, targetValues);
        
        console.log("📊 Boxplot-Daten berechnet:", boxplotData);
        console.log("📊 Pre-matching boxplots:", boxplotData.pre_matching);
        console.log("📊 Post-matching boxplots:", boxplotData.post_matching);
        
        // Setze die Boxplots: [boxplot_one, boxplot_two] für Pre- und Post-Matching
        setBoxplots(
            selectedVariable,                                                    // Y-Achse Label
            targetVariableForLabels,                                            // X-Achse Label  
            [boxplotData.pre_matching.boxplot_one, boxplotData.pre_matching.boxplot_two],    // Pre-Matching Boxplots
            [],                                                                 // Pre-Matching Outliers (leer)
            [boxplotData.post_matching.boxplot_one, boxplotData.post_matching.boxplot_two], // Post-Matching Boxplots
            [],                                                                 // Post-Matching Outliers (leer)
            targetValues.map(String)                                            // Group labels
        );
        
        // Aktualisiere State
        setBoxplotVariable(selectedVariable);
        setVariableB(selectedVariable);
        
        console.log(`✅ Pre- und Post-Matching Boxplots für "${selectedVariable}" erfolgreich generiert!`);
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
                    valueDescriptionFormat: '{index}. {xDescription}, {value}%.'
                }
            },
            xAxis: [{
                categories: [],
                reversed: false,
                labels: {
                    step: 1
                },
                accessibility: {
                    description: 'Selected variable categories'
                },
                title: {
                    text: 'Selected Variable'
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(Math.abs(this.value), 2) + '%';
                    },
                    enabled: false
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Percentage within the group'
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
                    return Highcharts.numberFormat(Math.abs(this.point.y), 2) + ' %';
                }
            },

            legend: { enabled: false },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Group 0',
                data: [],
                color: '#b11b18'
            }, {
                name: 'Group 1',
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
                    valueDescriptionFormat: '{index}. {xDescription}, {value}%.'
                }
            },
            xAxis: [{
                categories: [],
                reversed: false,
                labels: {
                    step: 1
                },
                accessibility: {
                    description: 'Selected variable categories'
                },
                title: {
                    text: 'Selected Variable'
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat(Math.abs(this.value), 2) + '%';
                    },
                },
                accessibility: {
                    description: 'Percentage population',
                    rangeDescription: 'Percentage within the group'
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
                    return Highcharts.numberFormat(Math.abs(this.point.y), 2) + ' %';
                }
            },

            legend: { enabled: false },

            credits: {
                enabled: false
            },

            series: [{
                name: 'Group 0',
                data: [],
                color: '#b11b18'
            }, {
                name: 'Group 1',
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
                categories: [],
                title: {
                    text: 'Group Indicator'
                }
            },

            yAxis: {
                title: {
                    text: 'Selected Variable',
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
                    headerFormat: '',
                    valueDecimals: 2
                }
            }, {
                name: 'Outliers',
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
                    pointFormat: 'Value: {point.y:.2f}'
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
                categories: [],
                title: {
                    text: 'Group Indicator'
                }
            },

            yAxis: {
                title: {
                    text: 'Selected Variable',
                },
                labels: {
                    format: '{value:.2f}'
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
                    headerFormat: '',
                    valueDecimals: 2
                }
            }, {
                name: 'Outliers',
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
                    pointFormat: 'Value: {point.y:.2f}'
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
                text: 'Balance of Covariates after Matching'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
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
                name: 'Proportion',
                data: []
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
        label_variable_zero.textContent = targetValues.length === 2
            ? `${targetVariableForLabels} = ${targetValues[0]}`
            : 'Group 1';

        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        label_variable_one.textContent = targetValues.length === 2
            ? `${targetVariableForLabels} = ${targetValues[1]}`
            : 'Group 2';
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
        label_variable_zero.textContent = 'Group 1';
        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        label_variable_one.textContent = 'Group 2';
    }

    return (
        <Card sx={{ width: "100%", minHeight: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching results"
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
                                <div><Typography id="binary_target_variable_legend_text_zero" sx={{ fontSize: 11, pl: 1, pr: 1, fontWeight: 'bold' }}>Group 1</Typography></div>
                                <div><Box sx={{ width: 14, height: 14, background: "#1C4189", borderRadius: 50 }}></Box></div>
                                <div><Typography id="binary_target_variable_legend_text_one" sx={{ fontSize: 11, pl: 1, fontWeight: 'bold' }}>Group 2</Typography></div>
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
