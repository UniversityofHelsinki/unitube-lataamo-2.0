import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './InputField.css';
import Message from './Message';

const InputField = ({ message, hideMessage, ...rest }) => {

    const isInvalid = message?.content;

  return (
      <>
        <Form.Control type={ rest.type || "text" } aria-invalid={isInvalid} { ...rest } />
        {!hideMessage && <Message type={message?.type}>{message?.content}</Message>}
      </>
  );
};

InputField.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.oneOf(['light', 'neutral', 'warning'])
  }),
  hideMessage: PropTypes.bool
};

export default InputField;
