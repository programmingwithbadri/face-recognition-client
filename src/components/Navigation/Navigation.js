import React from 'react';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <p onClick={() => onRouteChange('signIn')} className="f3 dim black underline pa2 pointer">
                Sign out
        </p>
        </nav>
    )
}

export default Navigation;