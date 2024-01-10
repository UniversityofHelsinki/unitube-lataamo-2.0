import React from 'react';
import { Form } from 'react-bootstrap';

const InputField = () => {
    return (
        <Form.Control type="text" placeholder="inputText" className="form-control" />
    );
};

InputField.propTypes = {
};

export default InputField;
