import React from 'react';
import PropTypes from 'prop-types';
import './Crumb.css';
import onKeyDown from '../accessibility/keydown';

const Crumb = ({ children, href, onClick, active }) => {
  const ariaCurrent = active ? { 'aria-current': 'page' } : {};

  const onLinkClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const element = href && <a className="crumb" href={href} onClick={onLinkClick} onKeyDown={onKeyDown(onLinkClick)} { ...ariaCurrent }>{children}</a> || <span className="crumb crumb-disabled">{children}</span>

  return (
    element
  );
};

Crumb.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.any
};

export default Crumb;
