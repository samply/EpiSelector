import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Link} from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import TollIcon from '@mui/icons-material/Toll';
import { CardHeader} from "@mui/material";
import {TimelineOppositeContent} from "@mui/lab";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";


export function visitedSite(icon){
    const elem = document.getElementById(icon);
    elem.style.backgroundColor="#1d4189";
}



function NavB({ isClickedMV, setClickedMV, isClickedKV, setClickedKV, setWorkflow, isDatenquelle, isDatei, isMatchingMethode, isZielvariable, isKontrollvariablen, isAllMatchingvariablen, isAllKontrollvariablen, isMatchingvariablen, isMatchingtoleranz, isMatchingtoleranzChip, isFälleKontrollenGruppenindikator,isFKChip, isVerhältnis,isVerhältnisNav, isScoreMethode, isScoreMethodeNav, isAlgorithmus, isAlgorithmusNav, isErsetzung, isErsetzungNav, isÜbereinstimmungswert}) {
    const [expanded, setExpanded] = React.useState(false);
    const [expanded1, setExpanded1] = React.useState(false);

    const[isKVarray, setKVarray] = useState(isAllKontrollvariablen);
    const[isMVarray, setMVarray] = useState(isAllMatchingvariablen);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleExpandClick1 = () => {
        setExpanded1(!expanded1);
    };

    const linkStyle = {
        textDecoration: "none",
        color: 'black',

    };

    let openNavigation;
    if(isMatchingMethode === "defaultMethode"){
        openNavigation = false;
    }else{
        openNavigation=true;
    }

    let isDefaultMethode = false;
    if(isMatchingMethode==="Exaktes Matching"){
        isDefaultMethode = false;
    }else{
        if(isMatchingMethode==="Propensity Score"){
            isDefaultMethode = true;
        }
    }


    function dropKV() {
        isAllKontrollvariablen.map(fruit => <div key={fruit}>{fruit.var}</div>)
    }

    return (
            <Card variant="outlined" className="NavBStyle" sx={{borderRadius: '10px 10px 10px 10px', boxShadow: '1' }}>
                <CardHeader
                    title="Process"
                    titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                    sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

                    <CardContent>
                        <Timeline position="right" sx={{align:"left", flex:0.1, marginTop:"-7px", marginLeft:"-20px"}}>

                           <TimelineItem>
                                <TimelineOppositeContent sx={{flex: 0}} color="textSecondary">
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot id="datenquelle"><BlurCircularOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Link to='/Datenquelle' style={linkStyle} onClick={() => {
                                        visitedSite("datenquelle");
                                        setWorkflow("Datenquelle");
                                    }}>Select data source
                                        <br/>
                                        {isDatenquelle && isDatenquelle !== "defaultQuelle" && (
                                            <div style={{
                                                display: "flex",
                                                paddingLeft: "10%",
                                                paddingRight: "10%",
                                                left: "60px",
                                                backgroundColor: "#B11B18",
                                                width: "auto",
                                                height: "42%",
                                                borderRadius: "15px",
                                                color: "white",
                                                justifyContent: "baseline",
                                                paddingTop: "1%",
                                            }}>{isDatenquelle}</div>
                                        )}
                                    </Link>
                                </TimelineContent>
                            </TimelineItem>

                                <TimelineItem>
                                <TimelineOppositeContent sx={{flex: 0}} color="textSecondary">
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                <TimelineDot id="dateihochladen"><UploadFileIcon/></TimelineDot>
                                <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                <Link to='/Datei-hochladen' onClick={()=>{visitedSite("dateihochladen");  setWorkflow("Datei-hochladen");}} style={linkStyle}>
                                Upload file<br/>
                                    {isDatei && isDatei !== "defaultDatei" && (
                                        <div
                                            style={{display: "flex",
                                            paddingLeft: "10%",
                                            paddingRight: "10%",
                                            left: "60px",
                                            backgroundColor: "#B11B18",
                                            width: "auto",
                                            height: "42%",
                                            borderRadius: "15px",
                                            color: "white",
                                            justifyContent: "baseline",
                                            paddingTop:"1%",
                                        }}> {isDatei}</div>
                                    )}
                                </Link>
                                </TimelineContent>
                                </TimelineItem>

                            <TimelineItem>
                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot id="matchingmethode"><JoinLeftIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Methode' onClick={()=>{visitedSite("matchingmethode"); setWorkflow("Matching-Methode")}}
                                                       style={linkStyle}>Matching method <br/>
                                                       {isMatchingMethode && isMatchingMethode !== "defaultMethode" && (
                                                        <div style={{  display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "auto",
                                    height: "42%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline",
                                    paddingTop:"1%",
                                }}> {isMatchingMethode}</div>
                                )}
                                </Link></TimelineContent>
                            </TimelineItem>

                             {
                                 openNavigation ? (

                                 isDefaultMethode ? (
                                     <div>
                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="zielvariable"><TollIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent> <Link to='/Zielvariable' onClick={()=> {
                                                 visitedSite("zielvariable");
                                                 setWorkflow("Zielvariable");
                                             }}
                                                 style={linkStyle}>Group indicator <br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "42%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isZielvariable === "defaultZielvariable" ? "hidden" : "visible" ,
                                             }}> {isZielvariable}</div></Link></TimelineContent>
                                         </TimelineItem>

                                     <TimelineItem>
                                         <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">
                                         </TimelineOppositeContent>
                                         <TimelineSeparator>
                                             <TimelineDot id="kontrollvariablen"><ListAltIcon/></TimelineDot>
                                             <TimelineConnector/>
                                         </TimelineSeparator>
                                         <TimelineContent>
                                             <Link to='/Kontrollvariablen' onClick={()=> {
                                             visitedSite("kontrollvariablen");
                                             setWorkflow("Kontrollvariablen");
                                             setExpanded(!expanded);
                                         }}
                                             style={linkStyle}>Covariates <br/>

                                             </Link><div style={{  display: "flex",
                                             paddingLeft: "10%",
                                             paddingRight: "10%",
                                             left: "60px",
                                             backgroundColor: "#B11B18",
                                             width: "auto",
                                             height: "auto",
                                             borderRadius: "15px",
                                             color: "white",
                                             justifyContent: "baseline",
                                             paddingTop:"1%",
                                             marginBottom:"4px",
                                             visibility: isKontrollvariablen === "defaultKontrollvariablen" ? "hidden" : "visible"}}>
                                             {isKontrollvariablen}
                                         </div>
                                             <Collapse in={expanded}  >
                                                 {() => {
                                                     if(isAllKontrollvariablen.length > 0){
                                                         isAllKontrollvariablen.map(fruit => <div key={fruit}>{fruit.var}</div>)}
                                                 }}
                                             </Collapse>
                                         </TimelineContent>
                                     </TimelineItem>


                                         <TimelineItem> {/*style={{display: 'none'}}*/}
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="matchingverhältnis"><AnalyticsIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent><Link to='/Matching-Verhältnis' onClick={()=> {
                                                 visitedSite("matchingverhältnis");
                                                 setWorkflow("MatchingVerhältnis")
                                             }} style={linkStyle}>
                                                 Matching ratio  <br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "42%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isVerhältnisNav === "defaultVerhältnis" ? "hidden" : "visible" ,
                                             }}> {isVerhältnisNav}</div></Link></TimelineContent>
                                         </TimelineItem>

                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="scoremethode" size="small"><CalculateIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent size="small"> <Link to='/MethodeScoreBerechnung' onClick={()=> {
                                                 visitedSite("scoremethode");
                                                 setWorkflow("ScoreBerechnung");
                                             }}
                                                 style={linkStyle}>Method for estimation of the PS-score<br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "42%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isScoreMethodeNav === "defaultScoreMethode" ? "hidden" : "visible" ,
                                             }}> {isScoreMethodeNav}</div></Link></TimelineContent>
                                         </TimelineItem>

                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="algorithmus" size="small"><BlurOnIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent size="small"> <Link to='/MatchingAlgorithmus' onClick={()=> {
                                                 visitedSite("algorithmus");
                                                 setWorkflow("Matching-Algorithmus");
                                             }}
                                                 style={linkStyle}>Matching algorithm<br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "auto",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isAlgorithmusNav === "defaultAlgo" ? "hidden" : "visible" ,
                                             }}>{isAlgorithmusNav} </div></Link></TimelineContent> 
                                         </TimelineItem>

                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="übereinstimmung" size="small"><SquareFootIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent size="small"> <Link to='/ÜbereinstimmungPropensityScore' onClick={()=> {
                                                 visitedSite("übereinstimmung");
                                                 setWorkflow("Übereinstimmung");
                                             }}
                                                 style={linkStyle}>Propensity score caliper <br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "42%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isÜbereinstimmungswert === "defaultÜbereinstimmungswert" ? "hidden" : "visible" ,
                                             }}> ±{isÜbereinstimmungswert}</div></Link></TimelineContent>
                                         </TimelineItem>
                                     </div>

                                 ) : ( <div>
                                     <TimelineItem>
                                         <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                         </TimelineOppositeContent>
                                         <TimelineSeparator>
                                             <TimelineDot id="matchingvariablen"><ListAltIcon/></TimelineDot>
                                             <TimelineConnector/>
                                         </TimelineSeparator>
                                         <TimelineContent>
                                             <Link to='/Matchingvariablen' onClick={()=> {
                                                 visitedSite("matchingvaraiblen");
                                                 setWorkflow("Matchingvaraiblen");
                                                 setExpanded1(!expanded1);
                                             }}
                                                   style={linkStyle}>Matching variables <br/>

                                             </Link><div style={{  display: "flex",
                                             paddingLeft: "10%",
                                             paddingRight: "10%",
                                             left: "60px",
                                             backgroundColor: "#B11B18",
                                             width: "auto",
                                             height: "auto",
                                             borderRadius: "15px",
                                             color: "white",
                                             justifyContent: "baseline",
                                             paddingTop:"1%",
                                             marginBottom:"4px",
                                             visibility: isMatchingvariablen === "defaultMatchingvariablen" ? "hidden" : "visible"}}>
                                             {isMatchingvariablen}
                                         </div>
                                             {/* <div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "21%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 marginBottom:"4px",
                                                 visibility: isKontrollvariablen === "defaultKontrollvariablen" ? "hideen" : "visible",

                                             }}>{isKontrollvariablen}</div>*/}
                                             <Collapse in={expanded1} style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "21%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 marginBottom:"4px",}} >
                                                 {() => {
                                                     if(isAllMatchingvariablen.length > 0){
                                                         isAllMatchingvariablen.map(fruit => <div key={fruit}>{fruit.var}</div>)}
                                                 }}
                                             </Collapse>
                                         </TimelineContent>
                                     </TimelineItem>

                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="matchingtoleranz"><PhotoSizeSelectSmallIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent> <Link to='/Matchingtoleranz' onClick={()=> {
                                                 visitedSite("matchingtoleranz");
                                                 setWorkflow("Matchingtoleranz");
                                             }}
                                                 style={linkStyle}>Matching tolerance <br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "42%",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isMatchingtoleranzChip === "" ? "hidden" : "visible" ,
                                             }}>{isMatchingtoleranzChip} </div></Link></TimelineContent>
                                         </TimelineItem>

                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="fällekontrollen"><DonutSmallIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent> <Link to='/FälleKontrollen' onClick={()=> {
                                                 visitedSite("fällekontrollen");
                                                 setWorkflow("VariableFälleKontrolle");
                                             }}
                                                 style={linkStyle}>Definition der Vergleichsgruppen<br/><div style={{  display: "flex",
                                                 paddingLeft: "10%",
                                                 paddingRight: "10%",
                                                 left: "60px",
                                                 backgroundColor: "#B11B18",
                                                 width: "auto",
                                                 height: "auto",
                                                 borderRadius: "15px",
                                                 color: "white",
                                                 justifyContent: "baseline",
                                                 paddingTop:"1%",
                                                 visibility: isFälleKontrollenGruppenindikator === "defaultFälleKontrollenGruppenindikator" ? "hidden" : "visible" ,
                                             }}>{isFKChip}</div></Link></TimelineContent>
                                         </TimelineItem>


                                 <TimelineItem> {/*style={{display: 'none'}}*/}
                                 <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">
                                 </TimelineOppositeContent>
                                 <TimelineSeparator>
                                 <TimelineDot id="matchingverhältnis"><AnalyticsIcon/></TimelineDot>
                                 <TimelineConnector/>
                                 </TimelineSeparator>
                                 <TimelineContent><Link to='/Matching-Verhältnis' onClick={()=> {
                                     visitedSite("matchingverhältnis");
                                     setWorkflow("MatchingVerhältnis");
                                 }} style={linkStyle}>
                                 Matching Verhältnis  <br/><div style={{  display: "flex",
                                 paddingLeft: "10%",
                                 paddingRight: "10%",
                                 left: "60px",
                                 backgroundColor: "#B11B18",
                                 width: "auto",
                                 height: "42%",
                                 borderRadius: "15px",
                                 color: "white",
                                 justifyContent: "baseline",
                                 paddingTop:"1%",
                                 visibility: isVerhältnisNav === "defaultVerhältnis" ? "hidden" : "visible" ,
                             }}> {isVerhältnisNav}</div></Link></TimelineContent>
                                 </TimelineItem>

                                     </div>
                                 )): (
                                     <div>
                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot><WorkspacesIcon/></TimelineDot>
                                                 <TimelineConnector/>
                                             </TimelineSeparator>
                                             <TimelineContent><Link style={linkStyle}>Matching
                                                  </Link></TimelineContent>
                                         </TimelineItem>
                                 </div>
                                 )
                             }
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot id="ergebnisse"><FactCheckOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Ergebnis' onClick={()=> {
                                    visitedSite("ergebnisse");
                                    setWorkflow("MatchingErgebnis");
                                }} style={linkStyle}>Matching
                                    results </Link></TimelineContent>
                            </TimelineItem>


                            <TimelineItem>
                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot id="datenexport"><SimCardDownloadOutlinedIcon/></TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Dataexport' onClick={()=> {
                                    visitedSite("datenexport");
                                    setWorkflow("Datenexport");
                                }}
                                style={linkStyle}>Data export </Link></TimelineContent>
                            </TimelineItem>
                        </Timeline>


                    </CardContent>
            </Card>
        );

}



export default NavB;


