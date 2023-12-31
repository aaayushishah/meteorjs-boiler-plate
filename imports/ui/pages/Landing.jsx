import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

const Landing = () => (
  <Container id="landing-page" fluid className="py-3">
    <Row className="align-middle text-center">
      <Col xs={4}>
        <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
      </Col>

      <Col xs={8} className="d-flex flex-column justify-content-center">
        <h1>Welcome to this Boiler Plate</h1>
        <p>You can list edit and create items</p>
      </Col>

    </Row>
  </Container>
);

export default Landing;
