import '../../../App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import PropTypes from 'prop-types';
import Files from './Files';
import axios from 'axios'
import Papa from 'papaparse';
import { useState } from "react";


function UploadData(props) {

    const [value, setValue] = React.useState(2);
    const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
      color: grey;
      &.Mui-selected {
        color: #1d4189;
      };
    `);

    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);


    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0],{
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

            },
        });
    };

    return (
        <React.Fragment className="Mainpage">
            <CardContent sx={{backgroundColor: "white", width: "200%"}}>

                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    Datei hochladen:
                </Typography>            {/* File Uploader */}
                <table style={{width: "100%", height: "100%"}}>
                    <tr>

            <input
                type="file"
                name="file"
                onChange={changeHandler}
                accept=".csv"
                style={{marginTop:"5%", marginLeft: "5%", padding:"10%", border:"dashed lightgrey", width:"65%", justifyContent:"space-evenly"}}
            />
            <br />
            <br />
          {/*   Table
            <table>
                <thead>
                <tr>
                    {tableRows.map((rows, index) => {
                        return <th key={index}>{rows}</th>;
                    })}
                </tr>
                </thead>
                <tbody>
                {values.map((value, index) => {
                    return (
                        <tr key={index}>
                            {value.map((val, i) => {
                                return <td key={i}>{val}</td>;
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </table>*/}
                    </tr>
                <tr style={{ height: "15%", display:"flex", float:"right"}}>
                <BottomNavigation showLabels value={value} onChange={(event, newValue) => {setValue(newValue);}} >
                    <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                            component={Link} to='/Datenquelle'/>
                    <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                    <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                            component={Link} to='/Matching-Methode'/>
                </BottomNavigation>
                </tr>
                </table>
            </CardContent>
        </React.Fragment>
    );
}

export default UploadData;

