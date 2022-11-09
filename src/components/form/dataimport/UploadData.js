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


export default function UploadData({setDatei}) {

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
                <table style={{width: "100%", height: "45%"}}>
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
                <div style={{height: "10%", display: "flex", float: "right"}}>
                    <BottomNavigation showLabels value={value} onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                        <BottomNavigationAction variant="outlined" label="Zurück" icon={<ArrowCircleLeftIcon/>}
                                                component={Link} to='/Datenquelle'/>
                        <BottomNavigationAction variant="outlined" label="Löschen" icon={<DeleteIcon/>}/>
                        <BottomNavigationAction variant="fill" label="Weiter" icon={<ArrowCircleRightIcon/>}
                                                component={Link} to='/Matching-Methode' onClick={()=>visitedSite("matchingmethode")}/>
                    </BottomNavigation>
                </div>
            </CardContent>
    );
}


