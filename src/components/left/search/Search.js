import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { ReactComponent as SearchIcon } from '../../utilities/icons/search.svg';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import './Search.css';
import { Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const Search = ({ options, onOptionChange, type, startSearch = () => {}, stopSearch = () => {} }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(options?.searchValue || '');
  const searchTimeoutID = useRef();

  const handleSearchInputChange = (event) => {
    if (searchTimeoutID.current) {
      clearTimeout(searchTimeoutID.current);
    }
    setSearchValue(event.target.value);
    searchTimeoutID.current = setTimeout(() => onOptionChange({
      ...options,
      searchValue: event.target.value
    }), 500);
  };

  const handleClear = () => {
    setSearchValue('');
    onOptionChange({
      ...options,
      searchValue: ''
    });
  };

  const isRecordType = type === 'record';

  return (
      <Container>
        <Row>
          <Col className="no-padding">
            <div role="search">
              <label htmlFor={isRecordType ? "search-videos" : "search-collections"} className="visually-hidden">
                {isRecordType ? t('search_videos') : t('search_collections')}
              </label>
              <InputGroup className="search">
                <Form.Control
                    placeholder={isRecordType ? t('search_videos') : t('search_collections')}
                    aria-label={isRecordType ? t('search_videos') : t('search_collections')}
                    onFocus={startSearch}
                    onBlur={stopSearch}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    id={isRecordType ? "search-videos" : "search-collections"}
                />
                {searchValue && (
                    <div className="removeIconContainer">
                      <button
                          onClick={handleClear}
                          aria-label={t('clear_search')}
                          tabIndex="0">
                        <RemoveIcon width="20px" height="20px"/>
                      </button>
                    </div>
                )}
                <InputGroup.Text aria-hidden="true" className="searchIconContainer">
                  <SearchIcon aria-hidden="true" width="20px" height="20px"/>
                </InputGroup.Text>
              </InputGroup>
            </div>
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
