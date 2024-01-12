import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';

const FormElementHeader = ({label, size}) => {
    return (
        <Form.Label as={size}>{label}</Form.Label>
    );
};

FormElementHeader.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
};

export default FormElementHeader;
