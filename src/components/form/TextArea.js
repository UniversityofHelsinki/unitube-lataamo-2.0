import React from 'react';
import { Form } from 'react-bootstrap';
import './TextArea.css';
import PropTypes from "prop-types";
import Message from './Message';

const TextArea = ({ value, message, ...rest }) => {

    return (
      <>
        <Form.Control value={value} as="textarea" {...rest}></Form.Control>
        <Message type={message?.type}>{message?.content}</Message>
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
