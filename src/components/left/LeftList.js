import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListActions from './ListActions';
import ListContainer from './ListContainer';

const LeftList = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ListActions />
        </Col>
      </Row>
      <Row>
        <Col>
          <ListContainer />
        </Col>
      </Row>
    </Container>
  );
};

LeftList.propTypes = {
};

export default LeftList;
