import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {ReactComponent as SearchIcon} from '../../utilities/icons/search.svg';
import './Search.css';
import {Form, InputGroup} from 'react-bootstrap';
import {useSelector} from "react-redux";

const Search = ({ options, onOptionChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const records = useSelector((state) => state.records.records);

  useEffect(() => {
    if (onOptionChange) {
      onOptionChange({
        ...options,
        filtered: true,
        searchValue
      });
    }
  }, [searchValue]);


  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
      <Container>
        <Row>
          <Col className="no-padding">
            <InputGroup className="search">
              <Form.Control placeholder="Hae" aria-label="Hae"
                            value={searchValue} onChange={handleSearchInputChange}  />
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
