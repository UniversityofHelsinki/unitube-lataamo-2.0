import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MoveRecordsDialog.css';
import { useTranslation } from 'react-i18next';
import useRecordsMove from '../../../../hooks/record/useRecordsMove';
import BulkActionDialog from './BulkActionDialog';
import RecordCollections from '../../../record/RecordCollections';

const MoveRecordsDialog = ({ records = [] }) => {
  const { t } = useTranslation();

  const [collection, setCollection] = useState(null);
  const [currentState, start, reset] = useRecordsMove(records, collection);
  const openerProps = {
    label: t('move_records_dialog_open_button_label'),
    variant: 'warning'
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

  return (
    <BulkActionDialog
      records={records}
      openerProps={openerProps}
      recordsTableProps={recordTableProps}
      currentState={currentState}
      start={start}
      resetState={reset}
      closeable={currentState !== 'in_progress'}
      submittable={collection && collection !== records[0]?.is_part_of}
      progressBarProps={progressBarProps}
    >
      <RecordCollections
        collection={collection || records[0]?.is_part_of}
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
