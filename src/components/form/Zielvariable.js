import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from '@mui/x-data-grid';
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useState} from "react";
import Card from "@mui/material/Card";
import {CardHeader} from "@mui/material";

function Zielvariable({setZielvariable, isDateiSpaltenname}) {

    const [selectionModel, setSelectionModel] = useState('');



    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true},
        { field: 'variable', headerName: 'Variable', width: 130 },
    ];

    const rows2 = {isDateiSpaltenname};
    const rows1 = Array.from({isDateiSpaltenname}, ([id, variable]) => {
        return{[id]: variable};
    });

    const rows = [
        { id: 1, variable: 'encid' },
        { id: 2, variable: 'start' },
        { id: 3, variable: 'end'},
        { id: 4, variable: 'duration_h' },
        { id: 5, variable: 'icu_mort' },
        { id: 6, variable: 'sex'},
        { id: 7, variable: 'age' },
        { id: 8, variable: 'charlScore' },
        { id: 9, variable: 'adm_tiss' },
        { id: 10, variable: 'adm_sapsmod' },
    ];

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
        selectedRowsData.forEach((row)=>{console.log(row.variable); setZielvariable(row.variable);});
    };

    function löschen(){
        setZielvariable('defaultZielvariable');
        setSelectionModel('');
        onRowsSelectionHandler([]);
    }

    return (
        <Card sx={{width:"100%", height:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%", height:"57%"}}>
                <Typography sx={{fontSize: 18, paddingTop:"1%", paddingLeft:"3%"}}>
                    Zielvariable
                </Typography>
             <br/>
                <DataGrid sx={{display:"flex", width:"55%",height:"100%", alignSelf:"center", marginLeft:"23%", marginBottom:"1.5%"}}
                          rows={rows}
                          columns={columns}
                          pageSize={6}
                          rowsPerPageOptions={[6]}
                          checkboxSelection
                          hideColumnsHeader
                          headerHeight={0}
                          density="compact"
                          onSelectionModelChange={(newSelectionModel) => {
                            onRowsSelectionHandler(newSelectionModel);
                            setSelectionModel((prevModel) =>
                            newSelectionModel.filter((newId) =>!prevModel.includes(newId))
                          );}}
                          selectionModel={selectionModel}
                />
<br/>

                <div style={{ height: "13%", display:"flex", float:"right", gap:"3%", width:"42%" ,marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to='/Matching-Methode'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Kontrollvariablen' onClick={()=>visitedSite("kontrollvariablen")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>
                </div>

            </CardContent>
        </Card>
    );
}

export default Zielvariable;
