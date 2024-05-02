import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";
import useSearchParams from "../../../hooks/useSearchParams";
import onKeyDown from "../../accessibility/keydown";
import useVisibilities from '../../../hooks/useVisibilities';

const CollectionCardRecord = ({ record, containerRef }) => {
    const [searchParameters, setSearchParams] = useSearchParams();
    const [_leftHidden, _rightHidden, swap] = useVisibilities();

    const openRecord = (event) => {
        event.preventDefault();
        swap();
        setSearchParams({
            record: record.id
        });
    };

    const selected = searchParameters?.record === record?.id;

  return (
    <Container className="collection-card-record">
      <Row style={{ height: '100%' }}>
        <Col className = {selected ? "collection-card-record-thumb-selected p-0" : "collection-card-record-thumb p-0"}>
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
