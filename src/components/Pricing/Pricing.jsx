import React from 'react';
import './Pricing.css'; // Assuming you have a CSS file for styling
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    // Function to handle button click based on token existence
    const handleButtonClick = () => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

        if (token) {
            navigate('/account/newapp'); // Redirect to '/' if token exists
        } else {
            navigate('/login'); // Redirect to '/login' if token doesn't exist
        }
    };
    return (
        <>
        {/* <Navbar /> */}
        <div className="pricing-container">
            <div className="pricing-box">
                <h2>Free</h2>
                <div className="price">Rs 0.00</div>
                <p>For Testing, Expires in 30 Days</p>
                <hr />
                <ul>
                    <li><span className="feature">1 Android Application</span></li>
                    <li><span className="feature">Unlimited Builds</span></li>
                    <li><span className="feature">Unlimited Active Users</span></li>
                    <li><span className="cross-icon">✘</span> No Appilix Logo</li>
                    <li><span className="cross-icon">✘</span> Admob Ad</li>
                    <li><span className="cross-icon">✘</span> Push Notifications</li>
                    <li><span className="cross-icon">✘</span> Play Store Releasable</li>
                </ul>
                <button className="get-started-btn" onClick={handleButtonClick}>Get Started</button>
            </div>
            <div className="pricing-box">
                <h2>Yearly</h2>
                <div className="price">Rs 1199 / year</div>
                <p>Billed as Rs 1199.00 per year</p>
                <hr />
                <ul>
                    <li><span className="feature">1 Android Application</span></li>
                    <li><span className="feature">Unlimited Builds</span></li>
                    <li><span className="feature">Unlimited Active Users</span></li>
                    <li><span className="check-icon">✓</span> No Appilix Logo</li>
                    <li><span className="check-icon">✓</span> Admob Ad</li>
                    <li><span className="check-icon">✓</span> Push Notifications</li>
                    <li><span className="check-icon">✓</span> Play Store Releasable</li>
                </ul>
                <button className="get-started-btn" onClick={handleButtonClick}>Get Started</button>
            </div>
            <div className="pricing-box popular">
                <h2>Lifetime</h2>
                <div className="price">Popular Rs 2000</div>
                <p>No Recurring Payments</p>
                <hr />
                <ul>
                    <li><span className="feature">1 Android Application</span></li>
                    <li><span className="feature">Unlimited Builds</span></li>
                    <li><span className="feature">Unlimited Active Users</span></li>
                    <li><span className="check-icon">✓</span> No Appilix Logo</li>
                    <li><span className="check-icon">✓</span> Admob Ad</li>
                    <li><span className="check-icon">✓</span> Push Notifications</li>
                    <li><span className="check-icon">✓</span> Play Store Releasable</li>
                </ul>
                <button className=" popular_get blue" onClick={handleButtonClick}>Get Started</button>
            </div>
        </div>
        </>
    );
}
