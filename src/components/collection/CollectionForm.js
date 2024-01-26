import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CollectionForm.css';
import useCollection from '../../hooks/useCollection';
import Loading from '../utilities/Loading';
import CollectionManagementRights from './management-rights/CollectionManagementRights';
import BreadCrumb from "../form/BreadCrumb";
import CollectionName from "./name/CollectionName";
import CollectionDescription from "./description/CollectionDescription";
import CollectionPublicity from "./publicity/CollectionPublicity";
import useCollectionValidation from '../../hooks/validation/collection/useCollectionValidation';
import CollectionMoodleCourses from "./moodle-courses/CollectionMoodleCourses";

const CollectionForm = () => {
  const [collection, loading] = useCollection();
  const [isValid, messages, validate] = useCollectionValidation();

  const users = collection?.persons?.map(person =>
    ({ userName: person })
  ) || [];

  const groups = collection?.iamgroups?.map(group =>
    ({ grpName: group })
  ) || [];

  const moodleNumbers = collection?.moodleNumbers?.map(moodleNbr =>
      ({ moodleNumber: moodleNbr })
  ) || [];

  return (
    <Loading loading={loading}>
      <Container className="collection-form ps-0">
        <Row>
          <Col className="ps-0">
              <BreadCrumb />
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
        <Row>
          <Col>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="ps-0">
              <CollectionName name={collection?.title} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="ps-0">
              <CollectionDescription description={collection?.description} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="ps-0">
              <CollectionPublicity />
          </Col>
        </Row>
        <Row>
          <Col className="ps-0">
              <CollectionManagementRights users={users} groups={groups} />
          </Col>
          <Col>
            <CollectionMoodleCourses moodleNumbers={moodleNumbers} />
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

CollectionForm.propTypes = {
};

export default CollectionForm;
