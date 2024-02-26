import React from 'react';
import PropTypes from 'prop-types';
import './NewCollectionProgressBar.css';
import ProgressBar from '../form/ProgressBar';
import { ProgressStatus } from '../../Constants';
import { useTranslation } from 'react-i18next';

const NewCollectionProgressBar = ({ progress }) => {
  const { t } = useTranslation();

  const type = {
    [ProgressStatus.NEW_COLLECTION.DONE]: 'done',
    [ProgressStatus.NEW_COLLECTION.ERROR]: 'error'
  }[progress.status] || '';

  const label = {
    [ProgressStatus.NEW_COLLECTION.NOT_STARTED]: '',
    [ProgressStatus.NEW_COLLECTION.SENDING]: t('new_collection_progress_bar_sending'),
    [ProgressStatus.NEW_COLLECTION.ERROR]: progress.message || t('new_collection_progress_bar_error'),
    [ProgressStatus.NEW_COLLECTION.DONE]: t('new_collection_progress_bar_done')
  }[progress.status] || '';

  return (
    <ProgressBar 
      now={progress.percentage}
      label={label}
      alertMessage={<></>}
      type={type}
    />
  );
};

NewCollectionProgressBar.propTypes = {
};

export default NewCollectionProgressBar;
