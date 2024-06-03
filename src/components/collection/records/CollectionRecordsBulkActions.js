import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecordsBulkActions.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DeleteRecordsDialog from './bulk/DeleteRecordsDialog';
import MoveRecordsDialog from './bulk/MoveRecordsDialog';

const CollectionRecordsBulkActions = ({ 
  records = [], 
  selectedRecords = [] 
}) => {
  const { t } = useTranslation();

  const count = <span>{selectedRecords.length}/{records.length}</span>;

  const actions = [
    <MoveRecordsDialog records={selectedRecords.map(si => records[si])} />,
    <DeleteRecordsDialog records={selectedRecords.map(si => records[si])} />
  ];

  return (
    <div className="collection-records-bulk-actions">
      {count}
      <ul>
        {actions.map((action, i) => (
          <li key={i}>
            {action}
          </li>
        ))}
      </ul>
    </div>
  );
};

CollectionRecordsBulkActions.propTypes = {
  records: PropTypes.array,
  selectedRecords: PropTypes.array
};

export default CollectionRecordsBulkActions;
