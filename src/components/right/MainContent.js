import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Record from '../record/Record';
import Loading from '../utilities/Loading';

const MainContent = () => {
  return (
    <Loading loading={true}>
      <Container>
        <Row>
          <Col>
            <Record />
          </Col>
        </Row>
      </Container>
    </Loading>
  );
};

MainContent.propTypes = {
};

export default MainContent;
