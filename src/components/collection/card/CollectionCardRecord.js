import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";
import useSearchParams from "../../../hooks/useSearchParams";
import onKeyDown from "../../accessibility/keydown";

const CollectionCardRecord = ({ record, containerRef }) => {
    const [_, setSearchParams] = useSearchParams();

    const openRecord = (event) => {
        event.preventDefault();
        setSearchParams({
            record: record.id
        });
    };

  return (
    <Container className="collection-card-record">
      <Row style={{ height: '100%' }}>
        <Col className="collection-card-record-thumb p-0">
          <Thumbnail width="40" height="40" record={{ ...record, identifier: record.id }} altText={'collection_card_thumbnail_alt_text'} containerRef={containerRef}></Thumbnail>
        </Col>
        <Col className="col-sm-8 collection-card-record-details">
            <a href={`?record=${record.id}`} onClick={openRecord} onKeyDown={onKeyDown(openRecord)}>{record.title}</a>
        </Col>
      </Row>
    </Container>
  );
};

CollectionCardRecord.propTypes = {
  record: PropTypes.object.isRequired
};

export default CollectionCardRecord;
