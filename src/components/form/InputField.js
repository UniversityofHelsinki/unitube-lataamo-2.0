import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './InputField.css';

const InputField = ({ message, ...rest }) => {

  const messageType = ({
    'light': 'text-secondary',
    'neutral': '',
    'warning': 'text-danger'
  })[message?.type];

  return (
      <>
        <Form.Control type={ rest.type || "text"} { ...rest } />
        <Form.Text className={messageType}>{message?.content}</Form.Text>
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
