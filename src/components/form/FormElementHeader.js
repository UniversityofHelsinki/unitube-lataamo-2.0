import React from 'react';
import PropTypes from "prop-types";

const FormElementHeader = ({label}) => {
    return (
        <h2>{label}</h2>
    );
};

FormElementHeader.propTypes = {
    label: PropTypes.string.isRequired
};

export default FormElementHeader;
