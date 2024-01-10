import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import RecordName from "./RecordName";
import RecordInformation from "./RecordInformation";

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
            <RecordInformation />
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
    </Container>
  );
};

RecordForm.propTypes = {
};

export default RecordForm;
