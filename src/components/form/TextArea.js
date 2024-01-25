import React from 'react';
import { Form } from 'react-bootstrap';
import './TextArea.css';
import PropTypes from "prop-types";

const TextArea = ({ value, message, ...rest }) => {
    const messageType = ({
      'light': 'text-secondary',
      'neutral': '',
      'warning': 'text-danger'
    })[message?.type];

    return (
      <>
        <Form.Control value={value} as="textarea" {...rest}></Form.Control>
        <Form.Text className={messageType}>{message?.content}</Form.Text>
      </>
    );
};

TextArea.propTypes = {
    value: PropTypes.string,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    })
};

export default TextArea;
