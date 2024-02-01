import React from 'react';
import PropTypes from 'prop-types';
import './CollectionRecords.css';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'react-bootstrap';
import FormElementHeader from '../../form/FormElementHeader';
import { useId } from 'react';
import CollectionRecord from './CollectionRecord';

const CollectionRecords = ({ records }) => {
  const { t } = useTranslation();
  const id = useId();

  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader componentId={id}>
            {t('collection_records_form_header')}
          </FormElementHeader>
        </Col>
      </Row>
      <Row>
        <Col as="ul" className="collection-records-record-col">
          {records.map((record, i) =>
            <li key={record.i}><CollectionRecord record={record} /></li>
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
