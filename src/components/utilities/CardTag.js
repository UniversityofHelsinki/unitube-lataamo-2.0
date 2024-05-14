import React from 'react';
import PropTypes from 'prop-types';
import './CardTag.css';
import { Badge } from 'react-bootstrap';

const background = {
  blue: 'primary',
  grey: 'secondary',
  green: 'success',
  orange: 'warning',
  red: 'danger',
  brightblue: 'info',
  white: 'light',
  black: 'dark'
};

const CardTag = ({ label, color, count }) => {
  return (
    <Badge className="card-tag" bg={background[color]} title={label}>{label} {count && `(${count})` || ''}</Badge>
  );
};

CardTag.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(background)).isRequired,
  count: PropTypes.number
};

export default CardTag;
