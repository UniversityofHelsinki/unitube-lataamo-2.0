import React from 'react';
import { Form } from 'react-bootstrap';
import './TextArea.css';

const TextArea = ({ value, ...rest }) => {
    return (
        <Form.Control value={value} as="textarea" {...rest}></Form.Control>
    );
};

TextArea.propTypes = {
};

export default TextArea;
