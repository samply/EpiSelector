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



class NavB extends React.Component {



    render() {

        const linkStyle={
        textDecoration: "none",
        color: 'black'
    };
        return (
            <Card variant="outlined" className="NavBStyle">
                <React.Fragment>
                    <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ablauf
                </Typography>
            <Timeline classname="Timeline">
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><ArchiveOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Datenquelle' style={linkStyle}><TimelineContent onClick="datenImportShow()">Datenimport</TimelineContent></Link>
                </TimelineItem>
                    <TimelineItem style={{display: 'none'}} id="myDIV">
                        <TimelineSeparator>
                            <TimelineDot><BlurCircularOutlinedIcon/></TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <Link to='/Datenquelle' style={linkStyle}><TimelineContent>Datenquelle wählen</TimelineContent></Link>
                    </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><JoinLeftIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Methode' style={linkStyle}> <TimelineContent>Matching-Methode</TimelineContent> </Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><PeopleAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Matching</TimelineContent>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot><ListAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Variablen' style={linkStyle}> <TimelineContent>Matchingvariablen</TimelineContent> </Link>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matchingtoleranz' style={linkStyle}><TimelineContent size="small">Matchingtoleranz</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot><FeaturedPlayListIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Variablen-Fälle-Kontrollen' style={linkStyle}><TimelineContent>Variablen für Fälle und Kontrollen definieren</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot><AnalyticsIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Verhältnis' style={linkStyle}><TimelineContent>Matching Verhältnis</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot><FactCheckOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Ergebnis' style={linkStyle}><TimelineContent>Matching Ergebnis</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><SimCardDownloadOutlinedIcon/></TimelineDot>
                    </TimelineSeparator>
                    <Link to='/Dataexport' style={linkStyle}><TimelineContent>Datenexport</TimelineContent></Link>
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
