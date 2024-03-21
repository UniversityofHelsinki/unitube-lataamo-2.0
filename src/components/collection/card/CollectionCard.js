import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './CollectionCard.css';
import CollectionCardRecords from './CollectionCardRecords';
import onKeyDown from '../../accessibility/keydown';

const CollectionCard = ({ collection, onClick, selected = false}) => {
  const selectedClass = selected ? 'collection-card-selected' : '';
  const collectionHasRecords = collection.eventColumns?.length > 0;
  const labelId = useId();

  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container 
      className={`collection-card ${selectedClass}`}
      aria-labelledby={labelId}
    >
      <Row as="a"
        href={`?collection=${collection.identifier}`}
        className="collection-card-header-row py-2"
        onClick={handleClick} 
        onKeyDown={onKeyDown(handleClick)}
      >
        <Col>
          <span id={labelId}>{collection.title}</span>
        </Col>
      </Row>
      {collectionHasRecords && <Row className="collection-card-record-row">
        <CollectionCardRecords records={collection.eventColumns} />
      </Row>}
    </Container>
  );
};

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
};

export default CollectionCard;
