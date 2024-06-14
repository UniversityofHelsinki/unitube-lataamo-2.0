import React from 'react';
import PropTypes from "prop-types";
import './ElementHeader.css';

const ElementHeader = ({ children, helpDialog, ...rest }) => {
    return (
      <div className="form-element-header">
        <h3 className="form-label element-header" { ...rest }>
          {children}
        </h3>
        <div>
          {helpDialog}
        </div>
      </div>
    );
};

ElementHeader.propTypes = {
  children: PropTypes.node,
};

export default ElementHeader;
