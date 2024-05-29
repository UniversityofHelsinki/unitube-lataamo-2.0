import React from 'react';
import PropTypes from 'prop-types';
import './CollectionActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewCollection from '../collection/NewCollection';
import TagButtonList from './TagButtonList';
import TagClearButton from "./TagClearButton";

const CollectionActions = ({ options, onOptionChange, tags, onTagChange, onTagClear, selectedTags }) => {
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
        <Row className="clear-collection-tag-selection-button-row">
            <Col>
                <TagClearButton onClick={onTagClear} disabled={selectedTags.length === 0} />
            </Col>
        </Row>
    </Container>
  );
};

CollectionActions.propTypes = {
    options: PropTypes.object,
    onOptionChange: PropTypes.func,
    tags: PropTypes.object,
    onTagChange: PropTypes.func,
    onTagClear: PropTypes.func,
    selectedTags: PropTypes.array
};

export default CollectionActions;
