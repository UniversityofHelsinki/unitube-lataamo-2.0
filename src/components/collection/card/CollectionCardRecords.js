import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import CollectionCardRecord from './CollectionCardRecord';
import './CollectionCardRecords.css';

const CollectionCardRecords = ({ records = [] }) => {
  return (
    <Container className="collection-card-records">
      <Row className="justify-content-between mt-2">
          {records.map((record, i) => 
              <Col key={i} className="collection-card-records-record-column">
                <CollectionCardRecord record={record} />
              </Col>
          )}
      </Row>
    </Container>
  );
};

CollectionCardRecords.propTypes = {
  records: PropTypes.array.isRequired
};

export default CollectionCardRecords;
