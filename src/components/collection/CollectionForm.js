import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CollectionForm.css';
import useCollection from '../../hooks/useCollection';
import Loading from '../utilities/Loading';
import CollectionManagementRights from './management-rights/CollectionManagementRights';

const CollectionForm = () => {
  const [collection, loading] = useCollection();
  return (
    <Loading loading={loading}>
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
            <CollectionManagementRights users={[{ userName: 'pekka' }, { userName: 'nomypa' }, { userName: 'keijoooooo' }]} groups={[ { grpName: 'grp-hy-huuhuu', description: 'pelottava' }]} />
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
