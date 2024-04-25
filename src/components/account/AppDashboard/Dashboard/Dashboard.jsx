import React, { useState, useEffect } from 'react';
import DashboardSidebar from './dashboardsidebar/dashboardsidebar';
import MainDashboard from './components/dashboard/dashboard';
import BasicInfo from './components/BasicInfo/BasicInfo';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Admob from './components/Admob/Admob';
import Firebase from './components/Firebase/Firebase';
import Build from './components/Build/Build';
import { useParams } from 'react-router-dom';

const AppDashboard = () => {
    const { id } = useParams();
    const [activeItem, setActiveItem] = useState('Dashboard');
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/appdashboardagri/${id}`);
                const data = await response.json();
                setResponseData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]); // Fetch data when `id` changes

    console.log(responseData);

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
                        {activeItem === 'Splash Screen' && <SplashScreen/>}
                        {activeItem === 'Admob' && <Admob plan={responseData?.plan} />}
                        {activeItem === 'Firebase' && <Firebase plan={responseData?.plan} />}
                        {activeItem === 'Build And Download' && <Build />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppDashboard;
