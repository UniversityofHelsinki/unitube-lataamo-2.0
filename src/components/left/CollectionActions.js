import React from 'react';
import PropTypes from 'prop-types';
import './CollectionActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewCollection from '../collection/NewCollection';
import TagButtonList from './TagButtonList';

const CollectionActions = ({ options, onOptionChange, tags, onTagChange }) => {
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
            <Search options={options} onOptionChange={onOptionChange} type="collection"/>
        </Col>
      </Row>
      <Row className="tag-button-list-row">
        <Col>
          <TagButtonList onClick={onTagChange} tags={tags} />
        </Col>
      </Row>
    </Container>
  );
};

CollectionActions.propTypes = {
};

export default CollectionActions;
