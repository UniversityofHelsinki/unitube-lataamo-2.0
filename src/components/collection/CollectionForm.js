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

const CollectionForm = () => {
  const [originalCollection, loading, reload] = useCollection();
  const [progress, update, resetProgress] = useCollectionUpdate();
  const [isValid, messages, validate] = useCollectionValidation(['title', 'description']);
  const [collection, onChange, modified, undo] = useCollectionModification(originalCollection, validate);

  const users = collection?.persons || [];

  const groups = collection?.iamgroups || [];

  const saveCollection = async (event) => {
    event.preventDefault();
    await update(collection);
    reload();
  };

  const disabled = !['NOT_STARTED', 'DONE'].includes(progress.status);

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
                <Row className="mb-3">
                  <Col className="ps-1">
                    <CollectionRecords records={collection?.eventColumns || []} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="ps-1">
                      <CollectionName 
                          name={collection?.title} 
                          onChange={(title) => onChange('title', title)}
                          message={messages.title}
                          disabled={disabled}
                      />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="ps-1">
                      <CollectionDescription 
                        description={collection?.description} 
                        onChange={(description) => onChange('description', description)}
                        message={messages.description}
                        disabled={disabled}
                      />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="ps-1">
                      <CollectionPublicity 
                        publicity={collection?.published}
                        onChange={(publicity) => onChange('published', publicity)}
                        message={messages.publicity}
                        disabled={disabled}
                      />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col className="ps-1">
                    <CollectionManagementRights 
                      users={users} 
                      groups={groups}
                      onUserChange={(users) => onChange('persons', users)}
                      onGroupChange={(groups) => onChange('iamgroups', groups)}
                      disabled={disabled}
                    />
                  </Col>
                  <Col>
                    <CollectionMoodleCourses 
                      moodleNumbers={collection?.moodleNumbers} 
                      onMoodleNumberChange={(moodleNumbers) => onChange('moodleNumbers', moodleNumbers)}
                      disabled={disabled}
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
              disabled={disabled}
              isValid={isValid}
              undo={undo} />
          </Col>
        </Row>
      </Container>
    </form>
  );
};

CollectionForm.propTypes = {
};

export default CollectionForm;
