import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import MainContent from './MainContent';

const Right = () => {
  return (
    <Container>
      <Row>
        <Col>
          <MainContent />
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

Right.propTypes = {
};

export default Right;
