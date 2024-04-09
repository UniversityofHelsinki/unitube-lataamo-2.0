import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './RecordActionOptions.css';
import { useTranslation } from 'react-i18next';
import CheckBox from '../form/CheckBox';

const RecordActionOptions = ({ onOptionChange, options }) => {
  console.log(options);

  const { t } = useTranslation();
  const onChange = (key) => {
    if (onOptionChange) {
      onOptionChange({
        ...options,
        [key]: !options[key]
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <CheckBox type="checkbox" id="show-deleted" name="show-deleted" aria-label={t('search_options_show_deleted')} label={t('search_options_show_deleted')} onChange={() => onChange('showDeleted')} checked={options.showDeleted} />
        </Col>
        <Col>
          <CheckBox type="checkbox" id="show-collections"  name="show-collections" aria-label={options?.filtered ? t('search_options_filter_records_in_collections') : t('search_options_show_records_in_collections')} label={options?.filtered ? t('search_options_filter_records_in_collections') : t('search_options_show_records_in_collections')} onChange={() => onChange('showRecordsInCollections')} checked={options.showRecordsInCollections} />
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
