import React from 'react';
import { Form } from 'react-bootstrap';
import './TextArea.css';

const TextArea = () => {
    return (
        <Form.Control as="textarea"></Form.Control>
    );
};

TextArea.propTypes = {
};

export default TextArea;
