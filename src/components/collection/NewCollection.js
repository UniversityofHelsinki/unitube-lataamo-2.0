import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCollection.css';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import useCollectionModification from '../../hooks/useCollectionModification';
import FormDialog from '../dialog/FormDialog';
import CollectionName from './name/CollectionName';
import CollectionDescription from './description/CollectionDescription';
import CollectionPublicity from './publicity/CollectionPublicity';
import CollectionManagementRights from './management-rights/CollectionManagementRights';
import useUser from '../../hooks/useUser';
import CollectionMoodleCourses from './moodle-courses/CollectionMoodleCourses';
import NewCollectionFooter from './NewCollectionFooter';
import useCollectionSave from '../../hooks/collection/useCollectionSave';
import { ProgressStatus } from '../../Constants';
import useCollectionValidation from '../../hooks/validation/collection/useCollectionValidation';

const NewCollection = () => {
  const { t } = useTranslation();
  const [user] = useUser();
  const [showForm, setShowForm] = useState(false);
  const [progress, save, resetProgress] = useCollectionSave();
  const [isValid, messages, validate] = useCollectionValidation([
    'title', 'description', 'published',
  ]);

  const defaultPersons = [user.eppn];
  const emptyCollection = {
    identifier: '',
    title: '',
    description: '',
    iamgroups: [],
    persons: defaultPersons,
    published: '',
    moodleNumbers: []
  };

  const [collection, onChange, modified, undo] = useCollectionModification(
    emptyCollection, validate, resetProgress
  );

  const theButton = (
    <Button 
      variant="primary" 
      className="new-collection-button"
      onClick={() => setShowForm(true)}
    >
      {t('new_collection_button')}
    </Button>
  );

  const saveInProgress = progress.status === ProgressStatus.NEW_COLLECTION.SENDING;
  const errorOccurred = progress.status === ProgressStatus.NEW_COLLECTION.ERROR;
  const savingDone = progress.status == ProgressStatus.NEW_COLLECTION.DONE;
  const fieldsDisabled = saveInProgress || errorOccurred || savingDone;

  const closeButton = { closeButton: true };
  const disabled = isValid;

  const hide = () => {
    undo();
    resetProgress();
    setShowForm(false);
  };

  const tryAgain = save;

  const clearForm = () => { 
    undo(); 
    resetProgress();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (progress.status === ProgressStatus.NEW_COLLECTION.NOT_STARTED) {
      await save(collection);
    } else if (progress.status === ProgressStatus.NEW_COLLECTION.DONE) {
      await clearForm();
    } else if (progress.status === ProgressStatus.NEW_COLLECTION.ERROR) {
      resetProgress();
      await tryAgain(collection);
    }
  };

  return (
    <FormDialog 
      hide={hide} 
      showComponent={theButton} 
      show={showForm}
      size="xl"
    >
      <Modal.Header { ...closeButton }>{t('new_collection_form_header')}</Modal.Header>
      <Form className="new-collection-form ms-3 me-3" onSubmit={onSubmit}>
        <Modal.Body>
          <CollectionName name={collection?.title} onChange={(title) => onChange('title', title)} disabled={fieldsDisabled} message={messages?.title} />
          <CollectionDescription description={collection?.description} onChange={(description) => onChange('description', description)} disabled={fieldsDisabled} message={messages?.description} />
          <CollectionPublicity publicity={collection?.published} onChange={(publicity) => onChange('published', publicity)} disabled={fieldsDisabled} messages={messages?.published} />
          <Container>
            <Row>
              <Col>
                <CollectionManagementRights 
                  users={collection?.persons}
                  groups={collection?.iamgroups}
                  onUserChange={(persons) => onChange('persons', persons.length === 0 ? defaultPersons : persons)}
                  onGroupChange={(groups) => onChange('iamgroups', groups)}
                  disabled={fieldsDisabled} 
                />
              </Col>
              <Col lg>
                <CollectionMoodleCourses moodleNumbers={collection?.moodleNumbers} onMoodleNumberChange={(moodleNumbers) => onChange('moodleNumbers', moodleNumbers)} disabled={fieldsDisabled} /> 
              </Col>
            </Row>
          </Container>        
        </Modal.Body>
        <Modal.Footer className="ps-0 pe-0">
          <NewCollectionFooter 
            onCancel={hide} 
            progress={progress} 
            isValid={isValid} 
          />
        </Modal.Footer>
      </Form>
    </FormDialog>
  );
};

NewCollection.propTypes = {
};

export default NewCollection;
