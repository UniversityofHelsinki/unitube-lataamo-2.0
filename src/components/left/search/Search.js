import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import SearchOptions from './SearchOptions';

const Search = () => {
  return (
    <Container>
      <Row>
        <Col className="no-padding">
          <input type="search" placeholder="Hae" className="form-control" />
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <SearchOptions />
        </Col>
      </Row>
    </Container>
  );
};

Search.propTypes = {
};

export default Search;
