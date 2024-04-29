import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './RecordActionOptions.css';
import { useTranslation } from 'react-i18next';
import CheckBox from '../form/CheckBox';

const RecordActionOptions = ({ onOptionChange, options, searchStarted }) => {
  const { t } = useTranslation();

  const onChange = (key) => {
    if (onOptionChange) {
      onOptionChange({
        ...options,
        [key]: !options[key]
      });
    }
  };

  const showSearchLabel = searchStarted || options.searchValue;

  return (
    <Container>
      <Row>
        <Col>
          <CheckBox 
            type="checkbox"
            id="show-collections"
            name="show-collections"
            aria-label={showSearchLabel ?  t('search_options_filter_records_in_collections') : t('search_options_show_records_in_collections')}
            label={showSearchLabel ? t('search_options_filter_records_in_collections') : t('search_options_show_records_in_collections')}
            onChange={() => onChange('showRecordsInCollections')}
            checked={options.showRecordsInCollections}
          />
      </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

RecordActionOptions.propTypes = {
  onOptionChange: PropTypes.func,
  options: PropTypes.shape({
    showDeleted: PropTypes.bool,
    showRecordsInCollections: PropTypes.bool,
    filtered: PropTypes.bool
  })
};

export default RecordActionOptions;
