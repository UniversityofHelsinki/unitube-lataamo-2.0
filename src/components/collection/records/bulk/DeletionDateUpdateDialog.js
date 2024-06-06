import React from 'react';
import PropTypes from 'prop-types';
import { addMonths } from 'date-fns';
import './DeletionDateUpdateDialog.css';
import { useTranslation } from 'react-i18next';
import useRecordsDeletionDatesUpdate from '../../../../hooks/record/useRecordsDeletionDatesUpdate';
import BulkActionDialog from './BulkActionDialog';
import { useState } from 'react';
import RecordEndDate from '../../../record/RecordEndDate';
import { DELETION_DATE_MIN_MONTHS } from '../../../../Constants';
import useValidation from '../../../../hooks/validation/useValidation';
import validateDeletionDate from '../../../../hooks/validation/record/deletionDateValidation.js';

const DeletionDateUpdateDialog = ({ records = [] }) => {
  const { t } = useTranslation();

  const [deletionDate, setDeletionDate] = useState(
    addMonths(new Date(), DELETION_DATE_MIN_MONTHS).toISOString()
  );

  const [currentState, startUpdating, reset] = useRecordsDeletionDatesUpdate(records.map(r => ({ identifier: r.identifier, deletionDate })));

  const [
    isValid, 
    validationMessages, 
    validate
  ] = useValidation([{ deletionDate: validateDeletionDate }], ['deletionDate']);

  const openerProps = {
    label: t('update_records_deletion_dates_dialog_open_button_label'),
    title: t('update_records_deletion_dates_dialog_open_button_title'),
    variant: 'primary'
  };

  const recordTableProps = {
    headerLabel: t('update_records_deletion_dates_dialog_header'),
    recordsLabel: t('update_records_deletion_dates_dialog_records_header')
  };

  const progressBarProps = {
    'not_started': {
      label: '',
      type: ''
    },
    'in_progress': {
      label: t('update_records_deletion_dates_dialog_saving'),
      animated: true,
    },
    'done': {
      label: t('update_records_deletion_dates_dialog_done'),
      type: 'done'
    },
    'error': {
      label: t('update_records_deletion_dates_dialog_error'),
      type: 'error'
    }
  };

  const onChange = (deletionDate) => {
    setDeletionDate(deletionDate);
    validate([{ deletionDate }]);
  };

  return (
    <BulkActionDialog
      records={records}
      openerProps={openerProps}
      recordsTableProps={recordTableProps}
      currentState={currentState}
      start={startUpdating}
      resetState={reset}
      closeable={currentState !== 'in_progress'}
      submittable={isValid[0]}
      progressBarProps={progressBarProps}
    >
      <RecordEndDate
        endDate={deletionDate}
        onChange={onChange}
        message={validationMessages[0]?.deletionDate}
        disabled={currentState === 'in_progress'} />
    </BulkActionDialog>
  );
};

DeletionDateUpdateDialog.propTypes = {
  records: PropTypes.array,
};

export default DeletionDateUpdateDialog;

