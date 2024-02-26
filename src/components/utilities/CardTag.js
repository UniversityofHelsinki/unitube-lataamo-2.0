import React from 'react';
import PropTypes from 'prop-types';
import './CardTag.css';
import { Badge } from 'react-bootstrap';

const background = {
  blue: 'primary',
  grey: 'secondary',
  green: 'success',
  yellow: 'warning',
  red: 'danger',
  brightblue: 'info',
  white: 'light',
  black: 'dark'
};

const CardTag = ({ label, color }) => {
  return (
    <Badge className="card-tag" bg={background[color]} title={label}>{label}</Badge>
  );
};

CardTag.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'blue', 'grey', 'green', 'red', 'yellow', 'brightblue', 'white', 'black']).isRequired
};

export default CardTag;
