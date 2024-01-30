import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import MainContent from './MainContent';
import './Right.css';

const Right = () => {
  return (
    <Container className="right">
      <Row>
        <Col>
          <MainContent />
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col>
          asdfasdf
        </Col>
      </Row>
    </Container>
  );
};

Right.propTypes = {
};

export default Right;
