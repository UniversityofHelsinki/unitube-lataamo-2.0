import React from 'react';
import PropTypes from 'prop-types';
import './AlertMessage.css';
import { ReactComponent as WarningIcon } from './icons/warning.svg';
import { ReactComponent as AlertIcon } from './icons/alert.svg';
import { ReactComponent as DoneIcon } from './icons/done.svg';

const AlertMessage = ({ children, type }) => {

  const Icon = {
    'warning': WarningIcon,
    'info': AlertIcon,
    'status': DoneIcon,
    'transparent': WarningIcon
  }[type];

  return (
    <div className={`alert-message ${type}`}>
      <Icon />
      <p>{children}</p>
    </div>
  );
};

AlertMessage.propTypes = {
};

export default AlertMessage;
