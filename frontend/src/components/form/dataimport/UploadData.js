import '../../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import Papa from 'papaparse';
import {useContext, useState} from "react";
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
import AppContext from '../../../AppContext';


export default function UploadData() {
    const { setDatei, setDateiSpaltenNamen, setVollständigeDatei, isVollständigeDatei, setBeobachtungen, setOnlyBinaryColumns, setWorkflow } = useContext(AppContext);

    const [file, setFile] = useState('');
    const [array, setArray] = useState([]);
    const [csvImported, setCsvImported] = useState(false);
    const [importFailed, setImportFailed] = useState(false);


    let column = [];
    let rows = [];
    let data = [];
    new FileReader();
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const csv = event.target.result;
            const parsed = Papa.parse(csv);
            const headers = parsed.data[0];
            const rows = parsed.data.slice(1);

            // Umformatieren der CSV-Daten
            let reformattedCsv = '';
            headers.forEach((header, index) => {
                reformattedCsv += header + ',';
                rows.forEach(row => {
                    reformattedCsv += row[index] + ',';
                });
                reformattedCsv += '\n';
            });

            setDatei(file.name);
            setDateiSpaltenNamen(headers);
            setOnlyBinaryColumns(headers);
            setVollständigeDatei(reformattedCsv);

            console.log("Dateiname:", file.name);
            console.log(reformattedCsv);
            console.log(headers);

            setCsvImported(true);
        };
        reader.readAsText(file);
    };




    const handleInputChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

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


                    <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        style={{border: '2px dashed #1d4189', padding: '20px', marginBottom: '20px', width:"80%", marginLeft:"5%"}}
                    >
                        <p>CSV-Datei hier ablegen oder</p>
                        <input
                            type="file"
                            id="csvFileInput"
                            accept=".csv"
                            onChange={handleInputChange}
                            style={{display: 'none'}}
                        />
                        <label htmlFor="csvFileInput">
                            <Button component="span" variant="filled" sx={{backgroundColor: "#1d4189", color:"white",  "&:hover": {backgroundColor: "#1d4189"}}}>
                                Datei auswählen
                            </Button>
                        </label>
                    </div>

                    <br/>

                <p style={{display: "flex", alignItems: "center"}}>
                    {csvImported && (
                        <>
                            <CheckCircle style={{color: 'green'}} className="checkIcon"/>
                            <p style={{color: "green", marginLeft: "5px"}}>CSV erfolgreich importiert.</p>
                        </>
                    )}
                    {importFailed && (
                        <>
                            <Cancel style={{color: 'red'}} className="cancelIcon"/>
                            <p style={{color: "red", marginLeft: "5px"}}>Fehler - Bitte versuchen Sie es erneut.</p>
                        </>
                    )}
                </p>

                <div style={{
                    height: "8%",
                    display: "flex",
                    float: "right",
                    gap: "3%",
                    width: "42%",
                    marginRight: "3%",
                    marginTop: "5%"
                }}>
                    <Link style={{textDecoration: "none"}} onClick={() => {
                        setWorkflow("Datenquelle");
                    }} to='/Datenquelle' ><Button sx={{
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
                    <Link style={{textDecoration: "none"}} onClick={() => {
                        visitedSite("matchingmethode"); setWorkflow("Matching-Methode");
                    }} to='/Matching-Methode'>
                        <Button sx={{
                            height: "100%",
                            width: "auto",
                            color: "white",
                            border: "none",
                            backgroundColor: "#1d4189",
                            "&:hover": {backgroundColor: "#1d4189"}
                        }} variant="filled">Weiter <ArrowForwardIcon/></Button>
                    </Link>

                </div>

            </CardContent>
        </Card>
    );

}
