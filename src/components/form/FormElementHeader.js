import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({ size='h5', children, componentId, ...rest }) => {
    return (
        <Form.Label className="form-element-header" { ...rest } for={componentId}>{children}</Form.Label>
    );
};

FormElementHeader.propTypes = {
  size: PropTypes.string,
  children: PropTypes.any,
  componentId: PropTypes.string,
};

export default FormElementHeader;
