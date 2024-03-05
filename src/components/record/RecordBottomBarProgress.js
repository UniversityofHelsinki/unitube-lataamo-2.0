import React from 'react';
import PropTypes from 'prop-types';
import './RecordBottomBarProgress.css';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';
import AlertMessage from '../utilities/AlertMessage';
import { ProgressStatus } from '../../Constants';

const RecordBottomBarProgress = ({ progress }) => {
  const { t } = useTranslation();

  const progressLabels = {
    [ProgressStatus.RECORD_SAVE.NOT_STARTED]: '',
    [ProgressStatus.RECORD_SAVE.IN_PROGRESS_RECORD]: t('record_bottom_bar_progress_saving_record'),
    [ProgressStatus.RECORD_SAVE.IN_PROGRESS_SUBTITLES]: t('record_bottom_bar_progress_saving_subtitles'),
    [ProgressStatus.RECORD_SAVE.IN_PROGRESS_ORDERSUBTITLES]: t('record_bottom_bar_progress_ordering_subtitles'),
    [ProgressStatus.RECORD_SAVE.IN_PROGRESS_DELETESUBTITLE]: t('record_bottom_bar_progress_deleting_subtitle'),
    [ProgressStatus.RECORD_SAVE.DONE]: t('record_bottom_bar_progress_done'),
    [ProgressStatus.RECORD_SAVE.ERROR]: progress.message || t('record_bottom_bar_progress_error')
  };

  const progressClass = ({
    [ProgressStatus.RECORD_SAVE.DONE]: 'done',
    [ProgressStatus.RECORD_SAVE.ERROR]: 'error',
  })[progress.status] || '';

  const animated = ![
    ProgressStatus.RECORD_SAVE.DONE,
    ProgressStatus.RECORD_SAVE.ERROR
  ].includes(progress.status) ? { animated: true } : {};

  const alertMessage = (() => {
    if (progress.status === ProgressStatus.RECORD_SAVE.IN_PROGRESS_SUBTITLES || progress.status === ProgressStatus.RECORD_SAVE.IN_PROGRESS_ORDERSUBTITLES) {
      return (
        <AlertMessage type="transparent" slim={true}>
          {t('record_bottom_bar_progress_user_can_close')}
        </AlertMessage>
      );
    }
    return <></>;
  })();

  return (
    <ProgressBar
      type={progressClass}
      now={progress.percentage}
      label={progressLabels[progress.status]}
      alertMessage={alertMessage}
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
