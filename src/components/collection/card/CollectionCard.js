import React, { useId } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './CollectionCard.css';
import CollectionCardRecords from './CollectionCardRecords';
import onKeyDown from '../../accessibility/keydown';
import useCollectionTags from '../../../hooks/collection/useCollectionTags';
import CardTags from '../../utilities/CardTags';
import DOMPurify from "dompurify";
import CollectionActions from "./CollectionActions";

const CollectionCard = ({ collection, onClick, selected = false, containerRef }) => {
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
      <Row className="collection-card-header-row pt-2">
        <Col>
          <div className="collection-card-title">
            <a href={`?collection=${collection.identifier}`} onClick={handleClick} onKeyDown={onKeyDown(handleClick)}
               aria-current={selected ? 'page' : false}>
              <span id={labelId}>
                {collection.highlightedTitle ? (
                  <span dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(collection.highlightedTitle)}}></span>)
                  :  (
                    <span>{collection.title}</span>
                  )}
              </span>
            </a>
            { !collectionHasRecords && <CollectionActions collection={collection}/> }
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <CardTags tags={tags}/>
        </Col>
      </Row>
      {collectionHasRecords && <Row className="collection-card-record-row">
        <CollectionCardRecords records={collection.eventColumns} containerRef={containerRef} />
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
