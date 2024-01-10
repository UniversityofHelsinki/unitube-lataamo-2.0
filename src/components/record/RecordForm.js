import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";

const RecordForm = () => {
  return (
    <Container>
      <Row>
        <Col>
          BreadCrumb
        </Col>
      </Row>
      <Row>
        <Col>
            <RecordName />
        </Col>
      </Row>
      <Row>
        <Col>
            RecordDescription
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
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

RecordForm.propTypes = {
};

export default RecordForm;
