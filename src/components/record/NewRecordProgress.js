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
    [ProgressStatus.NEW_RECORD.ERROR]: t('new_record_upload_error'),
    [ProgressStatus.NEW_RECORD.DONE]: t('new_record_upload_done'),
    [ProgressStatus.NEW_RECORD.SENDING]: timeLeftLabel,
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLES]: t('new_record_upload_sending_subtitles'),
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER]: t('new_record_upload_sending_subtitle_order'),
    [ProgressStatus.NEW_RECORD.ABORTED]: t('new_record_upload_aborted'),
    [ProgressStatus.NEW_RECORD.PROCESSING]: t('new_record_upload_processing')
  }[progress.status] || '';

  const progressClass = {
    [ProgressStatus.NEW_RECORD.ERROR]: 'error',
    [ProgressStatus.NEW_RECORD.DONE]: 'done',
    [ProgressStatus.NEW_RECORD.SENDING]: 'sending',
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLES]: 'sending',
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER]: 'sending',
    [ProgressStatus.NEW_RECORD.NOT_STARTED]: 'not-started',
    [ProgressStatus.NEW_RECORD.ABORTED]: 'aborted',
    [ProgressStatus.NEW_RECORD.PROCESSING]: 'processing'
  }[progress.status];

  const alertMessage = (() => {
    if (progress.status === ProgressStatus.NEW_RECORD.SENDING) {
      return (
        <AlertMessage type="transparent">
          {t('new_record_footer_alert_sending')}
        </AlertMessage>
      );
    } 
    if (progress.status === ProgressStatus.NEW_RECORD.PROCESSING || progress.status === ProgressStatus.NEW_RECORD.SENDING_SUBTITLES || progress.status === ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER) {
        return (
          <AlertMessage type="transparent">
          {t('new_record_footer_alert_processing')}
          </AlertMessage>
        );
    }
    return <></>;
  })();

  const processingProgressBarProps = progress.status === ProgressStatus.NEW_RECORD.PROCESSING || progress.status === ProgressStatus.NEW_RECORD.SENDING_SUBTITLES || progress.status === ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER ? {
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
