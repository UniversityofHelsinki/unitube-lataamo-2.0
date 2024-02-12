import React from 'react';
import PropTypes from 'prop-types';
import './BottomBar.css';
import { Col, Container, Row } from 'react-bootstrap';
import Notifications from './Notifications';

const BottomBar = ({ notifications, buttons }) => {
  return (
    <Container className="bottom-bar">
      <Row className="bottom-bar-row align-items-center">
        <Col sm={8} className="bottom-bar-notitfications-col text-center">
          <Notifications>
            {notifications}
          </Notifications>
        </Col>
        <Col className="bottom-bar-buttons-col text-end">
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
