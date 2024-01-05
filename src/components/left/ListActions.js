import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

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
