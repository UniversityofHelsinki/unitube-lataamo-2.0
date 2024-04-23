import React from 'react';
import PropTypes from 'prop-types';
import './RecordListActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewRecord from '../record/NewRecord';
import RecordActionOptions from './RecordActionOptions';
import TagButtonList from './TagButtonList';

const RecordListActions = ({ options, onOptionChange, onTagChange, tags}) => {
  return (
      <Container>
        <Row className="mb-3">
          <Col>
            <ButtonRow>
              <NewRecord />
            </ButtonRow>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Search options={options} onOptionChange={onOptionChange} type="record" />
          </Col>
        </Row>
        <Row>
          <Col>
            <RecordActionOptions onOptionChange={onOptionChange} options={options} />
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

RecordListActions.propTypes = {
};

export default RecordListActions;
