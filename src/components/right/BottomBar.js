import React from 'react';
import PropTypes from 'prop-types';
import './BottomBar.css';
import { Col, Container, Row } from 'react-bootstrap';
import Notifications from './Notifications';

const BottomBar = ({ notifications, buttons }) => {
  return (
    <div className="bottom-bar">
        <div className="bottom-bar-notifications text-center">
          <Notifications>
            {notifications}
          </Notifications>
        </div>
        <div className="bottom-bar-buttons">
          {buttons}
        </div>
    </div>
  );
};

BottomBar.propTypes = {
  notifications: PropTypes.any,
  buttons: PropTypes.any
};

export default BottomBar;
