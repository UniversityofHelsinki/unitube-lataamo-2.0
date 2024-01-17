import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ExternalLinkIcon } from './icons/external-link.svg';
import Colors from './HyColors.js';
import './ExternalLink.css';

const ExternalLink = ({ to, label, fill, height = 12, width = 12 }) => {
  return (
    <>
      <a href={to} target="_blank" style={{ paddingRight: '8px' }}>{label}</a>
      <ExternalLinkIcon height={height} width={width} fill={fill || Colors.white} />
    </>
  );
    
};

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

export default ExternalLink;