import React from 'react';
import PropTypes from 'prop-types';
import './CollectionActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewCollection from '../collection/NewCollection';

const CollectionActions = () => {
  return (
    <Container className="collection-actions-container">
      <Row>
        <Col>
          <ButtonRow>
            <NewCollection />
          </ButtonRow>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

CollectionActions.propTypes = {
};

export default CollectionActions;
