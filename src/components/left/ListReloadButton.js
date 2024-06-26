import React from 'react';
import PropTypes from 'prop-types';
import './ListReloadButton.css';
import { useTranslation } from 'react-i18next';
import { ReactComponent as RefreshIcon } from '../utilities/icons/rotate-right.svg';
import HyButton from '../utilities/HyButton';

const ListReloadButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <HyButton className="list-reload-button" leftIcon={<RefreshIcon />} onClick={onClick} variant="secondary" mini>
      <span>{t('reload')}</span>
    </HyButton>
  );
};

ListReloadButton.propTypes = {
  onClick: PropTypes.func,
};

export default ListReloadButton;
