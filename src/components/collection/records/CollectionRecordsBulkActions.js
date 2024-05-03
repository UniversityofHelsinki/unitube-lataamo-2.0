import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecordsBulkActions.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CollectionRecordsBulkActions = ({ 
  records = [], 
  selectedRecords = [] 
}) => {
  const { t } = useTranslation();

  const count = <span>{selectedRecords.length}/{records.length}</span>;

  const actions = [
    <Button variant="warning" disabled>
      {t('collection_records_bulk_actions_move')}
    </Button>,
    <Button variant="danger" disabled>
      {t('collection_records_bulk_actions_delete')}
    </Button>
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
