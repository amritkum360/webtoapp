import React from 'react';
import './dashboardsidebar.css'

const DashboardSidebar = ({ activeItem, setActiveItem }) => {
    const handleClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="sidebar">
            <ul className="list-group dashboard_sidebar">
                <li className={`list-group-item ${activeItem === 'Dashboard' ? 'active' : ''}`} onClick={() => handleClick('Dashboard')}>
                    Dashboard
                </li>
                <li className={`list-group-item ${activeItem === 'Basic Info' ? 'active' : ''}`} onClick={() => handleClick('Basic Info')}>
                    Basic Info
                </li>
                <li className={`list-group-item ${activeItem === 'Splash Screen' ? 'active' : ''}`} onClick={() => handleClick('Splash Screen')}>
                    Splash Screen
                </li>
                {/* <li className={`list-group-item ${activeItem === 'Settings' ? 'active' : ''}`} onClick={() => handleClick('Settings')}>
                    Customize
                </li> */}
                <li className={`list-group-item ${activeItem === 'Admob' ? 'active' : ''}`} onClick={() => handleClick('Admob')}>
                    Admob
                </li>
                <li className={`list-group-item ${activeItem === 'Firebase' ? 'active' : ''}`} onClick={() => handleClick('Firebase')}>
                    FireBase
                </li>
                <li className={`list-group-item ${activeItem === 'Build And Download' ? 'active' : ''}`} onClick={() => handleClick('Build And Download')}>
                    Build And Download
                </li>
            </ul>
        </div>
    );
};

export default DashboardSidebar;
