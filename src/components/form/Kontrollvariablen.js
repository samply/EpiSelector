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


function Kontrollvariablen({setKontrollvariablen, setAllKontrollvariablen}) {

    const [selectionModel, setSelectionModel] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'var', headerName: 'Variable', width: 130 },
    ];

    const rows = [
        { id: 1, var: 'encid' },
        { id: 2, var: 'start' },
        { id: 3, var: 'end'},
        { id: 4, var: 'duration_h' },
        { id: 5, var: 'icu_mort' },
        { id: 6, var: 'sex'},
        { id: 7, var: 'age' },
        { id: 8, var: 'charlScore' },
        { id: 9, var: 'adm_tiss' },
        { id: 10, var: 'adm_sapsmod' },
    ];

    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
        setAllKontrollvariablen(selectedRowsData);
        if(selectedRowsData.length != []){setKontrollvariablen(selectedRowsData.length +"Kontrollvariablen");}
    };

    function löschen(){
        setKontrollvariablen('defaultKontrollvariablen');
        onRowsSelectionHandler([]);
        setSelectionModel('');
    }

    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching
            </Typography>
            <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}>
                Kontrollvariablen
            </Typography>
<br/>
            <DataGrid id="datagrid" density="compact"
                sx={{display:"flex", width:"55%",height:"62%", alignSelf:"center", marginLeft:"23%", marginBottom:"2%"}}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel)=>{
                onRowsSelectionHandler(newSelectionModel);
                setSelectionModel(newSelectionModel)}
                }
                      selectionModel={selectionModel}
            />
            <br/>

            <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                <Link style={{textDecoration: "none"}} to='/Zielvariable'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                <Link style={{textDecoration: "none"}} to='/Matching-Verhältnis' onClick={()=>visitedSite("matchingverhältnis")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

            </div>

        </CardContent>
    );
}

export default Kontrollvariablen;
