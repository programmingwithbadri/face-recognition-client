import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo from './brain.jpg';

const Logo = () => {
    return(
        <div>
        <Tilt className="Tilt" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"> <img src = {logo} alt = 'logo' height = "150" width = "150" />  </div>
        </Tilt>
        </div>
    )
}

export default Logo;