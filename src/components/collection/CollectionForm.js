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

const CollectionForm = () => {
  const [collection, loading] = useCollection();

  const users = collection?.persons?.map(person => 
    ({ userName: person })
  ) || [];

  const groups = collection?.iamgroups?.map(group => 
    ({ grpName: group })
  ) || [];

  return (
    <Loading loading={loading}>
      <Container>
        <Row>
          <Col>
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
          <Col>
              <CollectionName name={collection?.title} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
              <CollectionDescription description={collection?.description} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
              <CollectionPublicity />
          </Col>
        </Row>
        <Row>
          <Col>
              <CollectionManagementRights users={users} groups={groups} />
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

CollectionForm.propTypes = {
};

export default CollectionForm;
