import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RecordsTableDialog.css';
import FormDialog from '../../dialog/FormDialog';
import RecordsTable from '../../record/RecordsTable';
import { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import ElementHeader from '../../form/ElementHeader';

const RecordsTableDialog = ({ 
  records = [], 
  children = [],
  show,
  hide,
  opener,
  closeable,
  headerLabel = '',
  recordsLabel = '',
  footer = <></>
}) => {
  const dialogContainerRef = useRef();

  return (
    <FormDialog 
      hide={() => hide()} 
      show={show} 
      showComponent={opener}
      closeable={closeable}
    >
      <Modal.Header closeButton={closeable}>
        <span>{headerLabel}</span>
      </Modal.Header>
      <Modal.Body>
        <div className="records-table-dialog">
          <div ref={dialogContainerRef} className="records-table-dialog-table">
            <ElementHeader label={recordsLabel}>
              {recordsLabel}
            </ElementHeader>
            <RecordsTable 
              containerRef={dialogContainerRef}
              records={records}
              selectedRecords={records.map((_r, i) => i)}
              disabled={true}
              onSelect={() => {}}
              copyVisible={false}
            />
          </div>
          <div className="records-table-dialog-content">
            {children}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </FormDialog>
  );
};

RecordsTableDialog.propTypes = {
  records: PropTypes.array,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default RecordsTableDialog;
