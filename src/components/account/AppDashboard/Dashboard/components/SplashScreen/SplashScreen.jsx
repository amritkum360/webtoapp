import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './SplashScreen.css'; // Add your custom CSS for styling here
import { useParams } from 'react-router-dom';

const SplashScreen = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        splashScreenLogo: null,
        splashScreenTimeout: '',
        customizeStatusBar: 'no',
        statusBarBackgroundColor: '',
        statusBarIconColor: '',
        appId: id
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/api/splashscreen/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data) {
                        setFormData({
                            ...data,
                            appId: id
                        });
                    }
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            splashScreenLogo: file,
        })}

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Upload file to Cloudinary
            const formDataToSend = new FormData();
            formDataToSend.append('file', formData.splashScreenLogo);
            formDataToSend.append('upload_preset', 'qta1vcsh'); // Replace 'your_upload_preset' with your Cloudinary upload preset

            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dcmrsdzvq/image/upload', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!cloudinaryResponse.ok) {
                throw new Error('Failed to upload file to Cloudinary');
            }

            const cloudinaryData = await cloudinaryResponse.json();
            const splashScreenLogoUrl = cloudinaryData.secure_url;

            // Send URL and other form data to the backend
            const formDataToSendToBackend = {
                ...formData,
                splashScreenLogo: splashScreenLogoUrl,
            };

            const response = await fetch('http://127.0.0.1:3000/api/splashscreen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSendToBackend),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data saved successfully:', data);
                // Optionally, show success message or redirect to another page
            } else {
                throw new Error('Failed to save data');
            }
        } catch (error) {
            console.error('Error saving data:', error);
            // Optionally, show error message to the user
        }
    };

    return (
        <Container className="splash-screen-container mt-4 p-4 border shadow firebase-container">
            <h2 className="text-center">Splash Screen Customization</h2>
            <p className="text-center mb-4">Customize your app's splash screen settings</p>
            <Form onSubmit={handleSubmit} className="firebase-form">
                <div className="form-group-section" style={{marginBottom:"20px"}}>
                    <label className="form-label">Splash Screen Logo</label>
                    <Form.Group as={Row} controlId="formSplashScreenLogo">
                        <Col sm="9">
                            <Form.Control type="file" accept=".png, .jpg, .jpeg" name="splashScreenLogo" onChange={handleFileChange} />
                        </Col>
                    </Form.Group>
                </div>

                <div className="form-group-section" style={{marginBottom:"20px"}}>
                    <label className="form-label">Splash Screen Timeout (seconds)</label>
                    <Form.Group as={Row} controlId="formSplashScreenTimeout">
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Enter timeout in seconds" name="splashScreenTimeout" value={formData.splashScreenTimeout} onChange={handleInputChange} />
                        </Col>
                    </Form.Group>
                </div>

                <div className="form-group-section" style={{marginBottom:"20px"}}>
                    <label className="form-label">Customize Status Bar</label>
                    <Form.Group as={Row} controlId="formCustomizeStatusBar">
                        <Col sm="9">
                            <Form.Control as="select" name="customizeStatusBar" value={formData.customizeStatusBar} onChange={handleInputChange}>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </div>

                {formData.customizeStatusBar === 'yes' && (
                    <>
                        <div className="form-group-section" style={{marginBottom:"20px"}}>
                            <label className="form-label">Status Bar Background Color</label>
                            <Form.Group as={Row} controlId="formStatusBarBackgroundColor">
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Enter background color" name="statusBarBackgroundColor" value={formData.statusBarBackgroundColor} onChange={handleInputChange} />
                                </Col>
                            </Form.Group>
                        </div>

                        <div className="form-group-section" style={{marginBottom:"20px"}}>
                            <label className="form-label">Status Bar Icon Color</label>
                            <Form.Group as={Row} controlId="formStatusBarIconColor">
                                <Col sm="9">
                                    <Form.Control as="select" name="statusBarIconColor" value={formData.statusBarIconColor} onChange={handleInputChange}>
                                        <option value="dark">Dark</option>
                                        <option value="light">Light</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </div>
                    </>
                )}

                <Button variant="primary" type="submit" className="mt-4">
                    Save Changes
                </Button>
            </Form>
        </Container>
    );
};

export default SplashScreen;
