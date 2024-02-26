import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';

const Notifications = ({ children }) => {
  const id = useId();
  return (
    <div id={id} className="notifications" aria-live="polite">
      {children}
    </div>
  );
};

Notifications.propTypes = {
};

export default Notifications;
