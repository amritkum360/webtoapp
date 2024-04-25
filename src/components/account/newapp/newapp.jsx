import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode'; // Correct import statement
import { useNavigate, useParams } from 'react-router-dom'; // Import useHistory and useParams hooks
import './newapp.css';

export default function NewApp() {
    const navigate = useNavigate(); // Initialize useHistory hook
    const [userid, setUserid] = useState('');
    const [formData, setFormData] = useState({
        website: '',
        appName: '',
        appPlatform: 'android', // Default value for app platform
        user: userid
    });

    console.log(userid)

    useEffect(() => {
        const token = localStorage.getItem('token'); // Assuming you have saved the token in localStorage
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const Userid = decodedToken.id;
            setUserid(Userid);
            setFormData(prevData => ({
                ...prevData,
                user: Userid
            }));
        }

        // Extract websiteurl parameter from URL and set it in state
        const searchParams = new URLSearchParams(window.location.search);
        const urlWebsiteUrl = searchParams.get('websiteurl');
        if (urlWebsiteUrl) {
            setFormData(prevData => ({
                ...prevData,
                website: urlWebsiteUrl
            }));
        }
    }, []); // Empty dependency array to run the effect only once on component mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://webtoapp-back-1.onrender.com/addnewapp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log('Response from server:', data);

            // Extract the ID from the response data and navigate to the dashboard page
            const id = data._id; // Assuming the ID is returned in the response data
            // navigate(`/app/dashboard/${id}`);
            navigate(`/app/upgrade/${id}`);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="newapp-container">
            <div className="newapp_form_cnt">
                <div className="newapp-form">
                <img src="/headlogo.png" alt="" className='form_logos'/>

                    <h1 className="form-title">Create New App</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formWebsite">
                            <Form.Label>Website Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="website"
                                placeholder="Enter website address"
                                value={formData.website}
                                onChange={handleChange}
                                className="new-app-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAppName">
                            <Form.Label>App Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="appName"
                                placeholder="Enter app name"
                                value={formData.appName}
                                onChange={handleChange}
                                className="new-app-input"
                            />
                        </Form.Group>
                        <Form.Group controlId="formAppPlatform">
                            <Form.Label>App Platform</Form.Label>
                            <Form.Control
                                as="select"
                                name="appPlatform"
                                value={formData.appPlatform}
                                onChange={handleChange}
                                className="new-app-input"
                            >
                                <option value="android">Android</option>
                                <option value="ios">iOS</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="newapp_btn_cnt">
                            <Button variant="primary" type="submit" className="submit-btn">
                                Create App
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
