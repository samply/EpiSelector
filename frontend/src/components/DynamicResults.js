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
import { useState } from 'react';
import { Panorama, TurnedIn } from '@mui/icons-material';
import { CardHeader } from "@mui/material";
HighchartsMore(Highcharts);



let disable_var_select = true;
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
    let chart_e = Highcharts.charts[Highcharts.attr(chartDom_e, 'data-highcharts-chart')];

    let char_text = balanced_var_count + ' von ' + (balanced_var_count + non_balanced_var_count) + ' Variablen';

    if (delete_text == true) {
        char_text = '';
    }

    chart_e.series[0].setData([{ name: char_text, y: balanced_var_count }, { name: '', y: non_balanced_var_count }]);

}


function clearPieChart() {
    setPiechart(0, 0, true);
}



function DynamicResults({ isAlgorithmus, isErsetzung, isZielvariable, isAllKontrollvariablen, isScoreMethode, isMatchingMethode, isVollständigeDatei, isVerhältnis, isJsonPackage, isÜbereinstimmungswert }) {

    // data


    let variablesNamesA = [
        "Variable A",
        "Variable B",
        "Variable C",
        "Variable D",
        "Variable E",
        "Variable F",
        "Variable G",
        "Variable H",
        "Variable I",
        "Variable J"
    ];


    let variablesNamesB = [
        "Variable K",
        "Variable L",
        "Variable M",
        "Variable N",
        "Variable O",
        "Variable P",
        "Variable Q",
        "Variable R",
        "Variable S",
        "Variable T"
    ];


    const [variable_boxplot, setBoxplotSelector] = useState(["-"]);
    const [variable_histo, setHistoSelector] = useState(["-"]);




    const [variableA, setVariableA] = React.useState('');

    const selectVariableA = (event) => {

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
            controllvariable: event.target.value

            // groupindicator: "icu_mort",
            // controllvariables: "[age,sex]",
            // mmethod: "exact",
            // mdistance: "mahalanobis",
            // mreplace: isErsetzung,
            // mratio: 1,
            // mcaliper: 0.2,
            // controllvariable: event.target.value
        };

        console.log("Histogramm-Aufruf wird abgeschickt mit params:");
        console.log(param);

        // (B) BUILD URL
        var url = new URL("http://" + ip_django + "/control_selection/histogram");
        for (let k in param) {
            url.searchParams.append(k, param[k]);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_test_data)
        }).then((response) => response.json())
            .then((json) => {
                console.log("Histogramm-Aufruf wurde abgeschickt")
                console.log(json)

                console.log(json.post_match_data)
                console.log(json.pre_match_data)
                console.log(json.x_axis_labels)
                setHistograms(json.pre_match_data, json.post_match_data, '', json.x_axis_labels);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setVariableA(event.target.value);

    };


    const [variableB, setVariableB] = React.useState('');

    const selectVariableB = (event) => {



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
            controllvariable: event.target.value
        };

        // (B) BUILD URL
        var url = new URL("http://" + ip_django + "/control_selection/boxplot");
        for (let k in param) {
            url.searchParams.append(k, param[k]);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_test_data)
        }).then((response) => response.json())
            .then((json) => {
                console.log("HALLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + json.pre_matching.boxplot_one)
                setBoxplots(event.target.value, 'icu_mort', [json.pre_matching.boxplot_one,json.pre_matching.boxplot_two], [], [json.post_matching.boxplot_one,json.post_matching.boxplot_two], []);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setVariableB(event.target.value);
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

        // set histoselector with boolean variables from dataset
        fetch('http://' + ip_django + '/control_selection/boolean_columns', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_test_data)
        }).then((response) => response.json())
            .then((data) => {
                // remove target variable from list of variables
                var newList = new Array();
                for(var i = 0; i < data.length; i++) {
                    if (data[i] != isZielvariable) {
                        newList.push(data[i]);
                    }
                }
                setHistoSelector(newList)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // set boxplotselector with numeric variables from dataset
        fetch('http://' + ip_django + '/control_selection/numeric_columns', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json_test_data)
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setBoxplotSelector(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });


        console.log(isAlgorithmus)
        console.log(isErsetzung)
        console.log(isZielvariable)
        console.log(isAllKontrollvariablen)
        console.log(isScoreMethode)
        console.log(isMatchingMethode)
        console.log(isVollständigeDatei)
        console.log(isVerhältnis)
        console.log(isVerhältnis)
        console.log(isÜbereinstimmungswert)

        var temp_string = "["
        for (var i = 0; i <= isAllKontrollvariablen.length - 2; i++) {
            console.log(isAllKontrollvariablen[i])
            console.log(isAllKontrollvariablen[i].var)
            temp_string += isAllKontrollvariablen[i].var + ","
        }
        temp_string += isAllKontrollvariablen[isAllKontrollvariablen.length - 1].var
        temp_string += "]"
        console.log(temp_string)

        // set pie chart
        var param = {
            groupindicator: isZielvariable,
            controllvariables: temp_string,
            mmethod: isAlgorithmus,
            mdistance: "glm",
            mreplace: isErsetzung,
            mratio: isVerhältnis,
            mcaliper: isÜbereinstimmungswert,
        };

        // (B) BUILD URL
        var url = new URL("http://" + ip_django + "/control_selection/pie_chart");
        for (let k in param) {
            url.searchParams.append(k, param[k]);
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(isVollständigeDatei)
        }).then((response) => response.json(),  console.log("PieChartFetch is Vollständigedatei" +isVollständigeDatei))
            .then((json) => {
                setPiechart(json[0].count, json[1].count, false);

            })
            .catch((error) => {
                console.error('Error:', error);
            });

        const label_variable_zero = document.getElementById('binary_target_variable_legend_text_zero');
        label_variable_zero.textContent = 'ICU_MORT = 0';

        const label_variable_one = document.getElementById('binary_target_variable_legend_text_one');
        label_variable_one.textContent = 'ICU_MORT = 1';
        disable_var_select = false;

    };

    let clearDiagrams = () => {
        clearBoxplots();
        clearHistograms();
        clearPieChart();
        disable_var_select = true;
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
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }}
            />

            <div>
                <div sx={{ display: "flex", background: "white", justifyItems: "flex-end" }} item xs={12}>

                    <button onClick={clearDiagrams}>Clear</button>
                    <button onClick={updateDiagrams}>Load</button>

                </div>
                <div style={{ display: "flex", flexFlow: "row" }}>



                    <Grid sx={{ background: "white" }} item xs={4.5}>

                        <Box pl={2} pr={2} pt={1}>
                            <FormControl sx={{ m: 0, minWidth: "100%" }} disabled={disable_var_select} >
                                <Select
                                    sx={{ width: "100%", height: 25, fontSize: 15 }}
                                    isDisabled={true}
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
                    <Grid sx={{ background: "white" }} item xs={4.5}>
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
                    <Grid sx={{ background: "white" }} item xs={3}>

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
                </div>
            </div>
        </Card>
    );
}

export default DynamicResults;
