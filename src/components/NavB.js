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
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import {isDisabled} from "@testing-library/user-event/dist/utils";
import Form from '../model/Form';


function dropDatenimportSteps(){
    if(false){

    }
}



class NavB extends React.Component {



    render() {

        const linkStyle={
        textDecoration: "none",
        color: 'black'
    };

        const chipContent = "chipInhalt"
        const chip = <div style={{paddingLeft:"20%", left:"60px", backgroundColor:"#B11B18", width:"150px", height:"35px", borderRadius:"15px", color:"white", justifyContent:"baseline" }}></div>

        return (
            <Card variant="outlined" className="NavBStyle">
                <React.Fragment>
                    <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ablauf
                </Typography>
            <Timeline style={{position:"absolute", left:"-120px", top: "130px"}}>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><ArchiveOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                   <TimelineContent onClick="dropDatenimportSteps()"> <Link to='/Datenquelle' style={linkStyle}>Datenimport
                       <div style={{paddingLeft:"20%", left:"60px", backgroundColor:"#B11B18", width:"150px", height:"35px", borderRadius:"15px", color:"white", justifyContent:"baseline" }}></div>
                   </Link></TimelineContent>
                </TimelineItem>
                    <TimelineItem> {/*style={{display: 'none'}}*/}

                        <TimelineSeparator>
                            <TimelineDot><BlurCircularOutlinedIcon/></TimelineDot>
                             <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent><Link to='/Datenquelle' style={linkStyle}>Datenquelle wählen {chip}</Link></TimelineContent>
                    </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><UploadFileIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                     <TimelineContent><Link to='/Datei-hochladen' style={linkStyle}>Datei hochladen {chip}</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><JoinLeftIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                     <TimelineContent><Link to='/Matching-Methode' style={linkStyle}>Matching-Methode {chip}</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><PeopleAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Matching {chip}</TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><ListAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent> <Link to='/Matching-Variablen' style={linkStyle}>Matchingvariablen {chip}</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                   <TimelineContent size="small"> <Link to='/Matchingtoleranz' style={linkStyle}>Matchingtoleranz {chip}</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem sx={{width:"200%", left:"-210px"}}>{/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><FeaturedPlayListIcon/></TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                   <TimelineContent> <Link to='/Variablen-Fälle-Kontrollen' style={linkStyle}>Variablen für Fälle und Kontrollen definieren {chip} </Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><AnalyticsIcon/></TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent><Link to='/Matching-Verhältnis' style={linkStyle}>Matching Verhältnis {chip} </Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><FactCheckOutlinedIcon/></TimelineDot>
                        <TimelineConnector/>
                    </TimelineSeparator>
                    <TimelineContent><Link to='/Matching-Ergebnis' style={linkStyle}>Matching Ergebnis {chip}</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><SimCardDownloadOutlinedIcon/></TimelineDot>
                    </TimelineSeparator>
                   <TimelineContent> <Link to='/Dataexport' style={linkStyle}>Datenexport {chip}</Link></TimelineContent>
                </TimelineItem>
            </Timeline>
                    </CardContent>
                </React.Fragment>
            </Card>
        );
    }
}

function datenImportShow() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

export default NavB;
