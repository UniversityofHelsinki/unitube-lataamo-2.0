import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import './RecordCardThumbnail.css';

const PlaceholderBox = () => 
  (<div style={{ minWidth: '160px', minHeight: '160px' }} />);

const RecordCardThumbnail = ({ record }) => {
  return (
    <Container className="no-margin no-padding record-card-thumbnail">
      <Row>
        <Col className="no-padding">
          <PlaceholderBox />
        </Col>
      </Row>
    </Container>
  );
};

RecordCardThumbnail.propTypes = {
};

export default RecordCardThumbnail;
