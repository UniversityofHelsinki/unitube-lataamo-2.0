import React from 'react';
import PropTypes from "prop-types";
import './ElementHeader.css';

const ElementHeader = ({ children, label, ...rest }) => {
    return (
        <span className="element-header" aria-label={label} { ...rest }>
          {children}
        </span>
    );
};

ElementHeader.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string,
};

export default ElementHeader;
