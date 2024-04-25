import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './myapps.css';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement

const MyApps = () => {
    const { id } = useParams();
    const [userid, setUserId] = useState(''); // Initialize state with an empty string
    const [apps, setApps] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchApps = async () => {
            try {
                // Decode token and retrieve userid
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userid = decodedToken.id;
    
                    const response = await fetch(`https://webtoapp-back-1.onrender.com/myapps/${userid}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch apps');
                    }
                    const data = await response.json();
                    setApps(data);
                }
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        };
    
        fetchApps();
    }, []);
    
    const appdasboard = (id) => {
        try {
            console.log("Clicked App ID:", id);
            navigate(`/app/dashboard/${id}`);
        } catch (error) {
            console.error('Error in appdashboard:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">My Apps</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {/* Card for creating a new app */}
                <Col>
                    <Card className="create-new-app-card" onClick={() => navigate('/account/newapp')}>
                        <Card.Body className="text-center">
                            <Image src="https://appilix.com/styles/images/account/create_app_icon.svg" alt="Add Icon" className="plus-icon" style={{ height: '45px' }} />
                            <Card.Title>Create New App</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Display existing apps */}
                {apps.map((app) => (
                    <Col key={app._id}>
                        <Card>
                            <Row className="align-items-center">
                                <Col xs={4}>
                                    {/* <Image src={app.appicon} alt={app.appName} fluid className="app-icon my_apps_image" /> */}
                                    <div className="app-icon mr-md-4">
    {app.appicon !== undefined && app.appicon !== null ? (
        <Image className='app-icon my_apps_image' src={app.appicon} alt="App Icon" fluid />
    ) : (
        <Image className='app-icon my_apps_image' src={'/webicon.png'} alt="Default App Icon" fluid/>
    )}
</div>

                                </Col>
                                <Col xs={8}>
                                    <Card.Body onClick={() => appdasboard(app._id)}>
                                        <div className="pro-tag">{app.plan === "2000" || app.plan === "1199" ? "Pro" : "Free"}</div>
                                        <Card.Title>{app.appName}</Card.Title>
                                        <Card.Text>
                                            Website: {app.website}<br />
                                            Created At: {new Date(app.createdAt).toLocaleDateString()}
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MyApps;
