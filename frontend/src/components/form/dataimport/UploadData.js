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


export default function UploadData({ setDatei, setDateiSpaltenNamen, setVollständigeDatei, isDatei, isVollständigeDatei, setBeobachtungen}) {

    const [file, setFile] = useState();
    const [array, setArray] = useState([]);


    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        console.log(e.target.files[0].name);
        setFile(e.target.files[0]);
        setDatei(e.target.files[0].name);

        const files = e.target.files;
        console.log(files);
        if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
                    complete: function (results) {
                        console.log("Finished:", results.data);
                        const jsonFile =   results.data[0].reduce((a,v) => ({...a,[v]:v}), {});
                        console.log("jsonFile" +jsonFile);
                    }
                }
            )
        }




    };

    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
        console.log("csvHeader" + csvHeader);
        console.log("csvRows" + csvRows);


        setDateiSpaltenNamen(csvHeader);

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(array);
        //--------------------------------------
        /* var array = string.toString().split(" ")
         //  console.log(array); here we are getting the first rows which is our header rows to convert it into keys we are logging it here
         var data = []
         // console.log(data);
         for(const r of array){
             // console.log(r);
             let row = r.toString().split(",")
             data.push(row)
         }
         console.log(data)
         var heading = data[0]
         // console.log(heading); to get the column headers which will act as key
         var ans_array = []
         // console.log(ans_array);
         for(var i=1;i<data.length;i++){
             var row = data[i]
             var obj = {}
             for(var j=0;j<heading.length;j++){
                 if(!row[j]){
                     row[j]="NA";
                 }
                 // console.log(row[j].toString())
                 obj[heading[j].replaceAll(" ","_")] = row[j].toString().replaceAll(" ","_")
             }
             ans_array.push(obj)
         }
         console.log({ans_array})*/
    };


    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                console.log("csvOutput" + csvOutput);
                setDateiSpaltenNamen(csvOutput[0]);
                // setBeobachtungen(csvOutput.length);
                csvFileToArray(csvOutput);
            };

            fileReader.readAsText(file);
            console.log("fileReader" + fileReader);
        }
    };

    const headerKeys = Object.keys(Object.assign({}, ...array));


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
                <div style={{width: "100%", height: "80%", paddingBottom: "17%"}}>
                    <form>
                        <input
                            type={"file"}
                            id={"csvFileInput"}
                            accept={".csv"}
                            onChange={handleOnChange}
                        />

                        <button
                            onClick={(e) => {
                                handleOnSubmit(e);
                            }}
                        >
                            IMPORT CSV
                        </button>
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


                <div style={{
                    height: "8%",
                    display: "flex",
                    float: "right",
                    gap: "3%",
                    width: "42%",
                    marginRight: "3%"
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
                    <Link style={{textDecoration: "none"}} to='/Matching-Methode' onClick={() => {
                        visitedSite("matchingmethode");
                    }}><Button sx={{
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

