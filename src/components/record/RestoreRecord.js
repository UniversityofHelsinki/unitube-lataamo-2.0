import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RestoreRecord.css';
import RecordCardAction from './card/RecordCardAction';
import { ReactComponent as RestoreIcon } from '../../components/utilities/icons/rotate-left.svg';
import FormDialog from '../dialog/FormDialog';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal } from 'react-bootstrap';
import RecordCollections from './RecordCollections';
import useDefaultCollection from '../../hooks/record/useDefaultCollection';
import useRecordRestore from '../../hooks/record/useRecordRestore';
import useModification from '../../hooks/useModification';
import RestoreRecordFooter from './RestoreRecordFooter';
import { ProgressStatus } from '../../Constants';
import useRecords from '../../hooks/useRecords';
import useCollections from '../../hooks/useCollections';
import useRecord from '../../hooks/useRecord';

const RestoreRecord = ({ record }) => {
  const { t } = useTranslation();
  const defaultCollection = useDefaultCollection();
  const [restore, progress, resetProgress] = useRecordRestore();
  const [modifiedRecord, onChange, _modified, undo] = useModification(
    record, 
    null, 
    resetProgress
  );
  const [_records, _loadingRecords, reloadRecords] = useRecords(false);
  const [visibleRecord, _loadingRecord, reloadVisibleRecord] = useRecord();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
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
    }

  }

  const iconProps = {
    width: '16px',
    height: '16px'
  };

  const button = (
    <RecordCardAction 
      icon={<RestoreIcon { ...iconProps } />}
      label={t('record_card_action_restore')}
      onClick={show}
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
};

export default RestoreRecord;
