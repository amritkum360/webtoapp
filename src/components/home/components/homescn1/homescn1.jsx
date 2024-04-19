import React, { useState } from 'react';
import './homescn1.css'; // Assuming you have a CSS file for styling
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Homescn1() {
    const [inputValue, setInputValue] = useState('');
    // const history = useHistory();
    const navigate = useNavigate()

    const handleConvert = () => {
        // Navigate to /account/newapp with input details
        navigate(`/account/newapp?websiteurl=${encodeURIComponent(inputValue)}`);
    };

    return (
        <Container fluid className="container_fluid container_homescn1">
            <Row className="row row_homescn1">
                <Col md={12} className="text text_homescn1">
                    <div className="content content_homescn1">
                        <h1 className="heading heading_homescn1 ">Convert Your Website Into an App</h1>
                        <p className="sub-heading sub-heading_homescn1">Takes 1 Minute to Convert</p>
                        <div>
                            <input
                                className="input-field input-field_homescn1"
                                placeholder="Enter your website URL"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <Button
                                className="convert-button convert-button_homescn1"
                                onClick={handleConvert}
                            >
                                Convert
                            </Button>
                        </div>
                        <div>
                            <p style={{ color: "white" }}>
                                <i className="fa fa-warning" style={{ fontSize: '25px', color: 'red', paddingRight: '10px' }}></i>
                                NO CODING SKILL NEEDED
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
