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
import { withStyles } from '@mui/styles';

const styles = {
    transparentBar: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
        paddingTop: '25px',
        color: '#FFFFFF'
    }
};


function NavB(props){
    const { classes } = props;

    return (
        <Box className={classes.transparentBar}>
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
                    <TimelineContent>Datenimport</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><BlurCircularOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Datenquelle'><TimelineContent>Datenquelle wählen</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><UploadFileIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Datei-hochladen'> <TimelineContent>Datei hochladen</TimelineContent> </Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><JoinLeftIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Methode'> <TimelineContent>Matching-Methode</TimelineContent> </Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><PeopleAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>Matching</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><ListAltIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Variablen'> <TimelineContent>Matchingvariablen</TimelineContent> </Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><SquareFootIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matchingtoleranz'><TimelineContent>Matchingtoleranz</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><FeaturedPlayListIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Variablen-Fälle-Kontrollen'><TimelineContent>Variablen für Fälle und Kontrollen definieren</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><AnalyticsIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Verhältnis'><TimelineContent>Matching Verhältnis</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><FactCheckOutlinedIcon/></TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <Link to='/Matching-Ergebnis'><TimelineContent>Matching Ergebnis</TimelineContent></Link>
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot><SimCardDownloadOutlinedIcon/></TimelineDot>
                    </TimelineSeparator>
                    <Link to='/Dataexport'><TimelineContent>Datenexport</TimelineContent></Link>
                </TimelineItem>
            </Timeline>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    );
}
export default NavB;

