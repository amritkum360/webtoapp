import React from 'react';
import './homescn1.css'; // Assuming you have a CSS file for styling
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Homescn1() {
    return (
        <Container fluid className="container_fluid container_homescn1">
            <Row className="row row_homescn1">
                <Col md={12} className="text text_homescn1">
                    <div className="content content_homescn1">
                        <h1 className="heading heading_homescn1 " >Convert Your Website Into an App</h1>
                        <p className="sub-heading sub-heading_homescn1">Takes 1 Minute to Convert</p>
                        {/* <div className="input-group input-group_homescn1"> */}
                        <div>
                            <input className="input-field input-field_homescn1" placeholder="Enter your website URL" />
                            <Button className="convert-button convert-button_homescn1">Convert</Button>
                            </div>
                        </div>
                    {/* </div> */}
                </Col>
                {/* <Col md={6} className="image image_homescn1">
                    <img className="image image_homescn1" src="https://appmaker.xyz/_next/image?url=%2Fimages%2Fpages%2Fshopify%2Fshopify-hero-image.png&w=640&q=75" alt="Your Image" />
                </Col> */}
            </Row>
        </Container>
    );
}
