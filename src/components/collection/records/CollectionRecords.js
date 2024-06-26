import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './CollectionRecords.css';
import { useTranslation } from 'react-i18next';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ElementHeader from '../../form/ElementHeader';
import HelpDialog from '../../dialog/HelpDialog';
import RecordsTable from '../../record/RecordsTable';
import { useState } from 'react';
import CollectionRecordsBulkActions from './CollectionRecordsBulkActions';
import NewRecord from '../../record/NewRecord';

const NoRecords = () => {
  const { t } = useTranslation();
  return (
    <div className="collection-records-no-records">
      <p>{t('collection_has_no_records')}</p>
    </div>
  );
};

const CollectionRecords = ({ collection, records, disabled }) => {
  const { t } = useTranslation();
  const tableRowRef = useRef();
  const [selectedRecords, setSelectedRecords] = useState([]);

  const onRecordSelect = (records) => {
    setSelectedRecords(records);
  };

  const recordsTable = (() => {
    if (!records || records.length === 0) {
      return <NoRecords />;
    }

    return (<RecordsTable 
      records={records} 
      disabled={disabled} 
      onSelect={onRecordSelect} 
      containerRef={tableRowRef}
      selectedRecords={selectedRecords}
    />);
  })();

  const bulkActions = (() => {
    if (records.length > 0) {
        return <div className="collection-records-bulk-actions-container" aria-live="polite">
          <CollectionRecordsBulkActions 
            records={records}
            selectedRecords={selectedRecords}
          />
          <div>
            <NewRecord selectedSeries={collection?.identifier} />
          </div>
        </div>
    }
    return <div className="collection-records-bulk-actions-container collection-records-bulk-actions-container-empty">
      <div>
        <NewRecord selectedSeries={collection?.identifier} />
      </div>
    </div>;
  })();

  return (
    <Container className="ps-0">
      <Row>
        <Col>
          <ElementHeader
            helpDialog={(
              <HelpDialog label={t('collection_form_collection_records_help_label')}>
                {t('collection_form_collection_records_help_content')}
              </HelpDialog>
            )}
          >
            {t('collection_form_collection_records_form_header')}
          </ElementHeader>
        </Col>
      </Row>
      <Row ref={tableRowRef} className="collection-records-table-row">
        <Col>
          {recordsTable}
        </Col>
      </Row>
      <Row>
        <Col>
            {bulkActions}
        </Col>
      </Row>
    </Container>
  );
};

CollectionRecords.propTypes = {
  records: PropTypes.array,
  disabled: PropTypes.bool,
};

export default CollectionRecords;
