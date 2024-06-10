import React from 'react';
import PropTypes from "prop-types";
import { Form } from 'react-bootstrap';
import './FormElementHeader.css';

const FormElementHeader = ({ children, componentId, helpDialog, ...rest }) => {

    return (
      <div className="form-element-header">
        <Form.Label { ...rest } htmlFor={componentId}>
          {children}
        </Form.Label>
        <div>
          {helpDialog}
        </div>
      </div>
    );
};

FormElementHeader.propTypes = {
  children: PropTypes.any,
  componentId: PropTypes.string,
};

export default FormElementHeader;
