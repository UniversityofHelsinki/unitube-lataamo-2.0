import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";
import { Form } from 'react-bootstrap';
import RecordDescription from './RecordDescription';
import './RecordForm.css';

const RecordForm = () => {
  return (
    <Container>
      <Form>
          <Row>
            <Col>
                <RecordName />
            </Col>
          </Row>
          <Row>
            <Col>
                <RecordDescription />
            </Col>
          </Row>
          <Row>
            <Col>
                Voimassaolo
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
          </Row>
      </Form>
    </Container>
  );
};

RecordForm.propTypes = {
};

export default RecordForm;
