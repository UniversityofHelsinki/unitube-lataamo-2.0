import React from 'react';
import PropTypes from 'prop-types';
import './RestoreRecordFooter.css';
import { ProgressStatus } from '../../Constants';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';
import AlertMessage from '../utilities/AlertMessage';
import HyButton from '../utilities/HyButton';

const RestoreRecordFooter = ({ progress, hide }) => {
  const { t } = useTranslation();

  const progressBarLabel = {
    [ProgressStatus.RECORD_RESTORE.NOT_STARTED]: '',
    [ProgressStatus.RECORD_RESTORE.IN_PROGRESS]: t('restore_record_footer_in_progress'),
    [ProgressStatus.RECORD_RESTORE.DONE]: t('restore_record_footer_done'),
    [ProgressStatus.RECORD_RESTORE.ERROR]: progress.message || t('restore_record_footer_error')
  }[progress.status];

  const animated = progress.status === ProgressStatus.RECORD_RESTORE.IN_PROGRESS;

  const progressBarType = {
    [ProgressStatus.RECORD_RESTORE.DONE]: 'done',
    [ProgressStatus.RECORD_RESTORE.ERROR]: 'error',
  }[progress.status] || '';

  const alertMessage = {
    [ProgressStatus.RECORD_RESTORE.DONE]: (
      <AlertMessage type="transparent" slim={true}>
        {t('restore_record_footer_done_alert')}
      </AlertMessage>
    )
  }[progress.status] || <></>;

  const progressBarProps = {
    label: progressBarLabel,
    now: progress.percentage,
    animated,
    alertMessage,
    type: progressBarType
  };

  const restoreInProgress = progress.status === ProgressStatus.RECORD_RESTORE.IN_PROGRESS;
  const restoreDone = progress.status === ProgressStatus.RECORD_RESTORE.DONE;
  const restoreError = progress.status === ProgressStatus.RECORD_RESTORE.ERROR;

  const cancelButtonLabel =  {
    [ProgressStatus.RECORD_RESTORE.DONE]: t('restore_record_footer_close_button'),
    [ProgressStatus.RECORD_RESTORE.IN_PROGRESS]: t('restore_record_footer_cancel_button'),
    [ProgressStatus.RECORD_RESTORE.ERROR]: t('restore_record_footer_cancel_button'),
    [ProgressStatus.RECORD_RESTORE.NOT_STARTED]: t('restore_record_footer_cancel_button')
  }[progress.status]

  const submitButtonLabel = (() => {
    if (restoreError) {
      return t('restore_record_footer_error_button');
    }
    return t('restore_record_footer_save_button');
  })();

  return (
    <div className="restore-record-footer">
      {(restoreInProgress || restoreDone || restoreError) && 
      <div className="restore-record-footer-progress-bar">
        <ProgressBar { ...progressBarProps } />
      </div>}
      <div className="restore-record-footer-buttons">
        <HyButton variant="secondary" onClick={hide} disabled={restoreInProgress}>
          {cancelButtonLabel}
        </HyButton>
        <HyButton variant="primary" type="submit" disabled={restoreInProgress || restoreDone}>
          {submitButtonLabel}
        </HyButton>
      </div>
    </div>
  );
};

RestoreRecordFooter.propTypes = {
  progress: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(ProgressStatus.RECORD_RESTORE)),
    percentage: PropTypes.number
  }),
  hide: PropTypes.func
};

export default RestoreRecordFooter;
