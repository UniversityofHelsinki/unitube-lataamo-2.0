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

const DeleteRecord = ({ record }) => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [deleteRecord, progress, resetProgress] = useRecordDelete();
  const [_records, _loadingRecords, reloadRecords] = useRecords({
    load: false
  });
  const [_deletedRecords, _loadingDeletedRecords, reloadDeletedRecords] = useDeletedRecords();

  const hide = () => {
    setShowForm(false);
    resetProgress();
    if (progress.status === ProgressStatus.RECORD_DELETE.DONE) {
      reloadRecords();
      reloadDeletedRecords();
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
    />
  );

  const onSubmit = async (event) => {
    event.preventDefault();
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
};

export default DeleteRecord;
