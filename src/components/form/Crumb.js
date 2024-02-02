import React from 'react';
import PropTypes from 'prop-types';
import './Crumb.css';
import { Button } from 'react-bootstrap';

const Crumb = ({ children, onClick }) => {
  const props = onClick ? { onClick } : { disabled: true };

  return (
    <Button className="crumb" variant="link" { ...props }>
      {children}
    </Button>
  );
};

Crumb.propTypes = {
  onClick: PropTypes.func,
};

export default Crumb;
