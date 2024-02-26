import React, { useRef, useState } from 'react';
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
import useUploadRecord from '../../hooks/useUploadRecord';
import NewRecordFooter from './NewRecordFooter';
import { ProgressStatus } from '../../Constants';
import useRecords from '../../hooks/useRecords';

const emptyRecord = {
  title: '',
  description: '',
  license: '',
  deletionDate: addMonths(new Date(), 12).toISOString()
};

const NewRecord = () => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [record, setRecord] = useState({ ...emptyRecord });
  const [isValid, messages, validate] = useRecordValidation(
    ['file', 'title', 'description', 'license', 'deletionDate']
  );
  const [send, progress, resetProgress] = useUploadRecord();
  const [_records, _loadingRecords, reloadRecords] = useRecords({ load: false });
  const [touched, setTouched] = useState(false);
  const formRef = useRef();

  const theButton = (
    <Button className="new-record-button" variant="primary" onClick={
      () => {
        setShowDialog(true);
      }
    }>
      {t('new_record_button')}
    </Button>
  );


  const onSubmit = async (event) => {
    event.preventDefault();
    await send({ ...record, archivedDate: record.deletionDate });
    reloadRecords();
  };

  const onChange = async (what, content) => {
    const modified = { ...record, [what]: content };
    setRecord(modified);
    await validate(modified, record, true);
    if (!touched) {
      setTouched(true);
    }
  };

  const reset = async () => {
    const newRecord = { ...emptyRecord };
    setRecord(newRecord);
    setTouched(false);
    resetProgress();
    await validate(newRecord, record);
  };

  const hide = () => {
    reset();
    setShowDialog(false);
  };

  const onProgressButtonClick = async () => {
    if (progress.status === ProgressStatus.NEW_RECORD.DONE) {
      if (formRef.current) {
        formRef.current.reset();
      }
      await reset();
    } else if (progress.status === ProgressStatus.NEW_RECORD.ERROR) {
      await send(record);
    }
  };

  const closeable = progress.status !== ProgressStatus.NEW_RECORD.SENDING;
  const closeButton = closeable ? { closeButton: true } : {};

  const disabled = {
    [ProgressStatus.NEW_RECORD.SENDING]: true,
    [ProgressStatus.NEW_RECORD.PROCESSING]: true,
    [ProgressStatus.NEW_RECORD.DONE]: true,
  }[progress.status] || false;

  return (
    <FormDialog touched={touched} closeable={closeable} showComponent={theButton} show={showDialog} hide={hide}>
      <Modal.Header { ...closeButton }>{t('new_record_form_header')}</Modal.Header>
      <Form className="new-record-form" onSubmit={onSubmit} ref={formRef}>
        <Modal.Body>
            <RecordFile onChange={(file) => onChange('file', file)} message={messages.file} disabled={disabled} />
            <RecordName name={record.title} message={messages.title} onChange={(title) => onChange('title', title)} disabled={disabled} />
            <RecordDescription message={messages.description} onChange={(description) => onChange('description', description)} description={record.description} disabled={disabled} />
            <RecordLicense license={record.license} aria-label={t('new_record_license_label')} onChange={(license) => onChange('license', license)} message={messages.license} disabled={disabled} />
            <RecordEndDate endDate={record.deletionDate} onChange={(date) => onChange('deletionDate', (date || new Date()).toISOString())} message={messages.deletionDate} disabled={disabled} />
        </Modal.Body>
        <Modal.Footer>
          <NewRecordFooter onCancel={hide} progress={progress} isValid={touched && isValid} onClick={onProgressButtonClick} />
        </Modal.Footer>
      </Form>
    </FormDialog>
  );
};

NewRecord.propTypes = {
};

export default NewRecord;
