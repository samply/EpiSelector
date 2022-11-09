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


export function visitedSite(icon){
    const elem = document.getElementById(icon);
    elem.style.backgroundColor="#1d4189";
}


function NavB({isDatenquelle, isDatei, isMatchingMethode, isZielvariable, isKontrollvariablen, isVerhältnis, isScoreMethode, isAlgorithmus,isErsetzung, isÜbereinstimmungswert}) {

    const linkStyle = {
        textDecoration: "none",
        color: 'black',

    };

    const chipStyle = {
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
        paddingTop:"1%",
    };




    return (
            <Card variant="outlined" className="NavBStyle">
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Ablauf
                        </Typography>
                        <Timeline
                            sx={{
                                "& .MuiTimelineItem-root:before": {
                                    flex: 0,
                                },
                                fontSize:"10",
                            }}
                        >

                            <TimelineItem>

                                <TimelineSeparator>
                                    <TimelineDot id="datenquelle"><BlurCircularOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <Link  to='/Datenquelle' style={linkStyle} onClick={()=>visitedSite("datenquelle")}>Datenquelle wählen
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
                                            visibility: isDatenquelle == "defaultQuelle" ? "hidden" : "visible" ,
                                       }} >{isDatenquelle}</div>
                                    </Link>
                                </TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="dateihochladen"><UploadFileIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Datei-hochladen' onClick={()=>visitedSite("dateihochladen")} style={linkStyle}>
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
                                    visibility: isDatei == "defaultDatei" ? "hidden" : "visible" ,
                                }}> {isDatei}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="matchingmethode"><JoinLeftIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Methode' onClick={()=>visitedSite("matchingmethode")}
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
                                    visibility: isMatchingMethode == "defaultMethode" ? "hidden" : "visible" ,
                                }}> {isMatchingMethode}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="zielvariable"><TollIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Zielvariable' onClick={()=>visitedSite("zielvariable")}
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
                                    visibility: isZielvariable == "defaultZielvariable" ? "hidden" : "visible" ,
                                }}> {isZielvariable}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="kontrollvariablen"><ListAltIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Kontrollvariablen' onClick={()=>visitedSite("kontrollvariablen")}
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
                                    visibility: isKontrollvariablen == "defaultKontrollvariablen" ? "hidden" : "visible" ,
                                }}>{isKontrollvariablen} </div></Link></TimelineContent>
                            </TimelineItem>



                            <TimelineItem> {/*style={{display: 'none'}}*/}
                                <TimelineSeparator>
                                    <TimelineDot id="matchingverhältnis"><AnalyticsIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Verhältnis' onClick={()=>visitedSite("matchingverhältnis")} style={linkStyle}>
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
                                    visibility: isVerhältnis == "defaultVerhältnis" ? "hidden" : "visible" ,
                                }}> {isVerhältnis}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="scoremethode" size="small"><CalculateIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/MethodeScoreBerechnung' onClick={()=>visitedSite("scoremethode")}
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
                                    visibility: isScoreMethode == "defaultScoreMethode" ? "hidden" : "visible" ,
                                }}> {isScoreMethode}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="algorithmus" size="small"><BlurOnIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/MatchingAlgorithmus' onClick={()=>visitedSite("algorithmus")}
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
                                    visibility: isAlgorithmus == "defaultAlgo" ? "hidden" : "visible" ,
                                }}>{isAlgorithmus}-{isErsetzung}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="übereinstimmung" size="small"><SquareFootIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/ÜbereinstimmungPropensityScore' onClick={()=>visitedSite("übereinstimmung")}
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
                                    visibility: isÜbereinstimmungswert == "defaultÜbereinstimmungswert" ? "hidden" : "visible" ,
                                }}> ±{isÜbereinstimmungswert}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="ergebnisse"><FactCheckOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Ergebnis' onClick={()=>visitedSite("ergebnisse")} style={linkStyle}>Matching
                                    Ergebnis </Link></TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot id="datenexport"><SimCardDownloadOutlinedIcon/></TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Dataexport' onClick={()=>visitedSite("datenexport")}
                                                        style={linkStyle}>Datenexport </Link></TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
            </Card>
        );

}



export default NavB;


