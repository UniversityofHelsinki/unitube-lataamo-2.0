import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({label}) => {
    return (
        <Form.Label as="h2">{label}</Form.Label>
    );
};

FormElementHeader.propTypes = {
    label: PropTypes.string.isRequired
};

export default FormElementHeader;
