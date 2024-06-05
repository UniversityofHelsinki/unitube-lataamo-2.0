import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import CollectionCardRecord from './CollectionCardRecord';
import './CollectionCardRecords.css';

const CollectionCardRecords = ({ records = [], containerRef }) => {

  return (
    <div className="collection-card-records">
          {records.map((record, i) => 
          <div key={i} className="collection-card-records-record">
                <CollectionCardRecord record={record} containerRef={containerRef} />
          </div>
          )}
    </div>
  );
};

CollectionCardRecords.propTypes = {
  records: PropTypes.array.isRequired
};

export default CollectionCardRecords;
