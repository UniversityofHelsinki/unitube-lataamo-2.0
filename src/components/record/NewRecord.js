import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewRecord.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addMonths } from 'date-fns';
import FormDialog from '../dialog/FormDialog';
import RecordName from './RecordName';
import RecordDescription from './RecordDescription';
import RecordLicense from './RecordLicense';
import RecordFile from './RecordFile';
import useRecordValidation from '../../hooks/validation/record/useRecordValidation';
import RecordEndDate from './RecordEndDate';

const SaveButton = ({ onClick, disabled, label }) => {
  return <Button variant="primary" onClick={onClick} disabled={disabled}>{label}</Button>;
};

const CancelButton = ({ onClick, disabled, label }) => {
  return <Button variant="outline-secondary" onClick={onClick} disabled={disabled}>{label}</Button>
};

const emptyRecord = {
  title: '',
  description: '',
  license: '',
  deletionDate: addMonths(new Date(), 6).toISOString()
};

const NewRecord = () => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [record, setRecord] = useState({ ...emptyRecord });
  const [isValid, messages, validate] = useRecordValidation(
    ['file', 'title', 'description', 'license', 'deletionDate']
  );
  const [touched, setTouched] = useState(false);

  const onChange = async (what, content) => {
    const modified = { ...record, [what]: content };
    setRecord(modified);
    await validate(modified);
    if (!touched) {
      setTouched(true);
    }
  };

  const theButton = (
    <Button className="new-record-button" variant="primary" onClick={
      () => {
        setShowDialog(true);
      }
    }>
      {t('new_record_button')}
    </Button>
  );

  const hide = () => {
    setShowDialog(false);
    setTouched(false);
    setRecord({ ...emptyRecord });
  };

  return (
    <FormDialog touched={touched} closeable={true} showComponent={theButton} show={showDialog} hide={hide}>
      <Modal.Header closeButton>{t('new_record_form_header')}</Modal.Header>
      <Modal.Body>
        <Form className="new-record-form">
          <RecordFile onChange={(file) => onChange('file', file)} message={messages.file} />
          <RecordName name={record.title} message={messages.title} onChange={(title) => onChange('title', title)} />
          <RecordDescription message={messages.description} onChange={(description) => onChange('description', description)} />
          <RecordLicense license={record.license} aria-label={t('new_record_license_label')} onChange={(license) => onChange('license', license)} message={messages.license} />
          <RecordEndDate endDate={record.deletionDate} onChange={(date) => onChange('deletionDate', (date || new Date()).toISOString())} message={messages.deletionDate} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CancelButton onClick={hide} disabled={false} label={t('new_record_cancel_button_label')} />
        <SaveButton onClick={console.log} disabled={!isValid} label={t('new_record_save_button_label')} />
      </Modal.Footer>
    </FormDialog>
  );
};

NewRecord.propTypes = {
};

export default NewRecord;
