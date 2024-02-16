import React from 'react';
import PropTypes from 'prop-types';
import './CollectionBottomBarProgress.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';

const CollectionBottomBarProgress = ({ progress }) => {
  const { t } = useTranslation();

  const progressLabel = ({
    'NOT_STARTED': '',
    'IN_PROGRESS': t('collection_bottom_bar_in_progress'),
    'REPUBLISHING_METADATA': t('collection_bottom_bar_republishing_metadata'),
    'DONE': t('collection_bottom_bar_done'),
    'ERROR': progress.message || t('collection_bottom_bar_error')
  })[progress.status] || '';

  const progressClass = ({
    'DONE': 'done',
    'ERROR': 'error'
  })[progress.status] || '';

  const animated = progress.status === 'REPUBLISHING_METADATA' ? { animated: true } : {};

  return (
    <ProgressBar 
      type={progressClass}
      now={progress.percentage}
      label={progressLabel}
      { ...animated }
      alertMessage={<></>}
    />

  );
};

CollectionBottomBarProgress.propTypes = {
};

export default CollectionBottomBarProgress;
