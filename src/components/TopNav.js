import React from 'react'
import {Link} from 'react-router-dom';
import '../App.css';

function TopNav() {

    const linkStyle = {
        textDecoration: "none",
        color: 'white'
    };

    return (
        <div className="TopNav">
            <h2 style={{fontFamily:"Verdana light"}}><Link to='/Startseite' style={linkStyle}>Beobachtungsstudien-Assistent</Link></h2>
        </div>
    );
}

export default TopNav;
