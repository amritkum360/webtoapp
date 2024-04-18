import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './SplashScreen.css'; // Add your custom CSS for styling here

const SplashScreen = () => {
    const [formData, setFormData] = useState({
        splashScreenLogo: null,
        splashScreenTimeout: '',
        customizeStatusBar: 'no',
        statusBarBackgroundColor: '',
        statusBarIconColor: '',
    });

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
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
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
