import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";
import useSearchParams from "../../../hooks/useSearchParams";
import onKeyDown from "../../accessibility/keydown";
import { belowBreakpoint, toggleLeftSide } from '../../utilities/visibilities';

const CollectionCardRecord = ({ record, containerRef }) => {
    const [searchParameters, setSearchParams] = useSearchParams();

    const openRecord = (event) => {
        event.preventDefault();
        if (belowBreakpoint()) {
          toggleLeftSide();
        }
        setSearchParams({
            record: record.id
        });
    };

    const selected = searchParameters?.record === record?.id;

  return (
    <Container className={`collection-card-record ${selected ? 'collection-card-record-selected' : ''}`}>
      <Row as="a" href={`?record=${record.id}`} style={{ height: '100%' }}onClick={openRecord} onKeyDown={onKeyDown(openRecord)}>
        <Col className="collection-card-record-thumb p-0" aria-hidden>
          <Thumbnail width="40" height="40" record={{ ...record, identifier: record.id }} altText={'collection_card_thumbnail_alt_text'} containerRef={containerRef}></Thumbnail>
        </Col>
        <Col className="col-sm-8 collection-card-record-details">
          {record.title}
        </Col>
      </Row>
    </Container>
  );
};

CollectionCardRecord.propTypes = {
  record: PropTypes.object.isRequired
};

export default CollectionCardRecord;
