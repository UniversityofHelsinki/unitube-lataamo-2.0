import React from 'react';
import PropTypes from 'prop-types';
import './AlertMessage.css';
import { ReactComponent as WarningIcon } from './icons/warning.svg';
import { ReactComponent as AlertIcon } from './icons/alert.svg';
import { ReactComponent as DoneIcon } from './icons/done.svg';

const AlertMessage = ({ children, type, slim = false }) => {

  const Icon = {
    'warning': WarningIcon,
    'info': AlertIcon,
    'status': DoneIcon,
    'transparent': WarningIcon
  }[type];

  const slimClass = slim ? 'alert-message-slim' : '';

  return (
    <div className={`alert-message ${type} ${slimClass}`}>
      <Icon />
      <p>{children}</p>
    </div>
  );
};

AlertMessage.propTypes = {
  children: PropTypes.element,
  type: PropTypes.oneOf(['warning', 'info', 'status', 'transparent']),
  slim: PropTypes.bool
};

export default AlertMessage;
