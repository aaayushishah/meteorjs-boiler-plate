import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/Stuff';
import StuffItemAdmin from '../components/StuffItemAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

const ListStuffAdmin = () => {
  const { stuffs, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Stuffs.adminPublicationName);
    const rdy = subscription.ready();
    const items = Stuffs.collection.find({}).fetch();
    return {
      stuffs: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Stuff (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListStuffAdmin;
