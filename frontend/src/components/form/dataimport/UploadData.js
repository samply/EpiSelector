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
import CardActions from "@mui/material/CardActions";
import Grid from '@mui/material/Grid';
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {AlertTitle} from "@mui/lab";


export default function UploadData() {
    const { setDatei, isBeobachtungen, setDateiSpaltenNamen, setVollständigeDatei, isVollständigeDatei, setBeobachtungen, setOnlyBinaryColumns, setWorkflow } = useContext(AppContext);

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

            // Umformatieren der CSV-Daten mit Typ-Konvertierung
            const jsonData = {};
            headers.forEach((header, index) => {
                const columnName = header.trim(); // Entferne Leerzeichen
                const columnData = [];
                rows.forEach((row) => {
                    const value = row[index] !== undefined ? row[index].trim() : ''; // Überprüfe auf undefiniert
                    if (value !== '') { // Füge nur Werte hinzu, die nicht leer sind
                        // Typ-Konvertierung: Zahlen zu Float, Rest als String
                        let convertedValue = value;
                        
                        // Prüfe ob es eine reine Zahl ist (inkl. Dezimalzahlen)
                        if (/^-?\d*\.?\d+$/.test(value)) {
                            convertedValue = parseFloat(value);
                            console.log(`Converting "${value}" to float: ${convertedValue}`);
                        } 
                        // Prüfe ob es ein Datum ist (verschiedene Formate)
                        else if (/^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}$/.test(value) || 
                                /^\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}$/.test(value) ||
                                /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(value)) {
                            convertedValue = value; // Datum als String belassen
                            console.log(`Keeping date as string: "${value}"`);
                        }
                        // Alles andere als String
                        else {
                            convertedValue = value;
                        }
                        
                        columnData.push(convertedValue);
                    }
                });
                jsonData[columnName] = columnData;
                console.log(`Anzahl der Werte in Spalte "${columnName}": ${columnData.length}`);
            });


            // jsonData enthält jetzt das gewünschte JSON-Objekt
            console.log(jsonData);

            // Setze hier die Daten in deinen State oder führe andere Aktionen aus

            setDatei(file.name);
            setDateiSpaltenNamen(headers);
            setOnlyBinaryColumns(headers);
            setVollständigeDatei(jsonData);
            setBeobachtungen(rows.length-1);

            console.log(rows.length-1);
            console.log("Dateiname:", file.name);
            console.log(headers);
            console.log(isBeobachtungen);
        };
        reader.readAsText(file);
        setCsvImported(true);
    };






    const handleInputChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const [open, setOpen] = React.useState(false);
    const [isPlaceholder, setPlaceholder] = React.useState(true);

    let toFunction = () => {
        if(isVollständigeDatei==="defaultVollständigedatei"){
            return "";
        }
        else{
            return "/Matching-Methode";
        }


    };

    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingBottom: "1%", paddingLeft: "3%"}}>
                    Datei hochladen
                </Typography>{/* File Uploader */}
                <Collapse in={open}>
                    <Alert style={{maxWidth: "82%", marginLeft: "7%"}} action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                                setPlaceholder(true);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                           sx={{mb: 2}} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Keine Daten — <strong>Sie müssen eine Datei hochladen, um
                        fortzufahren</strong>
                    </Alert>

                </Collapse>
                <Collapse in={isPlaceholder}>
                    <div style={{margin: "10%"}}></div>
                </Collapse>

                <div onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                        border: '2px dashed #1d4189',
                        padding: '20px',
                        marginBottom: '20px',
                        width: "80%",
                        marginLeft: "5%"
                    }}
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
                        <Button component="span" variant="filled" sx={{
                            backgroundColor: "#1d4189",
                            color: "white",
                            "&:hover": {backgroundColor: "#1d4189"}
                        }}>
                            Datei auswählen
                        </Button>
                    </label>
                </div>

                <br/>

                <p style={{marginLeft:'5%', display: "flex", alignItems: "center"}}>
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
            </CardContent>

            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>

                <Grid item> <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Datenquelle");
                }} to='/Datenquelle'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
              {/*  <Grid item>

                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={()=>{setDatei('defaultDatei'); }}><DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>

                <Link style={{textDecoration: "none"}} onClick={() => {  if (isVollständigeDatei === "defaultVollständigedatei") {
                    setOpen(true);
                    setPlaceholder(false);
                }else{
                    visitedSite("matchingmethode");
                    setWorkflow("Matching-Methode");}
                }} to={toFunction()}>
                    <Button sx={{
                        height: "100%",
                        width: "auto",
                        color: "white",
                        border: "none",
                        backgroundColor: "#1d4189",
                        "&:hover": {backgroundColor: "#1d4189"}
                    }} variant="filled">Weiter <ArrowForwardIcon/></Button>
                </Link>
                </Grid>
            </Grid>


        </Card>
    );

}
