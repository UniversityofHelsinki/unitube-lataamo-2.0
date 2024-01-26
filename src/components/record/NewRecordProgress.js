import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './NewRecordProgress.css';
import { ProgressStatus } from '../../Constants';
import { useTranslation } from 'react-i18next';
import AlertMessage from '../utilities/AlertMessage';
import ProgressBar from '../form/ProgressBar';

const NewRecordProgress = ({ progress }) => {
  const { t } = useTranslation();

  const timeLeftLabel = (() => {
    if (progress.timeLeft === Infinity) {
      return t('new_record_progress_calculating_time_left');
    }
    const minutes = Math.floor(progress.timeLeft / 60);
    const seconds = progress.timeLeft % 60;
    if (minutes > 0 && seconds === 0) {
      return `${progress.timeLeft} ${t('minutes_left')}`;
    } else if (minutes > 0) {
      return `${minutes} ${t('minutes_and')} ${seconds} ${t('seconds_left')}.`;
    }
    return `${seconds} ${t('seconds_left')}.`
  })();

  const progressLabel = {
    [ProgressStatus.ERROR]: t('new_record_upload_error'),
    [ProgressStatus.DONE]: t('new_record_upload_done'),
    [ProgressStatus.SENDING]: timeLeftLabel,
    [ProgressStatus.ABORTED]: t('new_record_upload_aborted'),
    [ProgressStatus.PROCESSING]: t('new_record_upload_processing')
  }[progress.status] || '';

  const progressClass = {
    [ProgressStatus.ERROR]: 'error',
    [ProgressStatus.DONE]: 'done',
    [ProgressStatus.SENDING]: 'sending',
    [ProgressStatus.NOT_STARTED]: 'not-started',
    [ProgressStatus.ABORTED]: 'aborted',
    [ProgressStatus.PROCESSING]: 'processing'
  }[progress.status];

  const alertMessage = (() => {
    if (progress.status === ProgressStatus.SENDING) {
      return (
        <AlertMessage type="transparent">
          {t('new_record_footer_alert_sending')}
        </AlertMessage>
      );
    } 
    if (progress.status === ProgressStatus.PROCESSING) {
        return (
          <AlertMessage type="transparent">
          {t('new_record_footer_alert_processing')}
          </AlertMessage>
        );
    }
    return <></>;
  })();

  const processingProgressBarProps = progress.status === ProgressStatus.PROCESSING ? {
    variant: 'striped',
    animated: true
  } : {};

  return (
      <ProgressBar now={progress.percentage} type={progressClass} alertMessage={alertMessage} label={progressLabel} { ...processingProgressBarProps } />
  );
};

NewRecordProgress.propTypes = {
  progress: PropTypes.shape({
    percentage: PropTypes.number.isRequired,
    timeLeft: PropTypes.number,
    status: PropTypes.string
  })
};

export default NewRecordProgress;
