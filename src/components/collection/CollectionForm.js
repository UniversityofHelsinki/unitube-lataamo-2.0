import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CollectionForm.css';
import CollectionManagementRights from './management-rights/CollectionManagementRights';
import BreadCrumb from "../form/BreadCrumb";
import CollectionName from "./name/CollectionName";
import CollectionDescription from "./description/CollectionDescription";
import CollectionPublicity from "./publicity/CollectionPublicity";

const CollectionForm = () => {
  return (
    <Container>
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
      <Row>
        <Col>
            <BreadCrumb />
        </Col>
      </Row>
      <Row>
        <Col>
            <CollectionName />
        </Col>
      </Row>
      <Row>
        <Col>
            <CollectionDescription />
        </Col>
      </Row>
        <Row>
            <Col>
                <CollectionPublicity />
            </Col>
        </Row>
      <Row>
        <Col>
          <CollectionManagementRights users={[{ userName: 'pekka' }, { userName: 'nomypa' }, { userName: 'keijoooooo' }]} groups={[ { grpName: 'grp-hy-huuhuu', description: 'pelottava' }]} />
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

CollectionForm.propTypes = {
};

export default CollectionForm;
