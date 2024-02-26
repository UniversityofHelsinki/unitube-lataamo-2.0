import React from 'react';
import PropTypes from 'prop-types';
import './RecordActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewRecord from '../record/NewRecord';
import RecordActionOptions from './RecordActionOptions';

const RecordActions = ({ options, onOptionChange }) => {
  return (
      <Container>
        <Row className="mb-3">
          <Col>
            <ButtonRow>
              <NewRecord />
            </ButtonRow>
          </Col>
        </Row>
        <Row>
          <Col>
            <Search options={options} onOptionChange={onOptionChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <RecordActionOptions onOptionChange={onOptionChange} options={options} />
          </Col>
        </Row>
      </Container>
  );
};

RecordActions.propTypes = {
};

export default RecordActions;
