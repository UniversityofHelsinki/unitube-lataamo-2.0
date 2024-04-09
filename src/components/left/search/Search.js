import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {ReactComponent as SearchIcon} from '../../utilities/icons/search.svg';
import './Search.css';
import {Form, InputGroup} from 'react-bootstrap';
import {useTranslation} from "react-i18next";


const Search = ({ options, onOptionChange }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // clear previous timeout if any
    let timeoutId = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // create new timeout
    timeoutId = setTimeout(() => {
      if (onOptionChange) {
        onOptionChange({
          ...options,
          filtered: searchValue !== '',
          searchValue
        });
      }
    }, 500); // change 500 to the number of milliseconds you want to wait after each keystroke

    // cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchValue]);


  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
      <Container>
        <Row>
          <Col className="no-padding">
            <InputGroup className="search">
              <Form.Control placeholder={t('search_videos')} aria-label={t('search_videos')}
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
