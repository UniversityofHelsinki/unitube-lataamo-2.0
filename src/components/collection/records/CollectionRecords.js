import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecords.css';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import CollectionRecord from './CollectionRecord';
import ElementHeader from '../../form/ElementHeader';
import HelpDialog from '../../dialog/HelpDialog';

const NoRecords = () => {
  const { t } = useTranslation();
  return (
    <div className="collection-records-no-records">
      <p>{t('collection_has_no_records')}</p>
    </div>
  );
};

const CollectionRecords = ({ records, disabled, onChange = console.log }) => {
  const { t } = useTranslation();

  const doNothing = () => {};
  const removeRecord = () => {
    if (disabled) {
      doNothing();
      return;
    }
    onChange();
  };

  const recordsList = (() => {
    if (!records || records.length === 0) {
      return <NoRecords />;
    }
    return records.map((record, i) =>
      <li key={record.id}>
        <CollectionRecord 
          record={record} 
          onRemove={removeRecord} 
          disabled={disabled}
          aria-label={record.title} 
        />
      </li>
    );
  })();

  return (
    <Container className="ps-0">
      <Row>
        <Col>
          <ElementHeader label={t('collection_form_collection_records_form_header')}>
            {t('collection_form_collection_records_form_header')}
          </ElementHeader>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <HelpDialog label={t('collection_form_collection_records_help_label')}>
            {t('collection_form_collection_records_help_content')}
          </HelpDialog>
        </Col>
      </Row>
      <Row className="collection-records-list-row">
        <Col as="ul" className="collection-records-record-col">
          {recordsList}
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  );
};

CollectionRecords.propTypes = {
  records: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default CollectionRecords;
