import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecord.css';
import { Col, Container, Row } from 'react-bootstrap';

const CollectionRecord = ({ record }) => {
  console.log(record);
  return (
    <Container className="collection-record">
      <Row className="align-items-center">
        <Col sm={4} className="collection-record-thumb">
        </Col>
        <Col sm={6} className="collection-record-details text-center">
          <span>{record.title}</span>
        </Col>
        <Col sm={2} className="collection-record-remove">
          <span>X</span>
        </Col>
      </Row>
    </Container>
  );
};

CollectionRecord.propTypes = {
};

export default CollectionRecord;
