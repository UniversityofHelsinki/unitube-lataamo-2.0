import React from 'react';
import PropTypes from 'prop-types';
import './RecordBottomBarProgress.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';
import AlertMessage from '../utilities/AlertMessage';

const RecordBottomBarProgress = ({ progress }) => {
  const { t } = useTranslation();

  const progressLabels = {
    'NOT_STARTED': '',
    'IN_PROGRESS_RECORD': t('record_bottom_bar_progress_saving_record'),
    'IN_PROGRESS_SUBTITLES': t('record_bottom_bar_progress_saving_subtitles'),
    'IN_PROGRESS_ORDERSUBTITLES': t('record_bottom_bar_progress_ordering_subtitles'),
    'DONE': t('record_bottom_bar_progress_done'),
    'ERROR': progress.message || t('record_bottom_bar_progress_error')
  };

  const progressClass = ({
    'DONE': 'done',
    'ERROR': 'error',
  })[progress.status] || '';

  const animated = !['DONE', 'ERROR'].includes(progress.status) ? { animated: true } : {};


  return (
    <ProgressBar 
      type={progressClass}
      now={progress.percentage}
      label={progressLabels[progress.status]}
      alertMessage={<></>}
      { ...animated }
    />
  );
};

RecordBottomBarProgress.propTypes = {
  progress: PropTypes.shape({ 
    status: PropTypes.string.isRequired,
    percentage: PropTypes.number
  })
};

export default RecordBottomBarProgress;
