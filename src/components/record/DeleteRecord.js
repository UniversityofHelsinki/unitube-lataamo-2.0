import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ReactComponent as DeleteIcon} from '../../components/utilities/icons/trash.svg';
import './DeleteRecord.css';
import RecordCardAction from './card/RecordCardAction';
import {useTranslation} from 'react-i18next';
import FormDialog from '../dialog/FormDialog';
import {Col, Container, Form, Modal, Row} from 'react-bootstrap';
import DeleteRecordFooter from './DeleteRecordFooter';
import useRecordDelete from '../../hooks/record/useRecordDelete';
import ElementHeader from '../form/ElementHeader';
import HelpDialog from '../dialog/HelpDialog';
import {ProgressStatus} from '../../Constants';
import useDeletedRecords from '../../hooks/useDeletedRecords';
import useRecord from '../../hooks/useRecord';
import useCollections from '../../hooks/useCollections';
import useCollection from '../../hooks/useCollection';
import useVisibleRecords from '../../hooks/useVisibleRecords';
import useUser from "../../hooks/useUser";

const DeleteRecord = ({ record, showLabel = true, reloadCollectionOnRemove = false, buttonDisabled = false }) => {
  const [user] = useUser();
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [deleteRecord, progress, resetProgress] = useRecordDelete();
  const [_collections, _loadingCollections, reloadCollections] = useCollections();
  const [_visibleCollection, _loadingCollection, reloadCollection] = useCollection();
  const [_records, _loadingRecords, reloadRecords] = useVisibleRecords({});
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

  const button = (
    <RecordCardAction
      icon={<DeleteIcon />}
      label={t('record_card_action_delete')}
      title={t('record_card_action_delete_title')}
      ariaLabel={t(
        'record_card_action_delete_aria',
        { title: record.title }
      )}
      onClick={show}
      showLabel={showLabel}
      variant={showLabel ? 'danger' : 'link'}
      disabled={buttonDisabled}
      opensDialog={true}
    />
  );

  const onSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteRecord(record);
  };

  const closeable = progress.status !== ProgressStatus.RECORD_DELETE.IN_PROGRESS;

  const hasOtherContributors = (contributors, userEppn) => {
    // Filter the contributors array to remove the given user's eppn
    const others = contributors.filter(contributorEppn => contributorEppn !== userEppn);
    return others.length > 0;
  };

  const result =
      user  &&
      user.eppn &&
      record && record.contributors &&
      Array.isArray(record.contributors)
          ? hasOtherContributors(record.contributors, user.eppn)
          : false;

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
                  <ElementHeader 
                    helpDialog={(
                      <HelpDialog label={t('delete_record_form_help_header')}>
                        {t('delete_record_form_help_content')}
                      </HelpDialog>
                    )}
                    >
                    {t('delete_record_form_body_header')}
                  </ElementHeader>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="blockquote">{record.title}</span>
                  <div>
                    <span>
                     {result ? t('record_has_other_contributors') : ''}
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <DeleteRecordFooter progress={progress} hide={hide}/>
          </Modal.Footer>
        </Form>
      </FormDialog>
  );
};

DeleteRecord.propTypes = {
  record: PropTypes.object,
  showLabel: PropTypes.bool,
  reloadCollectionOnRemove: PropTypes.bool,
  buttonDisabled: PropTypes.bool
};

export default DeleteRecord;
