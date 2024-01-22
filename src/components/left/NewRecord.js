import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewRecord.css';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormDialog from '../dialog/FormDialog';

const NewRecord = () => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);

  const button = (
    <Button className="new-record-button" variant="primary" onClick={() => setShowDialog(true)}>
      {t('new_record_button')}
    </Button>
  );

  return (
    <FormDialog touched={false} closeable={true} showComponent={button} show={showDialog} hide={() => setShowDialog(false)}>
      <Modal.Header closeButton>{t('new_record_form_header')}</Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </FormDialog>
  );
};

NewRecord.propTypes = {
};

export default NewRecord;
