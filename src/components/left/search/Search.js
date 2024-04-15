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
                    <InputGroup.Text className="removeIconContainer">
                      <button onClick={handleClear} aria-label={t('clear_search')}>
                        <RemoveIcon width="20px" height="20px" />
                      </button>
                    </InputGroup.Text>
                )}
                <InputGroup.Text className="searchIconContainer">
                  <SearchIcon width="20px" height="20px" />
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
