import '../../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Papa from 'papaparse';
import {useState} from "react";
import Datainput from "../../../model/DataInput";
import Form from '../../../model/Form';
import {visitedSite} from "../../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


export default function UploadData({setDatei, setDateiSpaltennamen, setVollständigeDatei}) {

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
                setDateiSpaltennamen(rowsArray[0]);
                setVollständigeDatei(event.target.files[0]);

                Datainput = new Datainput(rowsArray, valuesArray);

                Form.state.datei = Datainput.toString();
                console.log(Form.state.datei);
            },
        });
    };

    return (
            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"5%"}} >
                    Datei hochladen
                </Typography>{/* File Uploader */}
                <table style={{width: "100%", height: "46%"}}>
                    <tbody>
                    <tr>
                        <td>
                            <input
                                type="file"
                                name="file"
                                onChange={changeHandler}
                                accept=".csv"
                                style={{
                                    marginTop: "5%",
                                    marginLeft: "5%",
                                    padding: "5%",
                                    border: "dashed lightgrey",
                                    width: "80%",
                                    justifyContent: "space-evenly"
                                }}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <br/><br/><br/><br/><br/><br/>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/Datenquelle'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Matching-Methode' onClick={()=>visitedSite("matchingmethode")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

            </CardContent>
    );
}


