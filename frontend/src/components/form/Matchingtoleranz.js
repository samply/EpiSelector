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
import { useState} from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';



function Matchingtoleranz({ setMatchingtoleranzChip, setMatchingtoleranz, isAllMatchingvariablen, isMatchingtoleranz, setWorkflow }) {

    let tableArray = [];
    let placeholder=[];

    const [toleranzwert, settoleranzwert] = useState(() => { if(isMatchingtoleranz===""){for( let i =0; i< isAllMatchingvariablen.length; i++){placeholder[i]="0.00 ";} setMatchingtoleranz(placeholder); return placeholder; }else{ return isMatchingtoleranz} });

    for (let i = 0; i < isAllMatchingvariablen.length; i++) {
            const tempObj = {
                id: i,
                ausgewählteVariablen: isAllMatchingvariablen[i].var,
                toleranzwert: toleranzwert[i],
            };
        tableArray.push(tempObj);
    }
    console.log(tableArray);

    const columns = [
        { field: 'id', headerName: 'ID', width: 0, hide: true},
        { field: 'ausgewählteVariablen', headerName: 'Ausgewählte Variable', width: 295},
        { field: 'toleranzwert', headerName: 'Toleranzwert', width: 290,  renderCell: (params) => (
                <span>± {params.value}</span>
            ),
            editable: true,
        },
    ];

    let tmpArray = [];

    function handleRowEditCommit(event){
        console.log(event.value);
        console.log(event.id);
        let newValue = event.value;
        let newValueId = event.id;

        tableArray[newValueId].toleranzwert=newValue;
        console.log(tableArray[newValueId].toleranzwert);


        for (let i = 0; i < tableArray.length; i++) {
            tmpArray.push(tableArray[i].toleranzwert);
        }
        console.log(tmpArray);
        setMatchingtoleranz(tmpArray);
        settoleranzwert(tmpArray);
        console.log(tmpArray);
    }
    setMatchingtoleranzChip(isMatchingtoleranz.length +" Toleranzwerte")

    console.log(tableArray);

    console.log(isMatchingtoleranz);


    function löschen() {
        setMatchingtoleranz("");
        setMatchingtoleranzChip("");
    }

    return (
        <Card sx={{width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize: 14, color: "text.secondary"}}
                sx={{backgroundColor: "#E9F0FF", minWidth: "100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%", height: "59%"}}>

                <Typography sx={{fontSize: 18, paddingTop: "1%", paddingLeft: "2%"}}>
                    Matchingtoleranz
                </Typography>
                <br/>

                <DataGrid id="datagrid" density="compact"
                          sx={{
                              overflow: 'auto',
                              display: "flex",
                              width: "65%",
                              height: "100%",
                              alignSelf: "center",
                              marginLeft: "15%",
                              marginBottom: "1%"
                          }}
                          rows={tableArray}
                          columns={columns}
                          hideFooterPagination={true}
                          hideFooter={true}
                          checkboxSelection={false}
                          onCellEditCommit={handleRowEditCommit}

                />
                <br/>


            </CardContent>
            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>  <Link style={{textDecoration: "none"}} onClick={() => {
                    setWorkflow("Matchingvariablen")
                }} to='/Matchingvariablen'><Button sx={{
                    height: "100%",
                    width: "auto",
                    borderColor: "#1d4189",
                    "&:hover": {backgroundColor: "white", borderColor: "#1d4189"},
                    color: "#1d4189"
                }} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                </Grid>
                <Grid item>
                <Button sx={{
                    width: "auto",
                    borderColor: "#B11B18",
                    color: "#B11B18",
                    "&:hover": {backgroundColor: "white", borderColor: "#B11B18"}
                }} variant="outlined" onClick={löschen}><DeleteIcon/>Löschen</Button>
                </Grid>
                <Grid item>
                <Link style={{textDecoration: "none"}} to='/FälleKontrollen' onClick={() => {
                    visitedSite("fällekontrollen");
                    setWorkflow("VariableFälleKontrolle")
                }}><Button sx={{
                    height: "100%",
                    width: "auto",
                    color: "white",
                    border: "none",
                    backgroundColor: "#1d4189",
                    "&:hover": {backgroundColor: "#1d4189"}
                }} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>
                </Grid>
            </Grid>
        </Card>
    );
}

export default Matchingtoleranz;
