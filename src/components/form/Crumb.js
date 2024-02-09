import React from 'react';
import PropTypes from 'prop-types';
import './Crumb.css';
import { Button } from 'react-bootstrap';

const Crumb = ({ children, onClick, active }) => {
  const ariaCurrent = active ? { 'aria-current': 'page' } : {};
  const props = onClick ? { onClick } : { disabled: true };

  return (
    <Button className="crumb" variant="link" { ...props } { ...ariaCurrent }>
      {children}
    </Button>
  );
};

Crumb.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.any
};

export default Crumb;
