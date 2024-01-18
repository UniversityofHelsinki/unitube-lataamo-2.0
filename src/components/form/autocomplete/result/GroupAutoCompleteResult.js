import React from 'react';
import PropTypes from 'prop-types';
import './GroupAutoCompleteResult.css';
import { Col, Container, Row } from 'react-bootstrap';
import Highlight from './Highlight';

const GroupAutoCompleteResult = ({ group, query }) => {
  return (
    <Container className="py-2 group-auto-complete-result">
      <Row className="group-auto-complete-result-name">
        <Col>
          <span>
            <Highlight input={group.grpName} what={query} />
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <span>{group.description}</span>
        </Col>
      </Row>
    </Container>
  );
};

GroupAutoCompleteResult.propTypes = {
  group: PropTypes.object.isRequired,
  query: PropTypes.string
};

export default GroupAutoCompleteResult;
