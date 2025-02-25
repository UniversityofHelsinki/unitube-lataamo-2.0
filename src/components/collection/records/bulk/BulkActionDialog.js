import React from 'react';
import PropTypes from 'prop-types';
import './BulkActionDialog.css';
import RecordsTableDialog from '../RecordsTableDialog';
import Footer from './Footer';
import { useState } from 'react';
import useCollection from '../../../../hooks/useCollection';
import useCollections from '../../../../hooks/useCollections';
import useRecords from '../../../../hooks/useRecords';
import HyButton from '../../../utilities/HyButton';
import useRecord from '../../../../hooks/useRecord';
import useAllRecords from '../../../../hooks/useAllRecords';

const BulkActionDialog = ({
  records,
  openerProps,
  recordsTableProps,
  progressBarProps,
  resetState,
  currentState,
  start,
  children,
  closeable,
  submittable,
}) => {
  const [show, setShow] = useState(false);
  const [_collection, _loading, reloadCollection] = useCollection();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
  const [_records, _loadingRecords, reloadRecords] = useRecords();
  const [_allRecords, _loadingAllRecords, reloadAllRecords] = useAllRecords();
  const [_record, _loadingRecord, reloadRecord] = useRecord();

  const hide = () => {
    if (currentState === 'done') {
      reloadCollection();
      reloadCollections();
      reloadRecords();
      reloadAllRecords();
      reloadRecord();
    }

    resetState();
    setShow(false);
  };

  const open = () => setShow(true);
  const opener = (
    <HyButton 
      onClick={open}
      aria-haspopup="dialog"
      variant={openerProps.variant}
      title={openerProps.title}
      mini={openerProps.mini}
      disabled={records.length === 0 || openerProps.disabled}>
      {openerProps.label}
    </HyButton>
  );

  const save = async () => {
    await start();
  };

  return (
    <RecordsTableDialog
      show={show}
      hide={hide}
      open={open}
      closeable={closeable}
      records={records}
      opener={opener}
      headerLabel={recordsTableProps.headerLabel}
      recordsLabel={recordsTableProps.recordsLabel}
      footer={<Footer
        progress={currentState}
        progressBarProps={(progressBarProps || {})[currentState]}
        onSave={save}
        onCancel={hide}
        submittable={submittable}
      />}
    >
      {records.length > 0 && children}
    </RecordsTableDialog>
  );
};

BulkActionDialog.propTypes = {
};

export default BulkActionDialog;
