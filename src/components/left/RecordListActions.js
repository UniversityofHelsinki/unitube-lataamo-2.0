import React from 'react';
import PropTypes from 'prop-types';
import './RecordListActions.css';
import { Col, Container, Row } from 'react-bootstrap';
import ButtonRow from './ButtonRow';
import Search from './search/Search';
import NewRecord from '../record/NewRecord';
import RecordActionOptions from './RecordActionOptions';
import RecordTags from "../utilities/RecordTags";

const RecordListActions = ({ options, records, loadingRecords, onOptionChange }) => {
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
        <Row>
          <Col>
              <RecordTags records={records} loadingRecords={loadingRecords} />
          </Col>
        </Row>
      </Container>
  );
};

RecordListActions.propTypes = {
};

export default RecordListActions;
