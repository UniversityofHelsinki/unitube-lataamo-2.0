import React, { useRef, useState } from 'react';
import './NewRecord.css';
import { Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { addMonths } from 'date-fns';
import FormDialog from '../dialog/FormDialog';
import RecordName from './RecordName';
import RecordDescription from './RecordDescription';
import RecordLicense from './RecordLicense';
import RecordFile from './RecordFile';
import RecordEndDate from './RecordEndDate';
import NewRecordFooter from './NewRecordFooter';
import { ProgressStatus } from '../../Constants';
import RecordSubtitle from './RecordSubtitle';
import useRecordModification from '../../hooks/useRecordModification';
import useNewRecordSave from '../../hooks/record/useNewRecordSave';
import RecordCollections from './RecordCollections';
import useVisibleRecords from '../../hooks/useVisibleRecords';
import useNewRecordValidation from '../../hooks/validation/record/useNewRecordValidation';
import HyButton from '../utilities/HyButton';
import PropTypes from 'prop-types';
import useCollection from '../../hooks/useCollection';
import useCollections from '../../hooks/useCollections';

const emptyRecord = {
  identifier: '',
  title: '',
  description: '',
  license: '',
  selectedSeries: '',
  deletionDate: addMonths(new Date(), 12).toISOString()
};

const NewRecord = ({ selectedSeries = '' }) => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [isValid, messages, validate] = useNewRecordValidation(
    ['file', 'title', 'description', 'license', 'deletionDate', 'subtitles']
  );
  const [send, progress, resetProgress] = useNewRecordSave();
  const [record, onChange, modified, undo] = useRecordModification({ ...emptyRecord, selectedSeries }, validate, resetProgress);
  const [_records, _loadingRecords, reloadRecords] = useVisibleRecords({});
  const [collection, _loadingCollection, reloadCollection] = useCollection();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
  const formRef = useRef();

  const theButton = (
    <HyButton className="new-record-button" variant="primary" onClick={
      () => {
        setShowDialog(true);
      }
    }
    >
      {t('new_record_button')}
    </HyButton>
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await send({ ...record, archivedDate: record.deletionDate }, record.subtitles);
    reloadRecords();
    reloadCollections();
  };

  const reset = async () => {
    await undo();
  };

  const hide = () => {
    reset();
    setShowDialog(false);
    if (record.selectedSeries === collection?.identifier) {
      reloadCollection();
    }
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

  const closeable = progress.status !== ProgressStatus.NEW_RECORD.SENDING && progress.status !== ProgressStatus.NEW_RECORD.SENDING_SUBTITLES;
  const closeButton = closeable ? { closeButton: true } : {};

  const disabled = {
    [ProgressStatus.NEW_RECORD.SENDING]: true,
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLES]: true,
    [ProgressStatus.NEW_RECORD.PROCESSING_SUBTITLES]: true,
    [ProgressStatus.NEW_RECORD.SENDING_SUBTITLE_ORDER]: true,
    [ProgressStatus.NEW_RECORD.PROCESSING]: true,
    [ProgressStatus.NEW_RECORD.ERROR]: true,
    [ProgressStatus.NEW_RECORD.DONE]: true,
  }[progress.status] || false;

  const touched = modified && progress.status !== ProgressStatus.NEW_RECORD.PROCESSING && progress.status !== ProgressStatus.NEW_RECORD.PROCESSING_SUBTITLES && progress.status !== ProgressStatus.NEW_RECORD.DONE;

  return (
    <FormDialog touched={touched} closeable={closeable} showComponent={theButton} show={showDialog} hide={hide}>
      <Modal.Header { ...closeButton }>{t('new_record_form_header')}</Modal.Header>
      <Form className="new-record-form" onSubmit={onSubmit} ref={formRef}>
        <Modal.Body>
            <RecordFile onChange={(file) => onChange('file', file)} message={messages.file} disabled={disabled} />
            <RecordName name={record.title} message={messages.title} onChange={(title) => onChange('title', title)} disabled={disabled} />
            <RecordDescription message={messages.description} onChange={(description) => onChange('description', description)} description={record.description} disabled={disabled} />
            <RecordLicense license={record.license} aria-label={t('new_record_license_label')} onChange={(license) => onChange('license', license)} message={messages.license} disabled={disabled} />
            <RecordEndDate endDate={record.deletionDate} onChange={(date) => onChange('deletionDate', date)} message={messages.deletionDate} disabled={disabled} />
            <RecordCollections collection={record.selectedSeries} onChange={(collection) => onChange('selectedSeries', collection)} message={messages.selectedSeries} disabled={disabled} showLink={false} />
            <RecordSubtitle onChange={(subtitles) => onChange('subtitles', subtitles)} subtitles={record.subtitles} disabled={disabled} message={messages.subtitles} />
        </Modal.Body>
        <Modal.Footer>
          <NewRecordFooter onCancel={hide} progress={progress} isValid={isValid} onClick={onProgressButtonClick} />
        </Modal.Footer>
      </Form>
    </FormDialog>
  );
};

NewRecord.propTypes = {
  selectedSeries: PropTypes.string
};

export default NewRecord;
