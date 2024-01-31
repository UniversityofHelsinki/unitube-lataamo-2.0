import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MainContent from './MainContent';
import './Right.css';

const Right = () => {
  return (
    <Container className="right">
      <Row className="right-main-content-row">
        <Col className="right-main-content-col">
          <MainContent />
        </Col>
      </Row>
      <Row className="right-bottom">
        <Col className="right-bottom-notification-col">
          <h5>olen alapalkinilmoitusosa</h5>
        </Col>
        <Col className="right-bottom-button-col text-end">
          <h5>olen alapalkin nappulaosa</h5>
        </Col>
      </Row>
    </Container>
  );
};

Right.propTypes = {
};

export default Right;
