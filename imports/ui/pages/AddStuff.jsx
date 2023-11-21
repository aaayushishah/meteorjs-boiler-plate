import React from 'react';
import { Card, Col, Container, Form, Row, Button } from "react-bootstrap";
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff';
import { Formik } from "formik";
import * as Yup from "yup";
import { condition } from '../../constants/utils';

const AddStuff = () => {
  return (
    <Formik
      validateOnBlur={true}
      validateOnChange={true}
      initialValues={{
        name: "",
        quantity: "",
        condition: "",
      }}
      onSubmit={(values, { resetForm }) => {
        const { name, quantity, condition } = values;
        const owner = Meteor.user().username;
        Stuffs.collection.insert(
          { name, quantity, condition, owner },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Item added successfully', 'success');
              resetForm();
            }
          },
        );
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Name required")
          .min(3, "Min 3 char required"),
        quantity: Yup.string().required("Quantity required"),
        condition: Yup.string().required("Condition required"),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isValid,
          dirty,
          resetForm,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <Container className="py-3">
            <Row className="justify-content-center">
              <Col xs={5}>
                <Col className="text-center">
                  <h2>Add Stuff</h2>
                </Col>
                <form onSubmit={handleSubmit} noValidate>
                  <Card>
                    <Card.Body>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder=""
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.name && touched.name && (
                          <div>{errors.name}</div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="text"
                          name="quantity"
                          placeholder=""
                          value={values.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.quantity && touched.quantity && (
                          <div>{errors.quantity}</div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Condition</Form.Label>
                        <Form.Select
                          value={values.condition}
                          name="condition"
                          aria-label="Default select example"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option value={""}>Open this select menu</option>
                          {condition.map((val) => {
                            return <option key={val} value={val}>{val}</option>;
                          })}
                        </Form.Select>
                        {errors.condition && touched.condition && (
                          <div>{errors.condition}</div>
                        )}
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Card.Body>
                  </Card>
                </form>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddStuff;
