import React, { useState } from 'react';
import DashboardSidebar from './dashboardsidebar/dashboardsidebar'
import MainDashboard from './components/dashboard/dashboard';
import BasicInfo from './components/BasicInfo/BasicInfo';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Admob from './components/Admob/Admob';
import Firebase from './components/Firebase/Firebase';
import Build from './components/Build/Build';


const AppDashboard = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    return (
        <div className="dashboard-container">
            <div className="row">
                <div className="col-md-3">
                    <DashboardSidebar activeItem={activeItem} setActiveItem={setActiveItem} />
                </div>
                <div className="col-md-9">
                    <div className="dashboard-content">
                        {activeItem === 'Dashboard' && <MainDashboard />}
                        {activeItem === 'Basic Info' && <BasicInfo />}
                        {activeItem === 'Splash Screen' && <SplashScreen />}
                        {activeItem === 'Admob' && <Admob /> }
                        {activeItem === 'Firebase' && <Firebase /> }
                        {activeItem === 'Build And Download' && <Build /> }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDashboard;