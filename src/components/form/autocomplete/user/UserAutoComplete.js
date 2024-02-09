import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserAutoComplete.css';
import { Col, Container, Row } from 'react-bootstrap';
import useUsers from '../../../../hooks/autocomplete/useUsers';
import AutoComplete from '../AutoComplete';
import UserAutoCompleteResult from './../result/UserAutoCompleteResult';
import { useTranslation } from 'react-i18next';

const UserAutoComplete = ({ onSelect }) => {
  const [results, search, clearResults] = useUsers();
  const [query, setQuery] = useState('');
  const { t } = useTranslation();

  const onSearch = (query) => {
    if (query.length > 3) {
      search(query);
    } else {
      clearResults();
    }
    setQuery(query);
  };
  
  const options = (results || []).slice(0, 100).map((user) =>
    <UserAutoCompleteResult user={user} query={query} />
  );

  const handleSelection = (i) => {
    onSelect(results[i]);
    clearResults();
  };

  return (
    <Container className="px-0">
      <Row>
        <Col>
          <AutoComplete options={options} onFilter={onSearch} onSelect={handleSelection} placeholder={t('user_autocompletion_placeholder')} ariaLabel={t('collection_user_autocomplete_label')}/>
        </Col>
      </Row>
    </Container>
  );
};

UserAutoComplete.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default UserAutoComplete;
