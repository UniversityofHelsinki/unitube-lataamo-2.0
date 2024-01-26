import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './CollectionCard.css';
import CollectionCardRecords from './CollectionCardRecords';

const CollectionCard = ({ collection, onClick, selected = false}) => {
  const selectedClass = selected ? 'collection-card-selected' : '';
  return (
    <Container onClick={onClick} tabIndex={0} className={`collection-card ${selectedClass}`}>
      <Row className="collection-card-header-row">
        <Col>
          <h4>{collection.title}</h4>
        </Col>
      </Row>
      <Row>
        <CollectionCardRecords records={[]} />
      </Row>
    </Container>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default CollectionCard;
