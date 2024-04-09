import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CollectionForm.css';
import useCollection from '../../hooks/useCollection';
import Loading from '../utilities/Loading';
import CollectionManagementRights from './management-rights/CollectionManagementRights';
import CollectionName from "./name/CollectionName";
import CollectionDescription from "./description/CollectionDescription";
import CollectionPublicity from "./publicity/CollectionPublicity";
import useCollectionValidation from '../../hooks/validation/collection/useCollectionValidation';
import CollectionsBreadCrumb from "../form/CollectionsBreadCrumb";
import CollectionMoodleCourses from "./moodle-courses/CollectionMoodleCourses";
import CollectionRecords from './records/CollectionRecords';
import CollectionBottomBar from './CollectionBottomBar';
import useCollectionModification from '../../hooks/useCollectionModification';
import useCollectionUpdate from '../../hooks/collection/useCollectionUpdate';
import { ProgressStatus } from '../../Constants';
import CollectionButtons from "./CollectionButtons";
import useTitle from '../../hooks/useTitle';
import useCollectionError from '../../hooks/useCollectionError';

const CollectionForm = () => {
  const [setTitle] = useTitle();
  const [originalCollection, loading, reload, httpError] = useCollection(true);
  const errorPage = useCollectionError(httpError);
  const [progress, update, resetProgress] = useCollectionUpdate();
  const [isValid, messages, validate] = useCollectionValidation(['title', 'description']);
  const [collection, onChange, modified, undo] = useCollectionModification(originalCollection, validate, resetProgress);

  if (errorPage && !loading) {
    return errorPage;
  }

  if (originalCollection?.title) {
    setTitle(originalCollection.title);
  }

  const users = collection?.persons || [];

  const groups = collection?.iamgroups || [];

  const saveCollection = async (event) => {
    event.preventDefault();
    await update(collection, modified);
    reload();
  };

  const saveInProgress = ![
    ProgressStatus.COLLECTION_SAVE.NOT_STARTED, 
    ProgressStatus.COLLECTION_SAVE.DONE
  ].includes(progress.status);

  const undoChanges = () => {
    resetProgress();
    undo();
  };

  return (
    <form onSubmit={saveCollection}>
      <Container className="collection-container">
          <Row className="collection-form-row">
            <Loading loading={loading}>
            <Col>
              <Container className="collection-form ps-0">
                <Row className="breadcrumb-container">
                  <Col className="ps-0">
                    <CollectionsBreadCrumb collection={originalCollection || {}} />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="ps-1">
                    <CollectionRecords records={collection?.eventColumns || []} disabled={saveInProgress} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="ps-1">
                    <CollectionButtons
                        collection={collection}
                        disabled={saveInProgress}/>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col className="ps-1">
                      <CollectionName 
                          name={collection?.title} 
                          onChange={(title) => onChange('title', title)}
                          message={messages.title}
                          disabled={saveInProgress}
                      />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="ps-1">
                      <CollectionDescription 
                        description={collection?.description} 
                        onChange={(description) => onChange('description', description)}
                        message={messages.description}
                        disabled={saveInProgress}
                      />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="ps-1">
                      <CollectionPublicity 
                        publicity={collection?.published}
                        onChange={(publicity) => onChange('published', publicity)}
                        message={messages.publicity}
                        disabled={saveInProgress}
                      />
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="ps-1">
                    <CollectionManagementRights 
                      users={users} 
                      groups={groups}
                      onUserChange={(users) => onChange('persons', users)}
                      onGroupChange={(groups) => onChange('iamgroups', groups)}
                      disabled={saveInProgress}
                    />
                  </Col>
                  <Col>
                    <CollectionMoodleCourses 
                      moodleNumbers={collection?.moodleNumbers} 
                      onMoodleNumberChange={(moodleNumbers) => onChange('moodleNumbers', moodleNumbers)}
                      disabled={saveInProgress}
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
            </Loading>
          </Row>
        <Row className="collection-bottom-bar">
          <Col>
            <CollectionBottomBar 
              progress={progress} 
              modified={modified} 
              disabled={saveInProgress}
              isValid={isValid}
              undo={undoChanges} />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

CollectionForm.propTypes = {
};

export default CollectionForm;
