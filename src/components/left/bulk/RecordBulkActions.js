import React from 'react';
import PropTypes from 'prop-types';
import './RecordBulkActions.css';
import DeleteRecordsDialog from '../../collection/records/bulk/DeleteRecordsDialog';
import { useTranslation } from 'react-i18next';

const RecordBulkActions = ({ records, selectedRecords }) => {
  const { t } = useTranslation();

  const recordsById = records.reduce((previous, current) => ({ [current.identifier]: current, ...previous }), {});

  const input = Array.from(selectedRecords)
    .map(si => recordsById[si])
    .filter(record => record)
    .map(record => ({
      ...record,
      deletion_date: record.deletionDate
    }));

  return (
    <div className="record-bulk-actions">
      <div>
        <DeleteRecordsDialog 
          records={input} 
          openerProps={{
            mini: true,
            label: t('record_bulk_actions_delete_selected', {
              records: records.length,
              selected: input.length
            }),
            disabled: input.length === 0
          }}
        />
      </div>
    </div>
  );
};

RecordBulkActions.propTypes = {
  records: PropTypes.array
};

export default RecordBulkActions;
