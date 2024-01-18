import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({label, size='h5' }) => {
    return (
        <Form.Label as={size}>{label}</Form.Label>
    );
};

FormElementHeader.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default FormElementHeader;
