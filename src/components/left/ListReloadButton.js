import React from 'react';
import PropTypes from 'prop-types';
import './ListReloadButton.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as RefreshIcon } from '../utilities/icons/rotate-right.svg';

const ListReloadButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <button onClick={onClick} className="list-reload-button">
      <RefreshIcon />
      <span>{t('reload')}</span>
    </button>
  );
};

ListReloadButton.propTypes = {
  onClick: PropTypes.func,
};

export default ListReloadButton;
