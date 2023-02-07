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

    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));

                });

                // Parsed Data Response in array format
                setParsedData(results.data);

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                setValues(valuesArray);

                setDatei(event.target.files[0].name);
                setDateiSpaltenNamen(rowsArray[0]);
                setVollständigeDatei(test_data);

                console.log(results.data)
                console.log(valuesArray.length)
                setBeobachtungen(valuesArray.length);
                console.log(isVollständigeDatei);

                Datainput = new Datainput(rowsArray, valuesArray);

                Form.state.datei = Datainput.toString();
                console.log(Form.state.datei);
            },
        });
    };

    return (
        <Card  sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"1%", paddingLeft:"3%"}} >
                    Datei hochladen
                </Typography>{/* File Uploader */}
                <div style={{width: "100%", height: "80%", paddingBottom:"17%"}}>

                            <input
                                type="file"
                                name="file"
                                onChange={changeHandler}
                                accept=".csv"
                                style={{
                                    marginTop: "5%",
                                    marginLeft: "3%",
                                    padding: "5%",
                                    border: "dashed lightgrey",
                                    width: "80%",
                                    justifyContent: "space-evenly"
                                }}
                            />

                </div>


                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to='/Datenquelle'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Matching-Methode' onClick={()=> {
                        visitedSite("matchingmethode");
                    }}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

            </CardContent>
        </Card>
    );
}


