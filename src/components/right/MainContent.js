import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
