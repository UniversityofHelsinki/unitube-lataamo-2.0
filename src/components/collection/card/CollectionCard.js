import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './CollectionCard.css';
import CollectionCardRecords from './CollectionCardRecords';
import onKeyDown from '../../accessibility/keydown';
import useCollectionTags from '../../../hooks/collection/useCollectionTags';
import CardTags from '../../utilities/CardTags';
import DOMPurify from "dompurify";

const CollectionCard = ({ collection, onClick, selected = false}) => {
  const selectedClass = selected ? 'collection-card-selected' : '';
  const collectionHasRecords = collection.eventColumns?.length > 0;
  const tags = useCollectionTags(collection);
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
        className="collection-card-header-row pt-2"
        onClick={handleClick}
        onKeyDown={onKeyDown(handleClick)}
        aria-current={selected ? 'page' : false}
      >
        <Col>
          <span id={labelId}>
            {collection.highlightedTitle ? (
                    <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(collection.highlightedTitle)}}></span>)
                :  (
                    <span>{collection.title}</span>
                )}
          </span>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <CardTags tags={tags} />
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
