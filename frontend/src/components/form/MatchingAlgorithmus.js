import '../../App.css';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import {FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import Box from "@mui/material/Box";
import {visitedSite} from "../NavB";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";



function MatchingAlgorithmus({setAlgorithmus, setErsetzung, isErsetzung, isAlgorithmus}) {

    const [isActiveOM, setIsActiveOM] = useState(false);
    const [isActiveNNM, setIsActiveNNM] = useState(false);

    const [isChecked, setChecked] = useState(() => {
        if(isErsetzung ==="Ohne Ersetzung"){
            return true;
        }else{
            return false;
        }

    });

    const [isChecked1, setChecked1] = useState(() => {
        if(isErsetzung ==="Mit Ersetzung"){
            return true;
        }else{
            return false;
        }
    });

    function handleClickOptionNNM(){
        if(!isActiveNNM){
            setIsActiveNNM(true);
            setAlgorithmus("Nearest Neighbour");
            setIsActiveOM(false);
        }
    }

    function handleClickOptionOM () {
        if(!isActiveOM){
            setIsActiveOM(true);
            setAlgorithmus("Optimal Matching");
            setErsetzung(" ");
        }
        setIsActiveNNM(false);
    }

    function löschen(){
        setAlgorithmus('defaultAlgo');
        setIsActiveNNM(false);
        setIsActiveOM(false);
        setErsetzung('Ohne Ersetzung');

    }

    function defaultValueOE(){
        if(isErsetzung === "Ohne Ersetzung"){
            return true;
        }else{
            return false;
        }
    };
    function defaultValueME(){
        if(isErsetzung === "Mit Ersetzung"){
            return true;
        }else{
            return false;
        }
    };

    const ersetzungsPart = () =>{
        if(isActiveOM === false && isActiveNNM === true || isAlgorithmus === "Nearest Neighbour"){
            return (<div style={{ display:"flex", paddingLeft:"5%", height:"50%", flexFlow:"column", paddingBottom:"4%"}}>
                        <Typography style={{fontSize: 18, fontWeight:"normal"}} >
                            Selektion der Kontrollen:
                        </Typography>

                        <div style={{display:"flex", flexFlow:"row"}}>
                            <input type="radio" value="OhneErsetzung" checked={isChecked} onClick={
                                (event) => {
                                   if(isChecked === true){

                                   }else{
                                       setChecked(true);
                                       setErsetzung("Ohne Ersetzung");
                                       setChecked1(false);
                                   }
                                }}/>    <label style={{marginBottom:"3px"}}>Ohne Ersetzung, die Kontrolle kann nur als Kontrolle für einen einzigen Fall dienen</label>
                        </div>
                        <div style={{display:"flex", flexFlow:"row"}}>
                            <input type="radio" value="MitErsetzung" checked={isChecked1} onClick={
                                (event) => {
                                   if(isChecked1 === false){
                                       setChecked1(true);
                                       setErsetzung("Mit Ersetzung")
                                       setChecked(false);
                                   }else{

                                   }
                                }
                            }/>    <label style={{marginBottom:"3px"}}>Mit Ersetzung, eine Kontrolle kann als Kontrolle für mehrere Fälle dienen</label>
                        </div>
                    </div>
            );
        }else{

            return (<div style={{marginBottom:"12%"}}> </div>)
        }
    }


    return (
        <Card sx={{width:"100%", borderRadius: '10px 10px 10px 10px'}}>
            <CardHeader
                title="Matching"
                titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>
            <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"3%",  paddingLeft:"3%"}}  >
                Matching-Algorithmus
            </Typography>
            <div style={{width: "100%", height: "75%"}}>
                <div style={{
                    height: "60%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    paddingBottom:"5%"

                }}>
                    <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px", paddingTop:"2%"}}>
                        <Box onClick={handleClickOptionNNM}
                             style={{
                                 backgroundColor: isActiveNNM || isAlgorithmus === "Nearest Neighbour" ? "#1d4189":'#E8E9EB',
                                 color: isActiveNNM || isAlgorithmus === "Nearest Neighbour" ? "white":"#666666",
                                 fontSize:"large",
                                 display: "flex",
                                 width: "15rem",
                                 height: "8rem",
                                 alignItems:"center",
                                 justifyContent: "space-evenly",
                                 borderRadius: "15px",
                                 boxShadow: isActiveNNM || isAlgorithmus === "Nearest Neighbour" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                             }}
                        > Nearest Neighbour <br/>Matching (NNM)
                        </Box>
                        <Box
                            style={{
                                backgroundColor: isActiveOM || isAlgorithmus === "Optimal Matching" ? "#1d4189":'#E8E9EB',
                                color: isActiveOM || isAlgorithmus === "Optimal Matching" ? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveOM || isAlgorithmus === "Optimal Matching" ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                            onClick={handleClickOptionOM}
                        > Optimal Matching (OM)
                        </Box>
                    </FormGroup>
                </div>
                {ersetzungsPart()}
             </div>
                <div style={{ height: "8%", display:"flex", float:"right", gap:"3%", width:"42%", marginRight:"3%"}}>
                    <Link style={{textDecoration: "none"}} to='/MethodeScoreBerechnung'><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Zurück</Button></Link>
                    <Link style={{textDecoration: "none"}}><Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined" onClick={löschen} ><DeleteIcon/>Löschen</Button></Link>
                    <Link style={{textDecoration: "none"}} to='/ÜbereinstimmungPropensityScore' onClick={()=>visitedSite("übereinstimmung")}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Weiter <ArrowForwardIcon/></Button></Link>

                </div>
        </CardContent>
        </Card>
    );

}

export default MatchingAlgorithmus;
