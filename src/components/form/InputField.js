import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './InputField.css';
import Message from './Message';

const InputField = ({ message, ...rest }) => {

  return (
      <>
        <Form.Control type={ rest.type || "text" } { ...rest } />
        <Message type={message?.type}>{message?.content}</Message>
      </>
  );
};

InputField.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  })
};

export default InputField;
