import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import './InputField.css';

const InputField = ({ placeholder, ...rest }) => {
    return (
        <Form.Control type="text" placeholder={placeholder} className="form-control" />
    );
};

InputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default InputField;
