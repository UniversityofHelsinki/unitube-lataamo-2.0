import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ExternalLinkIcon } from './icons/external-link.svg';
import Colors from './HyColors.js';
import './ExternalLink.css';

const ExternalLink = ({ to, label, fill }) => {
  return (
    <>
      <a href={to} style={{ paddingRight: '8px' }}>{label}</a>
      <ExternalLinkIcon height={12} width={12} fill={fill || Colors.white} />
    </>
  );
    
};

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fill: PropTypes.string
};

export default ExternalLink;
