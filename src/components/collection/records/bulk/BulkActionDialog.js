import React from 'react';
import PropTypes from 'prop-types';
import './BulkActionDialog.css';
import RecordsTableDialog from '../RecordsTableDialog';
import Footer from './Footer';
import { useState } from 'react';
import useCollection from '../../../../hooks/useCollection';
import useCollections from '../../../../hooks/useCollections';
import useRecords from '../../../../hooks/useRecords';
import { Button } from 'react-bootstrap';

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


  const hide = () => {
    if (currentState === 'done') {
      reloadCollection();
      reloadCollections();
      reloadRecords();
    }

    resetState();
    setShow(false);
  };

  const open = () => setShow(true);
  const opener = (<Button onClick={open} variant={openerProps.variant}>
    {openerProps.label}
  </Button>);

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
      {children}
    </RecordsTableDialog>
  );
};

BulkActionDialog.propTypes = {
};

export default BulkActionDialog;