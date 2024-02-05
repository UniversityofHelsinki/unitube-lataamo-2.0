import React from 'react';
import PropTypes from 'prop-types';
import './BottomBar.css';
import { Col, Container, Row } from 'react-bootstrap';

const BottomBar = ({ notifications, buttons }) => {
  return (
    <Container className="bottom-bar">
      <Row className="bottom-bar-notifications-row">
        <Col className="bottom-bar-notitfications-col">
          {notifications}
        </Col>
        <Col className="bottom-bar-buttons-col">
          {buttons}
        </Col>
      </Row>
    </Container>
  );
};

BottomBar.propTypes = {
  notifications: PropTypes.any,
  buttons: PropTypes.any
};

export default BottomBar;
