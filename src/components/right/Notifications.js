import React from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

const Notifications = ({ children }) => {
  return (
    <div className="notifications">
      {children}
    </div>
  );
};

Notifications.propTypes = {
};

export default Notifications;
