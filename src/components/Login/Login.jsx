import React, { useState } from 'react';
import './Login.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Ensure formData contains the email and password
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log('Response from server:', data);
    
            // Assuming the server responds with a token upon successful login
            if (data.token) {
                localStorage.setItem('token', data.token); // Save the token to localStorage
                // Redirect to the homepage or any desired route upon successful login
                navigate('/');

                
        window.location.reload();
            } else {
                console.error('Token not received from server');
                // Handle the case where the server does not provide a token
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle network errors or other exceptions
        }
    };
    
    
    
    return (
        <Container fluid className="login-container login_form_cnt">
            <Row className="justify-content-center">
                <Col md={6} className="login-form">
                <img src="/headlogo.png" alt="" className='form_logos'/>

                    <h1 className="form-title">Log In</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <div className='login_btn_cnt'>
                            <Button variant="primary" type="submit" className="submit-btn">
                                Log In
                            </Button>
                        </div>
                    </Form>
                    <div className="or-divider">OR</div>
                    <div className='login_btn_cnt'>
                        <Button variant="danger" className="google-btn">
                            Log In with Google
                        </Button>
                    </div>
                    <div>
                        <a href="/signup">
                            <p>Don't have an account? Create New</p>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
