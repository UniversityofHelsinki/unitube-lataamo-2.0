import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import { Col, Container, Row } from 'react-bootstrap';

const CollectionCardRecord = ({ record }) => {
  return (
    <Container className="collection-card-record">
      <Row style={{ height: '100%' }}>
        <Col className="col-sm-4 collection-card-record-thumb"></Col>
        <Col className="col-sm-8 collection-card-record-details">{record.name}</Col>
      </Row>
    </Container>
  );
};

CollectionCardRecord.propTypes = {
  record: PropTypes.object.isRequired
};

export default CollectionCardRecord;