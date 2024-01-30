import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { Form } from 'react-bootstrap';

const Message = ({ type, children }) => {

  if (!type) {
    return <></>;
  }

  const messageType = ({
    'light': 'text-secondary',
    'neutral': '',
    'warning': 'text-danger'
  })[type] || 'neutral';

  return (
    <Form.Text className={messageType}>{children}</Form.Text>
  );
};

Message.propTypes = {
  type: PropTypes.oneOf(['light', 'neutral', 'warning'])
};

export default Message;
