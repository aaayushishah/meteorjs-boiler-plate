import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import {
  Alert,
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
} from "react-bootstrap";
const SignUp = ({ location }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const submit = () => {
    let role = 'user'
    Meteor.call(
      "stuffs.createUser",
      { email, password, role },
      (error, res) => {
        console.log("Res: ", res)
        if (error) {
          swal("Error", error.message, "error");
        } else {
          setError("");
          setRedirectToRef(true);
        }
      }
    );
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const { from } = location?.state || { from: { pathname: '/add' } };
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
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
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error === "" ? (
            ""
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
