import React from 'react';
import PropTypes from 'prop-types';
import './DateView.css';
import { useTranslation } from 'react-i18next';

const DateView = ({ ISO }) => {
  const { t, i18n } = useTranslation();

  if (!ISO) {
    return <span>{t('N/A')}</span>;
  }

  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };

  const date = new Intl.DateTimeFormat(
    'fi-FI',
    options
  ).format(new Date(ISO));

  return (
    <span>{date}</span>
  );
};

DateView.propTypes = {
  ISO: PropTypes.string
};

export default DateView;
