import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './DeleteRecordsDialog.css';
import { useTranslation } from 'react-i18next';
import useRecordsDelete from '../../../../hooks/record/useRecordsDelete';
import BulkActionDialog from './BulkActionDialog';
import useUser from "../../../../hooks/useUser";
import AlertBanner from "../../../utilities/AlertBanner";

const DeleteRecordsDialog = ({ records = [], openerProps = {} }) => {
  const { t } = useTranslation();
  const [user] = useUser();
  const [currentState, startDeleting, reset, failures] = useRecordsDelete(records);

  const defaultOpenerProps = {
    label: t('delete_records_dialog_open_button_label'),
    title: t('delete_records_dialog_open_button_title'),
    variant: 'danger',
    mini: false
  };

  const tableProps = {
    headerLabel: t('delete_records_dialog_header'),
    recordsLabel: t('delete_records_dialog_records_header'),
  };

  const progressBarProps = {
    'not_started': {
      label: '',
      type: '',
    },
    'in_progress': {
      label: 'delete_records_dialog_saving',
      type: '',
      animated: true,
    },
    'done': {
      label: 'delete_records_dialog_done',
      type: 'done',
    },
    'error': {
      label: 'delete_records_dialog_error',
      type: 'error',
      alertMessage: t('delete_records_following_records', { failures: (failures || []).map(f => f.title).join(', ')})
    }
  };

  const otherContributors = records
      .flatMap(record => record.contributors)
      .some(contributor => contributor !== user.eppn);

  return (
    <BulkActionDialog
      records={records}
      openerProps={{ ...defaultOpenerProps, ...openerProps }}
      recordsTableProps={tableProps}
      resetState={reset}
      start={startDeleting}
      currentState={currentState}
      closeable={currentState !== 'in_progress'}
      progressBarProps={progressBarProps}
      submittable={true}
    >
      <div className="delete-records-dialog-content">
        <div className="delete-records-dialog-alert-text">
          {t('delete_records_dialog_alert_text')}
        </div>
        {otherContributors
        ? <AlertBanner body={t('selected_records_has_other_contributors')} />
        : null}
      </div>
    </BulkActionDialog>
  );
};

DeleteRecordsDialog.propTypes = {
  records: PropTypes.arrayOf(PropTypes.object),
  openerProps: PropTypes.object
};

export default DeleteRecordsDialog;
