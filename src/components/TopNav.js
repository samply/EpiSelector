import React from 'react'
import {Link} from 'react-router-dom';
import '../App.css';
import Typography from '@mui/material/Typography';


function TopNav({setDatenquelle, setDatei, setMatchingMethode, setZielvariable, setKontrollvariablen, setVerhältnis, setScoreMethode, setAlgorithmus,setErsetzung, setÜbereinstimmungswert}) {

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };

    const deleteAllData = () => {
        setDatenquelle("defaultQuelle");
        setDatei("defaultQuelle");
        setMatchingMethode("defaultMethode");
        setZielvariable("defaultZielvariable");
        setKontrollvariablen("defaultKontrollvariablen");
        setVerhältnis("defaultVerhältnis");
        setScoreMethode("defaultScoreMethode");
        setAlgorithmus("defaultAlgo");
        setErsetzung("defaultErsetz");
        setÜbereinstimmungswert("defaultÜberinstimmungswert");
    }

    return (
        <div className="TopNav">
            <Typography variant="h4" sx={{paddingTop:"1%"}}><Link to='/Startseite' onClick="deleteAllData" style={linkStyle}>Beobachtungsstudien-Assistent</Link></Typography>
        </div>
    );
}

export default TopNav;
