import React from 'react';
import PropTypes from 'prop-types';
import './DeleteRecordFooter.css';
import { Button } from 'react-bootstrap';
import { ProgressStatus } from '../../Constants';
import AlertMessage from '../utilities/AlertMessage';
import { useTranslation } from 'react-i18next';
import ProgressBar from '../form/ProgressBar';

const DeleteRecordFooter = ({ progress, hide }) => {
  const { t } = useTranslation();

  const progressBarLabel = {
    [ProgressStatus.RECORD_DELETE.NOT_STARTED]: '',
    [ProgressStatus.RECORD_DELETE.IN_PROGRESS]: t('delete_record_footer_in_progress'),
    [ProgressStatus.RECORD_DELETE.DONE]: t('delete_record_footer_done'),
    [ProgressStatus.RECORD_DELETE.ERROR]: progress.message || t('delete_record_footer_error')
  }[progress.status] || '';

  const progressBarType = {
    [ProgressStatus.RECORD_DELETE.DONE]: 'done',
    [ProgressStatus.RECORD_DELETE.ERROR]: 'error',
  }[progress.status] || '';

  const alertMessage = {
    [ProgressStatus.RECORD_DELETE.DONE]: (
      <AlertMessage type="transparent" slim={true}>
        {t('delete_record_footer_done_alert')}
      </AlertMessage>
    )
  }[progress.status] || <></>;

  const progressBarProps = {
    label: progressBarLabel,
    now: progress.percentage,
    animated: progress.status === ProgressStatus.RECORD_DELETE.IN_PROGRESS,
    alertMessage,
    type: progressBarType
  };

  const cancelButtonLabel =  {
    [ProgressStatus.RECORD_DELETE.DONE]: t('delete_record_footer_close_button'),
    [ProgressStatus.RECORD_DELETE.IN_PROGRESS]: t('delete_record_footer_cancel_button'),
    [ProgressStatus.RECORD_DELETE.ERROR]: t('delete_record_footer_cancel_button'),
    [ProgressStatus.RECORD_DELETE.NOT_STARTED]: t('delete_record_footer_cancel_button')
  }[progress.status]

  const deleteInProgress = progress.status === ProgressStatus.RECORD_DELETE.IN_PROGRESS;
  const deleteDone = progress.status === ProgressStatus.RECORD_DELETE.DONE;
  const deleteError = progress.status === ProgressStatus.RECORD_DELETE.ERROR;

  return (
    <div className="delete-record-footer">
      {(deleteInProgress || deleteDone || deleteError) &&
      <div className="delete-record-footer-progress-bar">
        <ProgressBar { ...progressBarProps } />
      </div>}
      <div className="delete-record-footer-buttons">
        <Button variant="outline-secondary" onClick={hide} disabled={deleteInProgress}>
          {cancelButtonLabel}
        </Button>
        <Button variant="danger" type="submit" className={(deleteInProgress || deleteDone) ? "delete-record-footer-buttons-hide" : "" } >
          {t('delete_record_footer_submit_button')}
        </Button>
      </div>
    </div>
  );
};

DeleteRecordFooter.propTypes = {
  progress: PropTypes.shape({
    status: PropTypes.oneOf(Object.values(ProgressStatus.RECORD_DELETE)),
    percentage: PropTypes.number,
  }),
  hide: PropTypes.func
};

export default DeleteRecordFooter;
