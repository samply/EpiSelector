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
import {CardHeader, Checkbox} from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";


function FälleKontrollen({ setFälleKontrollenGruppenIndikator, isAllMatchingvariablen }) {

    const renderDetailsButton = (params) => {
        return (
            <strong>
                <Checkbox
                    size="small"
                    style={{ marginLeft: 16 }}
                    onChange={() => {
                        console.log(params.row.variable);
                        setFälleKontrollenGruppenIndikator("Gruppenindikator: " + params.row.variable );
                    }}
                >
                    More Info
                </Checkbox>
            </strong>
        )
    }


    let tmpFallID = [];
    let gruppenindikatorToggle = true;


    function selectFallID(event){
        tmpFallID.push(event.value);
    }

  /*  const columns = [
        { field: 'id', headerName: 'ID', width: 0, hide: true},
        { field: 'variable', headerName: 'Variable', width: 255},
        { field: 'gruppenindikator', headerName: 'Gruppenindikator', width: 165,  renderCell: () => (
                <div>
                    <Checkbox id="checkboxgruppenindikator" onChange={selectGruppenindikator}/>
                </div>
            ),},
        { field: 'fallID', headerName: 'Fall-ID',     headerClassName: 'super-app-theme--header', width: 165, renderCell: () => (
                <div>
                    <Checkbox id="checkboxfallid" onChange={selectFallID}/>
                </div>
            ), },
    ];*/

    const columns = [
        { field: 'id', headerName: 'ID', width: 0, hide: true},
        { field: 'variable', headerName: 'Variable', width: 255, disableClickEventBubbling: true},
        { field: 'gruppenindikator', headerName: 'Gruppenindikator', width: 165,  renderCell: renderDetailsButton, disableClickEventBubbling: true,},
        { field: 'fallID', headerName: 'Fall-ID',     headerClassName: 'super-app-theme--header', width: 165,  renderCell: renderDetailsButton, disableClickEventBubbling: true, },
    ];

    let rows=[];
    for (let i = 0; i < isAllMatchingvariablen.length; i++) {
        const tempObj = {
            id: i,
            variable: isAllMatchingvariablen[i].var,
            gruppenindikator: "",
            fallID: " ",
        };
        rows.push(tempObj);
    }

    return (
        <Card sx={{ width: "100%", height: "100%", borderRadius: '10px 10px 10px 10px' }}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                sx={{ backgroundColor: "#E9F0FF", minWidth: "80%" }} />

            <CardContent sx={{ backgroundColor: "white", width: "100%", height: "59%" }}>

                <Typography sx={{ fontSize: 18, paddingTop: "1%", paddingLeft: "2%" }}>
                    Variable für Fälle und Kontrollen definieren
                </Typography>

                <br />
                <DataGrid id="datagrid" density="compact"
                          sx={{ overflow: 'auto', display: "flex", width: "65%", height: "100%", alignSelf: "center", marginLeft: "15%", marginBottom: "1%" }}
                          rows={rows}
                          columns={columns}
                          hideFooterPagination={true}
                          hideFooter={true}
                />

                <br />

                <div style={{ height: "13%", display: "flex", float: "right", gap: "3%",width: "42%", marginRight: "3%"  }}>
                    <Link style={{ textDecoration: "none" }} to='/Matchingtoleranz'><Button sx={{ height: "100%", width: "auto", borderColor: "#1d4189", "&:hover": { backgroundColor: "white", borderColor: "#1d4189" }, color: "#1d4189" }} variant="outlined"><ArrowBackIcon />Zurück</Button></Link>
                    <Button sx={{ width: "auto", borderColor: "#B11B18", color: "#B11B18", "&:hover": { backgroundColor: "white", borderColor: "#B11B18" } }} variant="outlined" ><DeleteIcon />Löschen</Button>
                    <Link style={{ textDecoration: "none" }} to='/Matching-Verhältnis' onClick={() => visitedSite("matchingverhältnis")}><Button sx={{ height: "100%", width: "auto", color: "white", border: "none", backgroundColor: "#1d4189", "&:hover": { backgroundColor: "#1d4189" } }} variant="filled">Weiter <ArrowForwardIcon /></Button></Link>

                </div>

            </CardContent>
        </Card>
    );
}

export default FälleKontrollen;
