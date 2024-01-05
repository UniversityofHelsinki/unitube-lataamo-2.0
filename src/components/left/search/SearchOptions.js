import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';

const SearchOptions = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Form.Check type="checkbox" id="show-deleted" name="show-deleted" aria-label="asdf" label="Näytä poistetut" />
        </Col>
        <Col>
          <Form.Check type="checkbox" id="show-collections"  name="show-collections" aria-label="asdf" label="Näytä myös kokoelmiin kuuluvat tallenteet" />
        </Col>
      </Row>
    </Container>
  );
};

SearchOptions.propTypes = {
};

export default SearchOptions;
