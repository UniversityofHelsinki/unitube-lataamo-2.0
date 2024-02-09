import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({ children, componentId, ...rest }) => {
    return (
        <Form.Label className="form-element-header" { ...rest } htmlFor={componentId}>{children}</Form.Label>
    );
};

FormElementHeader.propTypes = {
  children: PropTypes.any,
  componentId: PropTypes.string,
};

export default FormElementHeader;
