import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Navigation = () => {
  return (
    <Container>
      <Row className="text-center">
        <Col as="a" href="#">
          tallenteet
        </Col>
        <Col as="a" href="#">
          kokoelmat
        </Col>
      </Row>
    </Container>
  );
};

Navigation.propTypes = {
};

export default Navigation;
