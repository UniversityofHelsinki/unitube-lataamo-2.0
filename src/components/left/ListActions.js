import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './ListActions.css';

const ListActions = () => {
  return (
    <Container>
      <Row className="justify-content-end text-end">
        <Col>
          <span>järjestä</span>
        </Col>
      </Row>
    </Container>
  );
};

ListActions.propTypes = {
};

export default ListActions;
