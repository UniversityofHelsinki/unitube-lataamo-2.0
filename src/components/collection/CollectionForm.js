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
import useTitle from '../../hooks/useTitle';
import useCollections from '../../hooks/useCollections';
import useCollectionError from '../../hooks/useCollectionError';
import CollectionActions from "./card/CollectionActions";
import ListReloadButton from '../left/ListReloadButton';
import TopRow from '../right/TopRow';
import useCollectionTags from '../../hooks/collection/useCollectionTags';
import CardTags from '../utilities/CardTags';
import CollectionClipBoardElement from "./CollectionClipBoardElement";

const resolveVisibility = (published, contributors = []) => {
  const visibilities = [];
  if (published === 'ROLE_USER_UNLISTED') {
    visibilities.push('status_unlisted');
  } else if (published === 'ROLE_ANONYMOUS') {
    visibilities.push('status_published');
  } else {
    visibilities.push('status_private');
  }
  if (contributors.some(c => c.startsWith('grp-'))) {
    visibilities.push('status_moodle');
  }
  return visibilities;
};

const CollectionForm = () => {
  const [setTitle] = useTitle();
  const [originalCollection, loading, reload, httpError] = useCollection(true);
  const errorPage = useCollectionError(originalCollection, httpError);
  const [progress, update, resetProgress] = useCollectionUpdate();
  const [_collections, _loading, reloadCollections] = useCollections();
  const [isValid, messages, validate] = useCollectionValidation(['title', 'description']);
  const [collection, onChange, modified, undo] = useCollectionModification(originalCollection, validate, resetProgress);
  const [tags] = useCollectionTags([ { ...originalCollection, visibility: resolveVisibility(originalCollection?.published, originalCollection?.contributors) }]);
  const collectionHasRecords = collection?.eventColumns?.length > 0;

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
    reloadCollections();
  };

  const saveInProgress = ![
    ProgressStatus.COLLECTION_SAVE.NOT_STARTED, 
    ProgressStatus.COLLECTION_SAVE.DONE
  ].includes(progress.status);

  const undoChanges = () => {
    resetProgress();
    undo();
  };

  const breadcrumb = (
    <CollectionsBreadCrumb collection={originalCollection || {}} />
  );

  return (
    <form onSubmit={saveCollection}>
      <Container className="collection-container">
          <Row className="collection-form-row">
            <Loading loading={loading}>
            <Col>
              <Container className="collection-form ps-0">
                <Row className="top-row-container">
                  <Col className="p-0">
                    <TopRow breadcrumb={breadcrumb}>
                      <CardTags tags={[ ...tags ]} />
                      {!collectionHasRecords && <CollectionActions collection={collection} disabled={saveInProgress} />}
                      <ListReloadButton onClick={reload} />
                      <CollectionClipBoardElement collection={collection} />
                    </TopRow>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col className="ps-1">
                    <CollectionRecords collection={collection} records={collection?.eventColumns || []} disabled={saveInProgress} />
                  </Col>
                </Row>
                <Row>
                  <Col>
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
