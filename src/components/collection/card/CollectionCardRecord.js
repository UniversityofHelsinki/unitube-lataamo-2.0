import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";

const CollectionCardRecord = ({ record, containerRef }) => {
  return (
    <Container className="collection-card-record">
      <Row style={{ height: '100%' }}>
        <Col className="collection-card-record-thumb p-0">
          <Thumbnail width="40" height="40" record={{ ...record, identifier: record.id }} altText={'collection_card_thumbnail_alt_text'} containerRef={containerRef}></Thumbnail>
        </Col>
        <Col className="col-sm-8 collection-card-record-details">{record.title}</Col>
      </Row>
    </Container>
  );
};

CollectionCardRecord.propTypes = {
  record: PropTypes.object.isRequired
};

export default CollectionCardRecord;
