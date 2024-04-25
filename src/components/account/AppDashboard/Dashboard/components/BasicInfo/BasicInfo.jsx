import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './BasicInfo.css';
import { useParams } from 'react-router-dom';

const BasicInfo = () => {
    const {id} = useParams()
    const [formData, setFormData] = useState({
        websiteAddress: '',
        appName: '', 
        appLogo: null,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchAppInfo = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/appinfo`);
                if (response.ok) {
                    const data = await response.json();
                    const { website, appName, appicon } = data;
                    setFormData({
                        websiteAddress: website || '',
                        appName: appName || '',
                        appLogo: appicon || null,
                    });
                }
            } catch (error) {
                console.error('Error fetching app info:', error);
            }
        };

        fetchAppInfo();
    }, []);

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
            appLogo: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Your form submission logic here
            
            // If successful, set success message
            setSuccessMessage('Data saved successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating data:', error);
            // If error, set error message
            setErrorMessage('Error saving data. Please try again.');
            setSuccessMessage('');
        }
    };
    return (
        <div className="basic-info-container">
            <h2>App Information</h2>
            <p>General base settings of the application</p>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
                    <Form.Group as={Col} md={6} controlId="formAppName">
                        <Form.Label>App Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter app name" name="appName" value={formData.appName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group as={Col} md={6} controlId="formWebsiteAddress">
                        <Form.Label>Website Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter website address" name="websiteAddress" value={formData.websiteAddress} onChange={handleInputChange} />
                    </Form.Group>
                </Row>

                <Form.Group controlId="formAppLogo">
    <Form.Label>Choose Logo</Form.Label>
    <Form.Control type="file" accept=".png, .jpg, .jpeg" name="appLogo" onChange={handleFileChange} />
    <Form.Text className="text-muted">Best Image Size is 600px X 600px</Form.Text>
    {formData.appLogo && typeof formData.appLogo !== 'string' && ( // Check if appLogo is a Blob or File
        <img src={URL.createObjectURL(formData.appLogo)} alt="App Logo" className="uploaded-logo" />
    )}
</Form.Group>


                <Button variant="primary btn-primary1" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
};

export default BasicInfo;
