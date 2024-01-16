import React from 'react';
import PropTypes from 'prop-types';
import './GroupAutoComplete.css';
import { Col, Container, Row } from 'react-bootstrap';
import AutoComplete from '../AutoComplete';
import useGroups from '../../../../hooks/autocomplete/useGroups';
import GroupAutoCompleteResult from './GroupAutoCompleteResult';
import { useTranslation } from 'react-i18next';

const GroupAutoComplete = ({ onSelect }) => {
  const [results, search, clearResults] = useGroups();
  const { t } = useTranslation();

  const onSearch = (query) => {
    if (query.length > 3) {
      search(query);
    } else {
      clearResults();
    }
  };

  const handleSelection = (i) => {
    onSelect(results[i]);
    clearResults();
  };

  const options = results.map(result =>
    <GroupAutoCompleteResult group={result} />
  );

  return (
    <Container className="px-0">
      <Row>
        <Col>
          <AutoComplete options={options} onFilter={onSearch} onSelect={handleSelection} placeholder={t('group_autocompletion_placeholder')} />
        </Col>
      </Row>
    </Container>
  );
};

GroupAutoComplete.propTypes = {
  onSelect: PropTypes.func.isRequired
};

export default GroupAutoComplete;
