import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Record from '../record/Record';

const MainContent = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Record />
        </Col>
      </Row>
    </Container>
  );
};

MainContent.propTypes = {
};

export default MainContent;
