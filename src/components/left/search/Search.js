import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ReactComponent as SearchIcon } from '../../utilities/icons/search.svg';
import './Search.css';
import { Form, InputGroup } from 'react-bootstrap';

const Search = ({ options }) => {
  return (
    <Container>
      <Row>
        <Col className="no-padding">
          <InputGroup className="search">
            <Form.Control placeholder="Hae" aria-label="Hae" />
            <InputGroup.Text><SearchIcon width="20px" height="20px"/></InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

Search.propTypes = {
  onQueryChange: PropTypes.func,
  onOptionChange: PropTypes.func
};

export default Search;
