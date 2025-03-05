import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MoveRecordsDialog.css';
import { useTranslation } from 'react-i18next';
import useRecordsMove from '../../../../hooks/record/useRecordsMove';
import BulkActionDialog from './BulkActionDialog';
import RecordCollections from '../../../record/RecordCollections';

const MoveRecordsDialog = ({ records = [], openerProps = {} }) => {
  const { t } = useTranslation();

  const [collection, setCollection] = useState(null);
  const [currentState, start, reset] = useRecordsMove(records, collection);
  const defaultOpenerProps = {
    label: t('move_records_dialog_open_button_label'),
    title: t('move_records_dialog_open_button_title'),
    variant: 'primary'
  };

  const recordTableProps = {
    headerLabel: t('move_records_dialog_header'),
    recordsLabel: t('move_records_dialog_records_header')
  };

  const progressBarProps = {
    'not_started': {
      label: '',
      type: ''
    },
    'in_progress': {
      label: t('move_records_dialog_saving'),
      animated: true,
    },
    'done': {
      label: t('move_records_dialog_done'),
      type: 'done'
    },
    'error': {
      label: t('move_records_dialog_error'),
      type: 'error'
    }
  };

  const alreadyInDestination = (record) =>
    record.is_part_of === collection

  const allRecordsInDestination = 
    records.every(alreadyInDestination) && records.length > 0;

  return (
    <BulkActionDialog
      records={records}
      openerProps={{ ...defaultOpenerProps, ...openerProps }}
      recordsTableProps={recordTableProps}
      currentState={currentState}
      start={start}
      resetState={reset}
      closeable={currentState !== 'in_progress'}
      submittable={collection && !allRecordsInDestination}
      progressBarProps={progressBarProps}
    >
      <RecordCollections
        collection={collection}
        onChange={(collection) => setCollection(collection)}
        message={null}
        disabled={currentState === 'in_progress'} 
        showLink={false}
      />
    </BulkActionDialog>
  );

};

MoveRecordsDialog.propTypes = {
};

export default MoveRecordsDialog;
