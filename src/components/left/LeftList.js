import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
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
