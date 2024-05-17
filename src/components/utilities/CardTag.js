import React from 'react';
import PropTypes from 'prop-types';
import './CardTag.css';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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

const CardTag = ({ label, ariaLabel = '', color, count }) => {
  const { t } = useTranslation();

  const title = ariaLabel ? { title: t(ariaLabel) } : {};

  return (
    <Badge className="card-tag" bg={background[color]} { ...title }>
      <span className="screenreader-only">{t(ariaLabel)}</span>
      <span aria-hidden>{t(label)} {count && `(${count})` || ''}</span>
    </Badge>
  );
};

CardTag.propTypes = {
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(background)).isRequired,
  count: PropTypes.number,
};

export default CardTag;
