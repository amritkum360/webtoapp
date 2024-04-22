import React, { useState } from 'react';
import './Signup.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
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
            const response = await fetch('http://127.0.0.1:3000/signup', {
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

            // Store token in local storage
            localStorage.setItem('token', data.token);

            // Set expiration time for token (1 hour)
            setTimeout(() => {
                localStorage.removeItem('token'); // Remove token after 1 hour
            }, 3600000); // 1 hour in milliseconds
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Container fluid className="signup-container signup_form_cnt">
            <Row className="justify-content-center">
                <Col md={6} className="signup-form">
                <img src="/headlogo.png" alt="" className='form_logos'/>
                    <h1 className="form-title">Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
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
                        <div className="signup_btn_cnt">
                            <Button variant="primary" type="submit" className="submit-btn">
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                    <div className="or-divider">OR</div>
                    <div className="signup_btn_cnt">
                        <Button variant="danger" className="google-btn">
                            Sign Up with Google
                        </Button>
                    </div>
                    <div>
                        <a href="/login">
                            <p>Already Have An Account</p>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
