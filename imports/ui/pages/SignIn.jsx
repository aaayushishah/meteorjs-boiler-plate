import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import {
  Alert,
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";
const SignIn = () => {
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (redirect) {
    return (<Navigate to="/" />);
  }
  
  return (
    <Container id="signin-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Login to your account</h2>
          </Col>
          <Form noValidate>
            <Card>
              <Card.Body>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => submit()}
                >
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Form>
          <Alert variant="light">
            <Link to="/signup">Click here to Register</Link>
          </Alert>
          {error === "" ? (
            ""
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
