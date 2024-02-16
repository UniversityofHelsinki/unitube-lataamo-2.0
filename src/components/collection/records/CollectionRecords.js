import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecords.css';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import CollectionRecord from './CollectionRecord';
import ElementHeader from '../../form/ElementHeader';

const CollectionRecords = ({ records }) => {
  const { t } = useTranslation();

  return (
    <Container className="ps-0">
      <Row>
        <Col>
          <ElementHeader label={t('collection_records_form_header')}>
            {t('collection_records_form_header')}
          </ElementHeader>
        </Col>
      </Row>
      <Row className="collection-records-list-row">
        <Col as="ul" className="collection-records-record-col">
          {records.map((record, i) =>
            <li key={record.id}>
              <CollectionRecord record={record} onRemove={() => console.log(record)} aria-label={record.title} />
            </li>
          )}
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
};

export default CollectionRecords;
