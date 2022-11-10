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


function Zielvariable({setZielvariable}) {

    const [selectionModel, setSelectionModel] = useState('');


    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true},
        { field: 'variable', headerName: 'Variable', width: 130 },

    ];

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
        setZielvariable(selectedRowsData[0].variable);
    };


    return (
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Matching
                </Typography>
                <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}>
                    Zielvariable
                </Typography>
<br/>
                <DataGrid density="compact"
                          SelectionMode="Single"
                          checkboxSelection={true}
                          maxSelected={1}
                          disableMultipleSelection="true"
                          disableSelectionOnClick="true"
                          sx={{display:"flex", width:"55%",height:"61%", alignSelf:"center", marginLeft:"23%", marginBottom:"2%"}}
                    rows={rows}
                    columns={columns}
                    pageSize={6}
                    rowsPerPageOptions={[6]}
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    hideColumnsHeader
                    headerHeight={0}
                          onSelectionModelChange={(newSelectionModel) => {
                              setSelectionModel((prevModel) =>
                                  newSelectionModel.filter((newId) => !prevModel.includes(newId))
                              );
                          }
                          }
                          selectionModel={selectionModel}

                />
<br/>

                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/Matching-Methode'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/Kontrollvariablen' onClick={()=>visitedSite("kontrollvariablen")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>

            </CardContent>
    );
}

export default Zielvariable;
