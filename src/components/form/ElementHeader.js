import React from 'react';
import PropTypes from "prop-types";
import './ElementHeader.css';

const ElementHeader = ({ children, label, ...rest }) => {
    return (
        <span className="element-header form-label" aria-label={label} { ...rest }>
          {children}
        </span>
    );
};

ElementHeader.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
};

export default ElementHeader;
