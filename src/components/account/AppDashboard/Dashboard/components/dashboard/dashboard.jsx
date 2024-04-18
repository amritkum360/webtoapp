import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import './dasboard.css';

const MainDashboard = () => {
    const { id } = useParams();
    const [appData, setAppData] = useState(null);

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
                                    <Image src={appData.appicon} alt="App Icon" fluid style={{ maxWidth: '150px', maxHeight: '150px' }} />
                                </div>
                                <div>
                                    <Card.Title>{appData.appName}</Card.Title>
                                    <Card.Text>
                                        <strong>Website:</strong> {appData.website}<br />
                                        <strong>Created At:</strong> {new Date(appData.createdAt).toLocaleDateString()}
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
