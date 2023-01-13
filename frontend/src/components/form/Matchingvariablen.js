import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from '@mui/x-data-grid';
import { visitedSite } from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";


function Matchingvariablen({ setMatchingvariablen, setAllMatchingvariablen, isDateiSpaltenNamen, isAllMatchingvariablen }) {

    console.log(isDateiSpaltenNamen);
    console.log(isDateiSpaltenNamen.length);

    let resultArray = [];

    for (let i = 1; i < isDateiSpaltenNamen.length; i++) {
        const tempObj = {
            id: i,
            var: isDateiSpaltenNamen[i]
        };
        resultArray.push(tempObj);
    }
    console.log(resultArray);
    let kVarray = [];
    let selectedRowsData;
    const onRowsSelectionHandler = (ids) => {
        selectedRowsData = ids.map((id) => resultArray.find((row) => row.id === id));
        console.log('selectedRowsData' + selectedRowsData);
        selectedRowsData.forEach((row) => { console.log(row.var); kVarray.push(row); });
        console.log(kVarray);

        setAllMatchingvariablen(kVarray);

        if (selectedRowsData.length != []) { setMatchingvariablen(selectedRowsData.length + " Matchingvariablen"); }
    };

    console.log(isAllMatchingvariablen);

    const [selectionModel, setSelectionModel] = useState();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'var', headerName: 'Variable', width: 130 },
    ];

    function löschen() {
        setMatchingvariablen('defaultMatchingvariablen');
        onRowsSelectionHandler([]);
        setSelectionModel('');
    }

    return (
        <Card sx={{ width: "100%", height: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "100%" }} />

            <CardContent sx={{ backgroundColor: "white", width: "100%", height: "57.5%" }}>

                <Typography sx={{ fontSize: 18, paddingTop: "1%", paddingLeft: "2%" }}>
                    Matchingvariablen
                </Typography>
                <br />
                <DataGrid id="datagrid" density="compact"
                          sx={{ overflow: 'auto', display: "flex", width: "55%", height: "100%", alignSelf: "center", marginLeft: "23%", marginBottom: "1%" }}
                          rows={resultArray}
                          columns={columns}
                          hideFooterPagination={true}
                          hideFooter={true}
                          checkboxSelection
                          onSelectionModelChange={(newSelectionModel) => {
                              onRowsSelectionHandler(newSelectionModel);
                              setSelectionModel(newSelectionModel);
                          }
                          }
                          selectionModel={selectionModel}
                />
                <br />

                <div style={{ height: "13%", display: "flex", float: "right", gap: "3%", width: "42%", marginRight: "3%" }}>
                    <Link style={{ textDecoration: "none" }} to='/Matching-Methode'><Button sx={{ height: "100%", width: "auto", borderColor: "#1d4189", "&:hover": { backgroundColor: "white", borderColor: "#1d4189" }, color: "#1d4189" }} variant="outlined"><ArrowBackIcon />Zurück</Button></Link>
                    <Button sx={{ width: "auto", borderColor: "#B11B18", color: "#B11B18", "&:hover": { backgroundColor: "white", borderColor: "#B11B18" } }} variant="outlined" onClick={löschen}><DeleteIcon />Löschen</Button>
                    <Link style={{ textDecoration: "none" }} to='/Matchingtoleranz' onClick={() => visitedSite("matchingtoleranz")}><Button sx={{ height: "100%", width: "auto", color: "white", border: "none", backgroundColor: "#1d4189", "&:hover": { backgroundColor: "#1d4189" } }} variant="filled">Weiter <ArrowForwardIcon /></Button></Link>

                </div>

            </CardContent>
        </Card>
    );
}

export default Matchingvariablen;
