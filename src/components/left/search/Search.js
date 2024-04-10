import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ReactComponent as SearchIcon } from '../../utilities/icons/search.svg';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import './Search.css';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const Search = ({ options, onOptionChange }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (onOptionChange) {
        onOptionChange({
          ...options,
          filtered: searchValue !== '',
          searchValue
        });
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onOptionChange, options]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  return (
      <Container>
        <Row>
          <Col className="no-padding">
            <InputGroup className="search">
              <Form.Control
                  placeholder={t('search_videos')}
                  aria-label={t('search_videos')}
                  value={searchValue}
                  onChange={handleSearchInputChange}
              />
              {searchValue && (
                  <InputGroup.Text className="removeIconContainer">
                    <RemoveIcon width="20px" height="20px" onClick={handleClear} />
                  </InputGroup.Text>
              )}
              <InputGroup.Text className="searchIconContainer">
                <SearchIcon width="20px" height="20px" />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </Container>
  );
};

Search.propTypes = {
  options: PropTypes.object,
  onOptionChange: PropTypes.func
};

export default Search;
