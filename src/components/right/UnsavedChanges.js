import React from 'react';
import PropTypes from 'prop-types';
import './UnsavedChanges.css';
import { useTranslation } from 'react-i18next';

const UnsavedChanges = () => {
  const { t } = useTranslation();
  return (
    <span>{t('unsaved_changes')}</span>
  );
};

UnsavedChanges.propTypes = {
};

export default UnsavedChanges;
