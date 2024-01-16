import React from 'react';
import PropTypes from 'prop-types';
import './GroupAutoComplete.css';
import { Col, Container, Row } from 'react-bootstrap';

const GroupAutoComplete = ({ group }) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <span>{group.grpName}</span>
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

GroupAutoComplete.propTypes = {
  group: PropTypes.object.isRequired
};

export default GroupAutoComplete;
