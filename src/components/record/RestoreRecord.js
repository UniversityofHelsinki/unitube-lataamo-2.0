import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RestoreRecord.css';
import RecordCardAction from './card/RecordCardAction';
import { ReactComponent as RestoreIcon } from '../../components/utilities/icons/rotate-left.svg';
import FormDialog from '../dialog/FormDialog';
import { useTranslation } from 'react-i18next';
import { Form, Modal } from 'react-bootstrap';
import RecordCollections from './RecordCollections';
import useDefaultCollection from '../../hooks/record/useDefaultCollection';
import useRecordRestore from '../../hooks/record/useRecordRestore';
import useModification from '../../hooks/useModification';
import RestoreRecordFooter from './RestoreRecordFooter';
import { ProgressStatus } from '../../Constants';
import useCollections from '../../hooks/useCollections';
import useRecord from '../../hooks/useRecord';
import useCollection from '../../hooks/useCollection';
import useVisibleRecords from '../../hooks/useVisibleRecords';

const RestoreRecord = ({ record, buttonDisabled }) => {
  const { t } = useTranslation();
  const defaultCollection = useDefaultCollection();
  const [restore, progress, resetProgress] = useRecordRestore();
  const [modifiedRecord, onChange, _modified, undo] = useModification(
    record, 
    null, 
    resetProgress
  );
  const [_records, _loadingRecords, reloadRecords] = useVisibleRecords({});
  const [visibleRecord, _loadingRecord, reloadVisibleRecord] = useRecord();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
  const [visibleCollection, _loadingVisibleCollection, reloadVisibleCollection] = useCollection();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (defaultCollection) {
      onChange('isPartOf', defaultCollection.identifier);
    }
  }, [defaultCollection]);

  const show = () => setShowForm(true);

  const hide = () => {
    undo();
    setShowForm(false);
    
    if (progress.status === ProgressStatus.RECORD_RESTORE.DONE) {
      reloadRecords();
      reloadCollections();
      if (visibleRecord?.identifier === record.identifier) {
        reloadVisibleRecord();
      }
      if (visibleCollection?.identifier === modifiedRecord.isPartOf) {
        reloadVisibleCollection();
      }
    }

  }

  const button = (
    <RecordCardAction 
      variant="secondary"
      icon={<RestoreIcon />}
      label={t('record_card_action_restore')}
      title={t('record_card_action_restore_title')}
      ariaLabel={t('record_card_action_restore_aria', { title: record.title })}
      onClick={show}
      opensDialog={true}
      disabled={buttonDisabled}
    />
  );

  const onCollectionChange = (collection) => {
    onChange('isPartOf', collection);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await restore(modifiedRecord);
  };
  
  const formDisabled = progress.status !== ProgressStatus.RECORD_RESTORE.NOT_STARTED;
  const closeable = progress.status !== ProgressStatus.RECORD_RESTORE.IN_PROGRESS;

  return (
    <FormDialog showComponent={button} show={showForm} hide={hide} closeable={closeable}>
      <Modal.Header closeButton={closeable}>
        <span>
          {t('restore_record_header')} <strong>{record.title}</strong>
        </span>
      </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <RecordCollections 
              disabled={formDisabled}
              collection={
                modifiedRecord?.isPartOf || ''
              }
              onChange={onCollectionChange}
              showLink={false}
            />
          </Modal.Body>
          <Modal.Footer>
            <RestoreRecordFooter progress={progress} hide={hide} />
          </Modal.Footer>
        </Form>
    </FormDialog>
  );
};

RestoreRecord.propTypes = {
  buttonDisabled: PropTypes.bool,
  record: PropTypes.object
};

export default RestoreRecord;
