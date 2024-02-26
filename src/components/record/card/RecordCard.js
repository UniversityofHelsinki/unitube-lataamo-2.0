import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordCard.css';
import { Col, Container, Row } from 'react-bootstrap';
import RecordCardDetails from './RecordCardDetails';
import RecordCardThumbnail from './RecordCardThumbnail';
import onKeyDown from '../../accessibility/keydown';

const RecordCard = ({ record, onClick, selected = false }) => {
  const selectedClass = selected ? 'record-card-selected' : '';
  const labelId = useId();
  return (
    <Container 
      className={`record-card ${selectedClass}`} 
      role="button"
      onClick={onClick} 
      onKeyDown={onKeyDown(onClick)}
      tabIndex={0}
      aria-labelledby={labelId}
    >
      <Row>
        <Col className="no-padding col-sm-4 text-center">
          <RecordCardThumbnail record={record} />
        </Col>
        <Col className="col-sm-8">
          <Container className="no-padding no-margin">
            <Row>
            </Row>
            <Row>
              <Col className="small-padding">
                <RecordCardDetails labelId={labelId} record={record} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default RecordCard;
