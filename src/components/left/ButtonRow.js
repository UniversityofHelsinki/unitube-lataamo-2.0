import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './ButtonRow.css';
import NewRecord from './NewRecord';
import { Col } from 'react-bootstrap';

const ButtonRow = () => {

  return (
    <Container>
      <Row>
        <Col className="px-0">
          <NewRecord />
        </Col>
      </Row>
    </Container>
  );
};

ButtonRow.propTypes = {
};

export default ButtonRow;
