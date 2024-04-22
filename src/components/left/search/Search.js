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

const Search = ({ options, onOptionChange }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState(options.searchValue || '');
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

  return (
      <Container>
        <Row>
          <Col className="no-padding">
            <div role="search">
              <label htmlFor="search-videos" className="visually-hidden">{t('search_videos')}</label>
              <InputGroup className="search">
                <Form.Control
                    placeholder={t('search_videos')}
                    aria-label={t('search_videos')}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    id="search-videos"
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
                <InputGroup.Text className="searchIconContainer">
                  <SearchIcon width="20px" height="20px"/>
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
