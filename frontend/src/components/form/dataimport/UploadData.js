import '../../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import Papa from 'papaparse';
import {useState} from "react";
import Datainput from "../../../model/DataInput";
import Form from '../../../model/Form';
import {visitedSite} from "../../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Card from "@mui/material/Card";
import {CardHeader} from "@mui/material";
import test_data from "../../../assets/test_data.json"
import { CheckCircle, Cancel } from "@mui/icons-material"; // Replace with the appropriate icon components from Material-UI




export default function UploadData({setDatei, setDateiSpaltenNamen, setVollständigeDatei, isDatei, isVollständigeDatei, setBeobachtungen, setOnlyBinaryColumns}) {

    const [file, setFile] = useState('');
    const [array, setArray] = useState([]);
    const [csvImported, setCsvImported] = useState(false);
    const [importFailed, setImportFailed] = useState(false);


    let column = [];
    let rows = [];
    let data = [];

    const fileReader = new FileReader();

    const handleOnChange = async (e) => {

        // only File name will be uploaded
        console.log(e.target.files[0].name);
        setFile(e.target.files[0]);
        setDatei(e.target.files[0].name);

        const files = e.target.files;
        // list of Files wants to be displayed, but length says 1 and Files 0
        console.log(files);
        if (files) {
             // the only uploaded File = Details about Name, LastModifikation, Date, Size etc.
            console.log(files[0]);
            Papa.parse(files[0], {
                    complete: function (results) {
                        // in Arrays the whole content
                        console.log("Finished:", results.data);

                        column = results.data[0];
                        data = results.data;
                        const jsonFile = results.data.reduce((a, v) => ({...a, [v[0]]: v}), {});
                        // trying to convert to {"x":[],"y":[]} but wrong placement of content
                        console.log(jsonFile);
                        console.log("jsonFile" + JSON.stringify(jsonFile));

                    }
                }
            )
        }


    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        // only Header of table is output
        console.log("csvHeader" + csvHeader);
        // output: rows content as a block
        console.log("csvRows" + csvRows);

        rows = csvRows;
        setDateiSpaltenNamen(csvHeader);
        console.log(csvHeader);

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setArray(array);




    };



    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csv = event.target.result;
                // output in rows the complete content
                console.log("csvOutput" + csv);
                setBeobachtungen();

                //-----

                const lines = csv.split("\n");
                const headers = lines[0].split(",");
                const result = {};

                for (let i = 0; i < headers.length; i++) {
                    result[headers[i]] = [];
                }

                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(",");
                    for (let j = 0; j < values.length; j++) {
                        let parsedValue;
                        if (values[j].trim() === "") {
                            parsedValue = "";
                        } else if (isNaN(values[j])) {
                            parsedValue = values[j].replace(/\r/g, '');
                        } else {
                            parsedValue = parseFloat(values[j]);
                        }
                        result[headers[j]].push(parsedValue);
                    }
                }

                console.log(result);
                setVollständigeDatei(result);

                // Filter binary columns
                const binaryColumns = Object.keys(result).filter((column) => {
                    const values = result[column];
                    return values.every((value) => value === 0 || value === 1);
                });

                setOnlyBinaryColumns(binaryColumns);

                    //----
                    // setDateiSpaltenNamen(csv[0]);
                    // console.log(csv[0]);
                     setBeobachtungen(csv.length);
                    csvFileToArray(csv);

                    let jsonFile = {};
                    let tmpObj = {};
                    let key = "";
                    let value = [];

                    for (let x = 0; x <= csv[0].length; x++) {
                        key = csv[0][x];
                        for (let y = 0; y <= csv.length; y++) {
                            value = csv[y][x];

                        }
                        tmpObj = {key: key, value: value};
                        // can't be read, output= fileReader[object RleReader]
                        console.log(tmpObj);


                    }
                }
                ;

                fileReader.readAsText(file);

                console.log("fileReader" + fileReader.toString());
            setCsvImported(true);
        }else{
            setImportFailed(true)
        }


    };

    // NEW TRY CHATGPTs Code
/*
    function csvToJson(csv) {
        // Split the CSV string into rows
        const rows = csv.trim().split('\n');

        // Extract the headers from the first row
        const headers = rows[0].split(',');

        // Create an object with empty arrays for each header
        const json = {};
        headers.forEach(header => json[header] = []);

        // Loop through the remaining rows
        for (let i = 1; i < rows.length; i++) {
            // Split the row into values
            const values = rows[i].split(',');

            // Loop through the headers and add the corresponding value to the array
            headers.forEach((header, index) => {
                json[header].push(values[index]);
            });
        }

        return json;
    }
    var  csv = `record_id,_intime,_outtime,sepsis_jn,_sepsistime,gender,age,height,weight
1,01JUN2020:07:00,06JUN2020:20:00,1,02JUN2020:09:00,0,61,180,85
2,02JUN2020:08:00,03JUN2020:23:00,0,,0,65,188,95
3,01JUN2020:14:00,04JUN2020:03:00,0,,1,44,172,77`;

    const json = csvToJson(csv);
    console.log(json);*/





    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "1%", paddingLeft: "3%"}}>
                    Datei hochladen
                </Typography>{/* File Uploader */}
                <div style={{ marginLeft:"12%", display:"flex", justifyConent: "center", alignItems:"center", alignContent: "center", width: "40%", height: "80%", paddingBottom: "8%", border: "dashed", borderColor: "gray",marginBottom:"2%", paddingLeft:"15%", paddingRight:"15%", paddingTop:"8%"}}>

                        <form>
                            <label style={{ display:"inline-block", padding: "10px",
                                backgroundColor: "#1d4189",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden"}}> 1. Datei auswählen</label>
                            <input
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                                style={{position: "absolute",
                                    top: "20%",
                                    left: "33%",
                                    opacity: "0",
                                    width: "33%%",
                                    height: "20%",
                                    cursor: "pointer"}}

                            />


                        </form>
                    <br/>
                    {/* <table sx={{maxHeight: "100px", overflow:"auto", maxWidth:"100px"}}>
                            <thead>
                            <tr key={"header"}>
                                {headerKeys.map((key) => (
                                    <th>{key}</th>
                                ))}
                            </tr>
                            </thead>

                            <tbody>
                            {array.map((item) => (
                                <tr key={item.id}>
                                    {Object.values(item).map((val) => (
                                        <td>{val}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>*/}
                </div>
               <div style={{marginLeft:"12%", marginBottom:"2%"}}> <button
                    onClick={(e) => {
                        handleOnSubmit(e);
                    }}
                    style={{  display: "inline-block",
                        padding: "13px",
                        backgroundColor: "#1d4189",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        }}>
                    2. Import CSV
                </button>           {csvImported && <CheckCircle style={{color:"green"}} className="checkIcon" />}
                                    {importFailed &&  <Cancel style={{color:"red"}} className="cancelIcon" />}


               </div>

                <div style={{
                    height: "8%",
                    display: "flex",
                    float: "right",
                    gap: "3%",
                    width: "42%",
                    marginRight: "3%",
                    marginTop:"5%"
                }}>
                    <Link style={{textDecoration: "none"}} to='/Datenquelle'><Button sx={{
                        height: "100%",
                        width: "auto",
                        borderColor: "#1d4189",
                        "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                        color: "#1d4189"
                    }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{
                        width: "auto",
                        borderColor: "#B11B18",
                        color: "#B11B18",
                        "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                    }} variant="outlined"><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}}  onClick={() => {visitedSite("matchingmethode");}} to='/Matching-Methode'>
                        <Button   sx={{
                        height: "100%",
                        width: "auto",
                        color: "white",
                        border: "none",
                        backgroundColor: "#1d4189",
                        "&:hover": {backgroundColor: "#1d4189"}
                    }} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

            </CardContent>
        </Card>
    );

}

