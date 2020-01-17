import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';
const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ProfileIcon onRouteChange = {onRouteChange}  />
            </nav>
        )
    }
    else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signIn')} className="f3 dim black underline pa2 pointer">
                    Sign In
                </p>
                <p onClick={() => onRouteChange('register')} className="f3 dim black underline pa2 pointer">
                    Register
                </p>
            </nav>
        )
    }
}

export default Navigation;