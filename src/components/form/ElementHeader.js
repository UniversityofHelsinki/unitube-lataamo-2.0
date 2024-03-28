import React from 'react';
import PropTypes from "prop-types";
import './ElementHeader.css';

const ElementHeader = ({ children, ...rest }) => {
    return (
        <h3 className="form-label element-header" { ...rest }>
          {children}
        </h3>
    );
};

ElementHeader.propTypes = {
  children: PropTypes.node,
};

export default ElementHeader;
