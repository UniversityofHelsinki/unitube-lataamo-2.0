import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({ size='h5', children, ...rest }) => {
    return (
        <Form.Label as={size} { ...rest }>{children}</Form.Label>
    );
};

FormElementHeader.propTypes = {
    size: PropTypes.string,
    children: PropTypes.any
};

export default FormElementHeader;
