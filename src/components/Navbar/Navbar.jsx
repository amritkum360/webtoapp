import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar({ isAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here, such as clearing user data from local storage, etc.
        // After logout, redirect the user to the login page
        // For demonstration purposes, let's assume logout clears localStorage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/');
        // Reload the page
        window.location.reload();
    };

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
                        <div> <Link to="/" onClick={handleLogout}>Logout</Link></div>
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
