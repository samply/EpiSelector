import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import Datenquelle from "./form/dataimport/Datenquelle";




function NavB({isDatenquelle, isDatei, isMatchingMethode, isVerhältnis, isScoreMethode, isAlgorithmus, isÜbereinstimmung}) {

    const linkStyle = {
        textDecoration: "none",
        color: 'black'
    };

       const chip = <div style={{
            display: "flex",
            paddingLeft: "20%",
            left: "60px",
            backgroundColor: "#B11B18",
            width: "180px",
            height: "65%",
            borderRadius: "15px",
            color: "white",
            justifyContent: "baseline"
        }}></div>

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
                                    <TimelineDot><BlurCircularOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Datenquelle' style={linkStyle}>Datenquelle wählen
                                   <br/> <div style={{
                                        display: "flex",
                                        paddingLeft: "10%",
                                        paddingRight: "10%",
                                        left: "60px",
                                        backgroundColor: "#B11B18",
                                        width: "min-content",
                                        height: "45%",
                                        borderRadius: "15px",
                                        color: "white",
                                        justifyContent: "baseline"
                                    }}>{isDatenquelle}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><UploadFileIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Datei-hochladen' style={linkStyle}>
                                    Datei hochladen<br/><div style={{
                                        display: "flex",
                                        paddingLeft: "10%",
                                        paddingRight: "10%",
                                        left: "60px",
                                        backgroundColor: "#B11B18",
                                        width: "min-content",
                                        height: "45%",
                                        borderRadius: "15px",
                                        color: "white",
                                        justifyContent: "baseline"
                                    }}> {isDatei}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><JoinLeftIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Methode'
                                                       style={linkStyle}>Matching-Methode <br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> {isMatchingMethode}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><ListAltIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Zielvariable'
                                                        style={linkStyle}>Zielvariable <br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> </div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><ListAltIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Kontrollvariablen'
                                                        style={linkStyle}>Kontrollvariable <br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> </div></Link></TimelineContent>
                            </TimelineItem>



                            <TimelineItem> {/*style={{display: 'none'}}*/}
                                <TimelineSeparator>
                                    <TimelineDot><AnalyticsIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Verhältnis' style={linkStyle}>
                                    Matching Verhältnis  <br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> {isVerhältnis}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/MethodeScoreBerechnung'
                                                                     style={linkStyle}>Methode der Score-Berechnung<br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> {isScoreMethode}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/MethodeScoreBerechnung'
                                                                     style={linkStyle}>Matching-Algorithmus<br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> {isAlgorithmus}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent size="small"> <Link to='/MethodeScoreBerechnung'
                                                                     style={linkStyle}>Bereich der Übereinstimmung des Prop.-Scores <br/><div style={{
                                    display: "flex",
                                    paddingLeft: "10%",
                                    paddingRight: "10%",
                                    left: "60px",
                                    backgroundColor: "#B11B18",
                                    width: "min-content",
                                    height: "45%",
                                    borderRadius: "15px",
                                    color: "white",
                                    justifyContent: "baseline"
                                }}> {isÜbereinstimmung}</div></Link></TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><FactCheckOutlinedIcon/></TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent><Link to='/Matching-Ergebnis' style={linkStyle}>Matching
                                    Ergebnis </Link></TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot><SimCardDownloadOutlinedIcon/></TimelineDot>
                                </TimelineSeparator>
                                <TimelineContent> <Link to='/Dataexport'
                                                        style={linkStyle}>Datenexport </Link></TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </CardContent>
            </Card>
        );

}



export default NavB;


