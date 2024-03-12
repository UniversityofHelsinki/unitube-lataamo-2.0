import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DeleteIcon } from '../../components/utilities/icons/trash.svg';
import './DeleteRecord.css';
import RecordCardAction from './card/RecordCardAction';
import { useTranslation } from 'react-i18next';
import FormDialog from '../dialog/FormDialog';
import { Col, Container, Form, Modal, Row } from 'react-bootstrap';
import DeleteRecordFooter from './DeleteRecordFooter';
import useRecordDelete from '../../hooks/record/useRecordDelete';
import ElementHeader from '../form/ElementHeader';
import HelpDialog from '../dialog/HelpDialog';
import { ProgressStatus } from '../../Constants';
import useRecords from '../../hooks/useRecords';
import useDeletedRecords from '../../hooks/useDeletedRecords';
import useRecord from '../../hooks/useRecord';
import useCollections from '../../hooks/useCollections';
import useCollection from '../../hooks/useCollection';

const DeleteRecord = ({ record, showLabel = true, reloadCollectionOnRemove = false, disabled = false }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [deleteRecord, progress, resetProgress] = useRecordDelete();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
  const [_visibleCollection, _loadingCollection, reloadCollection] = useCollection();
  const [_records, _loadingRecords, reloadRecords] = useRecords();
  const [_deletedRecords, _loadingDeletedRecords, reloadDeletedRecords] = useDeletedRecords();
  const [visibleRecord, _loadingVisibleRecord, reloadVisibleRecord] = useRecord();

  const hide = () => {
    setShowForm(false);
    resetProgress();
    if (progress.status === ProgressStatus.RECORD_DELETE.DONE) {
      reloadRecords();
      reloadDeletedRecords();
      reloadCollections();
      if (visibleRecord?.identifier === record.identifier) {
        reloadVisibleRecord();
      }
      if (reloadCollectionOnRemove) {
        reloadCollection();
      }
    }
  };

  const show = () => {
    setShowForm(true);
  };

  const iconProps = {
    width: '16px',
    height: '16px',
    fill: 'var(--hy-blue)'
  };

  const button = (
    <RecordCardAction 
      icon={<DeleteIcon { ...iconProps } />}
      label={t('record_card_action_delete')}
      onClick={show}
      showLabel={showLabel}
      disabled={disabled}
    />
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteRecord(record);
  };

  const closeable = progress.status !== ProgressStatus.RECORD_DELETE.IN_PROGRESS;

  return (
    <FormDialog 
      showComponent={button} 
      show={showForm} 
      hide={hide}
      closeable={closeable}>
      <Modal.Header closeButton={closeable}>
        {t('record_delete_form_header')}
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <ElementHeader label={t('delete_record_form_body_header')}>
                  {t('delete_record_form_body_header')}
                </ElementHeader>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <HelpDialog label={t('delete_record_form_help_header')}>
                  {t('delete_record_form_help_content')}
                </HelpDialog>
              </Col>
            </Row>
            <Row>
              <Col>
                <span className="blockquote">{record.title}</span>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <DeleteRecordFooter progress={progress} hide={hide} />
        </Modal.Footer>
      </Form>
    </FormDialog>
  );
};

DeleteRecord.propTypes = {
  record: PropTypes.object,
  showLabel: PropTypes.bool,
  reloadCollectionOnRemove: PropTypes.bool,
  disabled: PropTypes.bool
};

export default DeleteRecord;
