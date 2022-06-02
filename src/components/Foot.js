import React from 'react'
import '../App.css';
import DKFZLogo from '../assets/dkfz_logo.webp';
import UMMLogo from '../assets/Universitätsklinikum_Mannheim_Logo.svg.png'

function Foot() {
    return (
        <div className="Foot">
            <img src={DKFZLogo} alt="DKFZ Logo" className="imgDKFZLogo" />
            <img src={UMMLogo} alt="UMM Logo" className ="imgUMMLogo"/>
        </div>
    );
}

export default Foot;