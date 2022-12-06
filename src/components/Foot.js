import React from 'react'
import '../App.css';
import DKFZLogo from '../assets/dkfz_logo.webp';
import UMMLogo from '../assets/Universitätsklinikum_Mannheim_Logo.svg.png'
import MFLogo from '../assets/medizinische-fakultät-logo-removebg-preview.png';

function Foot() {
    return (
        <div className="Foot">
            <img src={DKFZLogo} alt="DKFZ Logo" className="imgDKFZLogo" />
            <img src={UMMLogo} alt="UMM Logo" className ="imgUMMLogo"/>
            <img src={MFLogo} alt="Medizinische Fakulktät Logo" className="imgMFLogo"/>
        </div>
    );
}

export default Foot;
