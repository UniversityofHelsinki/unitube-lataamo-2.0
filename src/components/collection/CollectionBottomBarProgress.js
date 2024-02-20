import React from 'react';
import PropTypes from 'prop-types';
import './CollectionBottomBarProgress.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';
import { ProgressStatus } from '../../Constants';

const CollectionBottomBarProgress = ({ progress }) => {
  const { t } = useTranslation();

  const progressLabel = ({
    [ProgressStatus.COLLECTION_SAVE.NOT_STARTED]: '',
    [ProgressStatus.COLLECTION_SAVE.IN_PROGRESS]: t('collection_bottom_bar_in_progress'),
    [ProgressStatus.COLLECTION_SAVE.REPUBLISHING_METADATA]: t('collection_bottom_bar_republishing_metadata'),
    [ProgressStatus.COLLECTION_SAVE.DONE]: t('collection_bottom_bar_done'),
    [ProgressStatus.COLLECTION_SAVE.ERROR]: progress.message || t('collection_bottom_bar_error')
  })[progress.status] || '';

  const progressClass = ({
    [ProgressStatus.COLLECTION_SAVE.DONE]: 'done',
    [ProgressStatus.COLLECTION_SAVE.ERROR]: 'error'
  })[progress.status] || '';

  const animated = progress.status === ProgressStatus.COLLECTION_SAVE.REPUBLISHING_METADATA ? { animated: true } : {};

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
