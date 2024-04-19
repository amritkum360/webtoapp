import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './myapps.css';
import { useNavigate } from 'react-router-dom';

const MyApps = () => {
    const [apps, setApps] = useState([]);

    const navigate = useNavigate()
    useEffect(() => {
        const fetchApps = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/myapps'); // Assuming your backend endpoint is /myapps
                if (!response.ok) {
                    throw new Error('Failed to fetch apps');
                }
                const data = await response.json();
                setApps(data);
            } catch (error) {
                console.error('Error fetching apps:', error);
            }
        };

        fetchApps();
    }, []);

    const appdasboard = (id) => {
        try {
            console.log("Clicked App ID:", id);
            // Perform any other actions based on the clicked app ID
            navigate(`/app/dashboard/${id}`)
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
                    <Card className="create-new-app-card" onClick={()=>navigate('/account/newapp')}>
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
                                    <Image src={app.appicon} alt={app.appName} fluid className="app-icon my_apps_image" />
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
