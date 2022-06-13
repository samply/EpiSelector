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
                   <TimelineContent onClick="datenImportShow()"> <Link to='/Datenquelle' style={linkStyle}>Datenimport</Link></TimelineContent>
                </TimelineItem>
                    <TimelineItem id="myDIV"> {/*style={{display: 'none'}}*/}
                        <TimelineSeparator>
                            <TimelineDot><BlurCircularOutlinedIcon/></TimelineDot>
                            <TimelineConnector/>
                        </TimelineSeparator>
                        <TimelineContent><Link to='/Datenquelle' style={linkStyle}>Datenquelle wählen</Link></TimelineContent>
                    </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><UploadFileIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                     <TimelineContent><Link to='/Datei-hochladen' style={linkStyle}>Datei hochladen</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><JoinLeftIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                     <TimelineContent><Link to='/Matching-Methode' style={linkStyle}>Matching-Methode </Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><PeopleAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Matching</TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><ListAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent> <Link to='/Matching-Variablen' style={linkStyle}>Matchingvariablen</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot size="small"><SquareFootIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                   <TimelineContent size="small"> <Link to='/Matchingtoleranz' style={linkStyle}>Matchingtoleranz</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem style={{display: 'none'}}>
                    <TimelineSeparator>
                        <TimelineDot><FeaturedPlayListIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                   <TimelineContent> <Link to='/Variablen-Fälle-Kontrollen' style={linkStyle}>Variablen für Fälle und Kontrollen definieren</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><AnalyticsIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent><Link to='/Matching-Verhältnis' style={linkStyle}>Matching Verhältnis</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem> {/*style={{display: 'none'}}*/}
                    <TimelineSeparator>
                        <TimelineDot><FactCheckOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent><Link to='/Matching-Ergebnis' style={linkStyle}>Matching Ergebnis</Link></TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><SimCardDownloadOutlinedIcon/></TimelineDot>
                    </TimelineSeparator>
                   <TimelineContent> <Link to='/Dataexport' style={linkStyle}>Datenexport</Link></TimelineContent>
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
