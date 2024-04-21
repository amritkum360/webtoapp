import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar({ isAuthenticated }) {
    return (
        <div className="navbar">
            <Link to="/">
                <img src="/headlogo.png" alt="logo" className="logo" style={{width:"200px"}}/>
            </Link>
            <div className="links">
                {isAuthenticated ? (
                    <>
                        <div><Link to="/">HOME</Link></div>
                        <div> <Link to="/pricing">Pricing</Link></div>
                        <div> <Link to="/account/myapps">My Apps</Link></div>
                    </>
                ) : (
                    <>
                        <div><Link to="/">HOME</Link></div>
                        <div> <Link to="/pricing">Pricing</Link></div>
                        <div> <Link to="/signup">Sign Up</Link></div>
                        <div> <Link to="/login">Log In</Link></div>
                    </>
                )}
            </div>
        </div>
    );
}
