import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from "prop-types";
import './CheckBox.css';

const CheckBox = ({ label, ...rest }) => {
    return (
        <Form.Check type="checkbox" label={label} { ...rest } />
    );
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
};
export default CheckBox;
