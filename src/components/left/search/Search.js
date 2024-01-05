import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import SearchOptions from './SearchOptions';

const Search = () => {
  return (
    <Container>
      <Row>
        <Col>
          <input type="text" placeholder="Hae" className="form-control" />
        </Col>
      </Row>
      <Row>
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
