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
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import CalculateIcon from '@mui/icons-material/Calculate';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import TollIcon from '@mui/icons-material/Toll';
import {Button, CardHeader} from "@mui/material";
import {TimelineOppositeContent} from "@mui/lab";
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import {useState} from "react";


export function visitedSite(icon){
    const elem = document.getElementById(icon);
    elem.style.backgroundColor="#1d4189";
}


function NavB({isClickedMV, setClickedMV, isClickedKV, setClickedKV, setWorkflow, isDatenquelle, isDatei, isMatchingMethode, isZielvariable, isKontrollvariablen, isAllMatchingvariablen, isAllKontrollvariablen, isMatchingvariablen, isMatchingtoleranz, isMatchingtoleranzChip, isFälleKontrollenGruppenindikator,isFKChip, isVerhältnis, isScoreMethode, isAlgorithmus,isErsetzung, isÜbereinstimmungswert}) {

    const linkStyle = {
        textDecoration: "none",
        color: 'black',

    };

    let openDataimport = false;



    let openNavigation = false;

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


    /*const allMV = () => {
        for(let i =0; i< isAllMatchingvariablen.length; i++){
            let tmp =[];
            tmp.push(i.var);

        }
        return (<div>{i}<br/></div>)
    }*/

    return (
            <Card variant="outlined" className="NavBStyle" sx={{borderRadius: '10px 10px 10px 10px', boxShadow: '1' }}>
                <CardHeader
                    title="Ablauf"
                    titleTypographyProps={{fontSize:14, color:"text.secondary"}}
                    sx={{backgroundColor:"#E9F0FF", minWidth:"100%"}}/>

                    <CardContent>
                        <Timeline position="right" sx={{align:"left", flex:0.1, marginTop:"-7px", marginLeft:"-20px"}}>
                            {
                                openDataimport ? (  <div>
                                        <TimelineItem>
                                            <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot id="datenquelle"><BlurCircularOutlinedIcon/></TimelineDot>
                                                <TimelineConnector/>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Link  to='/Datenquelle' style={linkStyle} onClick={()=> {
                                                    visitedSite("datenquelle");
                                                    setWorkflow("Datenquelle");
                                                }}>Datenquelle wählen
                                                   <br/><div style={{  display: "flex",
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
                                                        visibility: isDatenquelle === "defaultQuelle" ? "hidden" : "visible" ,
                                                   }}>{isDatenquelle}</div>
                                                </Link>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot id="dateihochladen"><UploadFileIcon/></TimelineDot>
                                                <TimelineConnector/>
                                            </TimelineSeparator>
                                            <TimelineContent><Link to='/Datei-hochladen' onClick={()=>{visitedSite("dateihochladen");  setWorkflow("Datei-hochladen");}} style={linkStyle}>
                                                Datei hochladen<br/><div
                                                style={{  display: "flex",
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
                                                visibility: isDatei === "defaultDatei" ? "hidden" : "visible" ,
                                            }}> {isDatei}</div></Link></TimelineContent>
                                        </TimelineItem>
                                </div>
                                ):(
                                <TimelineItem>
                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                <TimelineDot id="dataimport"><UploadFileIcon/></TimelineDot>
                                <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Datenquelle' onClick={()=>{visitedSite("datenquelle"); visitedSite("dataimport"); openDataimport=true; setWorkflow("Datenquelle");}} style={linkStyle}>
                                Datenimport<br/><div
                                style={{  display: "flex",
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
                                visibility: isDatei === "defaultDatei" ? "hidden" : "visible" ,
                            }}> {isDatei}</div></Link></TimelineContent>
                                </TimelineItem>
                                )
                            }
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot id="matchingmethode"><JoinLeftIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Methode' onClick={()=>{visitedSite("matchingmethode"); setWorkflow("Matching-Methode")}}
                                                       style={linkStyle}>Matching-Methode <br/><div style={{  display: "flex",
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
                                    visibility: isMatchingMethode === "defaultMethode" ? "hidden" : "visible" ,
                                }}> {isMatchingMethode}</div></Link></TimelineContent>
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
                                                 style={linkStyle}>Zielvariable <br/><div style={{  display: "flex",
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
                                         <TimelineContent> <Link to='/Kontrollvariablen' onClick={()=> {
                                             visitedSite("kontrollvariablen");
                                             setWorkflow("Kontrollvariablen");
                                         }}
                                             style={linkStyle}>Kontrollvariablen <br/><div style={{  display: "flex",
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
                                             visibility: isKontrollvariablen === "defaultKontrollvariablen" ? "hidden" : "visible" ,
                                         }}>{isKontrollvariablen} </div></Link></TimelineContent>
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
                                                 visibility: isVerhältnis === "defaultVerhältnis" ? "hidden" : "visible" ,
                                             }}> {isVerhältnis}</div></Link></TimelineContent>
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
                                                 style={linkStyle}>Methode der Score-Berechnung<br/><div style={{  display: "flex",
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
                                                 visibility: isScoreMethode === "defaultScoreMethode" ? "hidden" : "visible" ,
                                             }}> {isScoreMethode}</div></Link></TimelineContent>
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
                                                 style={linkStyle}>Matching-Algorithmus<br/><div style={{  display: "flex",
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
                                                 visibility: isAlgorithmus === "defaultAlgo" ? "hidden" : "visible" ,
                                             }}>{isAlgorithmus} <br/> {isErsetzung}</div></Link></TimelineContent>
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
                                                 style={linkStyle}>Übereinstimmung des Prop.-Scores <br/><div style={{  display: "flex",
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
                                           <div>
                                               <Link to='/Matchingvariablen' onClick={()=>{visitedSite("matchingvariablen"); setWorkflow("Matchingvariablen"); setClickedMV(true);}}
                                                      style={linkStyle}>Matchingvariablen
                                                   <br/>

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
                                                   visibility: isMatchingvariablen === "defaultMatchingvariablen" ? "hidden" : "visible" ,
                                               }}> {isMatchingvariablen} <br/>
                                                   <div  style={{  display: "flex",
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
                                                       visibility: isClickedMV === false ? "hidden" : "visible" ,
                                                   }}> {()=>{ for(let i=0; i< isAllMatchingvariablen.length; i++){ let x = isAllMatchingvariablen[i].var; return(<div>{x}<br/></div>)}}}
                                                   </div>
                                               </div>  </Link>
                                           </div>
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
                                                 style={linkStyle}>Matchingtoleranz <br/><div style={{  display: "flex",
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
                                                 style={linkStyle}>Variablen für Fälle und Kontrollen definieren<br/><div style={{  display: "flex",
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
                                 visibility: isVerhältnis === "defaultVerhältnis" ? "hidden" : "visible" ,
                             }}> {isVerhältnis}</div></Link></TimelineContent>
                                 </TimelineItem>

                                     </div>
                                 )): (
                                     <div>
                                         <TimelineItem>
                                             <TimelineOppositeContent sx={{ flex: 0 }} color="textSecondary">

                                             </TimelineOppositeContent>
                                             <TimelineSeparator>
                                                 <TimelineDot id="ergebnisse"><FactCheckOutlinedIcon/></TimelineDot>
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
                                    Ergebnis </Link></TimelineContent>
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
                                style={linkStyle}>Datenexport </Link></TimelineContent>
                            </TimelineItem>
                        </Timeline>


                    </CardContent>
            </Card>
        );

}



export default NavB;


