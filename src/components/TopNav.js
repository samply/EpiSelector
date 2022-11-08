import React from 'react'
import {Link} from 'react-router-dom';
import '../App.css';

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
            <h2 style={{fontFamily:"Verdana light"}}><Link to='/Startseite' onClick="deleteAllData" style={linkStyle}>Beobachtungsstudien-Assistent</Link></h2>
        </div>
    );
}

export default TopNav;
