import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { Form } from 'react-bootstrap';

const Message = ({ type, children }) => {
  const id = useId();

  const messageType = ({
    'light': 'text-secondary',
    'neutral': '',
    'warning': 'text-danger'
  })[type] || 'neutral';

  return (
    <Form.Text id={id} aria-live="assertive" className={`form-message ${messageType}`}>{children}</Form.Text>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(['light', 'neutral', 'warning'])
};

export default Message;
