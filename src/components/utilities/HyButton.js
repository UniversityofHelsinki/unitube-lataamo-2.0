import React from 'react';
import PropTypes from 'prop-types';
import './HyButton.css';

const HyButton = ({ 
  children = [], 
  className, 
  variant,
  leftIcon,
  rightIcon,
  ...rest 
}) => {

  return (
    <button className={`hy-button hy-button-${variant} ${className}`} { ...rest }>
      <div className="hy-button-content">
        {leftIcon && <div className="hy-button-icon">
          {leftIcon}
        </div>}
        {leftIcon && <div className="hy-button-icon-separator"></div>}
        {children}
        {rightIcon && <div className="hy-button-icon-separator"></div>}
        {rightIcon && <div className="hy-button-icon">
          {rightIcon}
        </div>}
      </div>
      <div className="hy-button-bottom">
      </div>
    </button>
  );
};

HyButton.propTypes = {
};

export default HyButton;
