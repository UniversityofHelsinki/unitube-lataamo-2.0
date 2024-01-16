import React from 'react';
import PropTypes from 'prop-types';
import './UserAutoCompleteResult.css';
import { Col, Container, Row } from 'react-bootstrap';

const UserAutoCompleteResult = ({ user, query }) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <span>{user.lastName} {user.firstName} ({user.email})</span>
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
