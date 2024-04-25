import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './dasboard.css';

const MainDashboard = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [appData, setAppData] = useState(null);
    console.log("dashboard1")
    useEffect(() => {
        const fetchAppData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/appdashboard/${id}`); // Assuming your backend endpoint is /appdashboard/:appid
                if (!response.ok) {
                    throw new Error('Failed to fetch app data');
                }
                const data = await response.json();
                setAppData(data);
            } catch (error) {
                console.error('Error fetching app data:', error);
            }
        };

        fetchAppData();
    }, [id]);

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-8">
                    {appData && (
                        <Card className="app-card">
                            <Card.Body className="d-flex align-items-center">
                            <div className="app-icon mr-md-4">
    {appData.appicon !== undefined && appData.appicon !== null ? (
        <Image className='app_dashboard' src={appData.appicon} alt="App Icon" fluid style={{ maxWidth: '150px', maxHeight: '150px' }} />
    ) : (
        <Image className='app_dashboard' src={'/webicon.png'} alt="Default App Icon" fluid style={{ maxWidth: '150px', maxHeight: '150px' }} />
    )}
</div>

                                <div>
                                    <div>
                                        <div className="pro-tag">{appData.plan === "2000" || appData.plan === "1199" ? "Pro" : "Free"}</div>
                                        {appData.plan !== "2000" && appData.plan !== "1199" && (
                                            <button className='upgrade_btn' onClick={() => navigate(`/app/upgrade/${id}`)}>UPGRADE</button>
                                        )}
                                    </div>
                                    <Card.Title>{appData.appName}</Card.Title>
                                    <Card.Text>
                                        <strong>Website:</strong> {appData.website}<br />
                                        <strong>Created At:</strong> {new Date(appData.createdAt).toLocaleDateString()}
                                    </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    )}

                    {appData && (
                        <Card className="app-card" style={{marginTop:'40px'}}>
                            <Card.Body className="d-flex align-items-center">
                                {/* <div className="app-icon mr-md-4">
                                    <Image className='app_dashboard' src={appData.appicon} alt="App Icon" fluid style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                </div> */}
                                <div>
                                    {/* <div>
                                        <div className="pro-tag">{appData.plan === "2000" || appData.plan === "1199" ? "Pro" : "Free"}</div>
                                        {appData.plan !== "2000" && appData.plan !== "1199" && (
                                            <button className='upgrade_btn' onClick={() => navigate(`/app/upgrade/${id}`)}>UPGRADE</button>
                                        )}
                                    </div> */}
                                    <Card.Title>How To Convert Website To App?</Card.Title>
                                    <Card.Text>
                                        <hr />
                                       <p>Firstly, You will have to choose a name for your app and the website you wanted to be converted.</p><hr />
                                      <p>Now, Upload the logos in the Basic Info. Also, you can update the name of the App and Website URL.</p><hr />
                                      <p>If, You want some design and animation in the Application the you can go to Splash Screen section and make changes Accordingly.</p>
                                        
                                        <p>If, you have taken paid plan then ou can also put Admob Ads to Earn Money. You can also inclues Notification System in your App.</p>
                                        <p>At Last, you can build the App. After the build complete. You can download your App.</p>
                                         </Card.Text>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </div>
                <div className="col-md-4">
                    <Card className="options-card">
                        <Card.Body>
                            <h5 className="card-title">Options</h5>
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Basic Info <span className="badge bg-success rounded-pill">Active</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Upload Logo <span className="badge bg-success rounded-pill">Active</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Splash Screen <span className="badge bg-success rounded-pill">Active</span>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Build and Download <span className="badge bg-secondary rounded-pill">Not Active</span>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
