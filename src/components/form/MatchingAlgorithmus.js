import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {DataGrid} from "@mui/x-data-grid";
import {styled} from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import Card from "@mui/material/Card";
import {useState} from "react";
import {FormControlLabel, FormGroup, Radio, RadioGroup} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


function MatchingAlgorithmus({setAlgorithmus, setErsetzung}) {


    const [isActiveOM, setIsActiveOM] = useState(false);
    const [isActiveNNM, setIsActiveNNM] = useState(false);

    function handleClickOptionNNM(){
        if(!isActiveOM){
            setIsActiveNNM(current => !current);
            setAlgorithmus("NearestNeighbour");
        }

    }

    function handleClickOptionOM () {
        if(!isActiveNNM){
            setIsActiveOM(current => !current);
            setAlgorithmus("OptimalMatching");}


    }


    return (
        <CardContent sx={{backgroundColor: "white", width: "200%"}}>

            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                Matching
            </Typography>
            <Typography sx={{fontSize: 18, paddingTop:"3%", paddingLeft:"3%"}}  >
                Matching-Algorithmus
            </Typography>
            <table style={{width: "100%", height: "75%"}}>
                <tbody>
                <tr style={{
                    height: "60%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px", paddingBottom:"5%", paddingTop:"4%"}}>
                        <Box onClick={handleClickOptionNNM}
                             style={{
                                 backgroundColor: isActiveNNM? "#1d4189":'rgba(211,211,211, 0.8)',
                                 color: isActiveNNM? "white":"#666666",
                                 fontSize:"large",
                                 display: "flex",
                                 width: "15rem",
                                 height: "8rem",
                                 alignItems:"center",
                                 justifyContent: "space-evenly",
                                 borderRadius: "15px",
                                 boxShadow: isActiveNNM? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                             }}
                        > Nearest Neighbour <br/>Matching (NNM)
                        </Box>
                        <Box
                            style={{
                                backgroundColor: isActiveOM? "#1d4189":'rgba(211,211,211, 0.8)',
                                color: isActiveOM? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveOM ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionOM}
                        > Optimal Matching (OM)
                        </Box>
                    </FormGroup>
                </tr>
<tr style={{ display:"flex", paddingLeft:"5%", height:"50%", flexFlow:"column"}}>
    <Typography sx={{fontSize: 18, fontWeight:"normal"}} >
        Selektion der Kontrollen:
    </Typography>
    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="ohnErsetz"
        name="radio-buttons-group"
        onChange={(event)=>{setErsetzung(event.target.value);}}
    >
        <FormControlLabel value="ohneErsetz" control={<Radio />} label="Ohne Ersetzung, die Kontrolle kann nur als Kontrolle für einen einzigen Fall dienen" />
        <FormControlLabel value="mitErsetz" control={<Radio />} label="Mit Ersetzung, eine Kontrolle kann als Kontrolle für mehrere Fälle dienen" />
    </RadioGroup>

</tr>
                </tbody></table>
                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%"}}>
                    <Link style={{textDecoration: "none"}} to='/MethodeScoreBerechnung'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" ><DeleteIcon/>Löschen</Button>
                    <Link style={{textDecoration: "none"}} to='/ÜbereinstimmungPropensityScore' onClick={()=>visitedSite("übereinstimmung")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>
        </CardContent>
    );

}

export default MatchingAlgorithmus;
