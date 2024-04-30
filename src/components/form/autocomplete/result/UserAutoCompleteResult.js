import React from 'react';
import PropTypes from 'prop-types';
import './UserAutoCompleteResult.css';
import { Col, Container, Row } from 'react-bootstrap';
import Highlight from '../../../utilities/Highlight';

const UserAutoCompleteResult = ({ user, query }) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <span>{<Highlight input={`${user.lastName} ${user.firstName} (${user.email})`} what={query} />}</span>
        </Col>
      </Row>
    </Container>
  );
};

UserAutoCompleteResult.propTypes = {
  user: PropTypes.object.isRequired,
  query: PropTypes.string
};

export default UserAutoCompleteResult;
