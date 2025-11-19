import '../../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import {FormGroup} from "@material-ui/core";
import { useState} from 'react';
import {visitedSite} from '../../NavB';
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from '@mui/material/Grid';


function Datenquelle({setDatenquelle, isDatenquelle, setWorkflow}) {

    const [isActiveDRE, setIsActiveDRE] = useState(false);
    const [isActiveGeraet, setIsActiveGeraet] = useState(false);

    const [isAuswahl, setAuswahl] = useState('');

    function handleClickOptionGeraet(){
        if(!isActiveGeraet ){
            setIsActiveGeraet(true);
            setDatenquelle("Local");
            setIsActiveDRE(false);
        }
    }

    function handleClickOptionDRE () {
        if(!isActiveDRE){
        setIsActiveDRE(true);
        setDatenquelle("DRE");}
        setIsActiveGeraet(false);
    }

    function löschen(){
        setDatenquelle('defaultQuelle');
        setIsActiveDRE(false);
        setIsActiveGeraet(false);
    }

    return (
        <Card sx={{ width: "100%", borderRadius: '10px 10px 10px 10px', position: 'relative' }}>
        <CardHeader
            title="Matching"
            titleTypographyProps={{fontSize:14, color:"text.secondary"}}
            sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

            <CardContent sx={{backgroundColor: "white", width: "100%"}}>

                <Typography sx={{fontSize: 18, paddingTop:"1%",paddingBottom:"8%", paddingLeft:"3%"}} >
                    Select data source
                </Typography>
                    <div style={{
                        minHeight: "80%",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        paddingBottom:"14%"
                    }}>
                        <FormGroup style={{display:"flex", flexFlow:"row", justifyContent:"space-evenly", gap:"100px"}}>
                        <Box onClick={handleClickOptionGeraet}
                             title="Laden Sie Ihre Daten Local aus Ihrem Rechner hoch."
                             style={{
                                backgroundColor: isActiveGeraet || isDatenquelle==="Gerät" ? "#1d4189":'#E8E9EB',
                                color: isActiveGeraet || isDatenquelle==="Gerät" ? "white":"#666666",
                                fontSize:"large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems:"center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveGeraet || isDatenquelle==="Gerät" ?"#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                            }}
                        > Local
                        </Box>
                            <Box style={{
                                backgroundColor: isActiveDRE || isDatenquelle === "DRE" ? "#1d4189" : '#E8E9EB',
                                color: isActiveDRE || isDatenquelle === "DRE" ? "white" : "#666666",
                                fontSize: "large",
                                display: "flex",
                                width: "15rem",
                                height: "8rem",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                borderRadius: "15px",
                                boxShadow: isActiveDRE || isDatenquelle === "DRE" ? "#1d4189 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px" : "",
                                pointerEvents: isActiveDRE || isDatenquelle === "DRE" ? "auto" : "none",
                                opacity: isActiveDRE || isDatenquelle === "DRE" ? 1 : 0.5,
                            }}
                        >
                            External source
                        </Box>

                        </FormGroup>
                    </div>
            </CardContent>

            <Grid container justifyContent="flex-end" sx={{ position: 'absolute', float:'right', bottom: 0, gap:'2%', width: '100%', padding: '8px', backgroundColor: '#f5f5f5' }}>
                <Grid item>
                    <Link style={{textDecoration: "none"}} to='/Startseite' onClick={()=>{setWorkflow("Startseite");}}><Button sx={{height:"100%", width:"auto", borderColor:"#1d4189","&:hover": { backgroundColor: "white", borderColor:"#1d4189" }, color:"#1d4189"}} variant="outlined"><ArrowBackIcon/>Back</Button></Link>
                </Grid>
                {/*<Grid item>
                    <Button sx={{width:"auto", borderColor:"#B11B18", color:"#B11B18","&:hover": {backgroundColor: "white", borderColor:"#B11B18" }}} variant="outlined"onClick={löschen}> <DeleteIcon/>Löschen</Button>
                </Grid>*/}
                <Grid item>
                    <Link style={{textDecoration: "none"}} to='/Datei-hochladen' onClick={()=>{visitedSite("dateihochladen"); setWorkflow("Datei-hochladen");}}><Button sx={{height:"100%", width:"auto", color:"white", border:"none",backgroundColor:"#1d4189", "&:hover": { backgroundColor: "#1d4189" }}} variant="filled">Next <ArrowForwardIcon/></Button></Link>
                </Grid>
            </Grid>
        </Card>
    );

}

export default Datenquelle;
