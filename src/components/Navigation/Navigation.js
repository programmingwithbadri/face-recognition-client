import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signout')} className="f3 dim black underline pa2 pointer">
                    Sign out
                </p>
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