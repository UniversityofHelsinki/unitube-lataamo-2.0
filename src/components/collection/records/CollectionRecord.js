import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';
import useSearchParams from '../../../hooks/useSearchParams';

const CollectionRecord = ({ record, onRemove }) => {
  const { t } = useTranslation();
  const id = useId();
  const [_, setSearchParams] = useSearchParams();

  const openRecord = () => {
    setSearchParams({
      record: record.id
    });
  };

  const removeRecord = (event) => {
    event.stopPropagation();
    onRemove(event);
  };


  return (
    <Container className="collection-record" aria-describedby={id}>
      <Row>
        <Col className="px-0">
          <div className="collection-record-thumbnail">
          </div>
        </Col>
        <Col className="px-0 align-self-center">
          <div className="ps-2 collection-record-details" role="button" onClick={openRecord} onKeyDown={onKeyDown(openRecord)} tabIndex={0} aria-describedby={id}>
            <span id={id}>{record.title}</span>
          </div>
        </Col>
        <Col className="px-0 text-end collection-record-remove-col">
          <div 
            className="collection-record-remove pe-1">
            <span
              role="button" 
              onClick={removeRecord} 
              onKeyDown={onKeyDown(removeRecord)}
              aria-label={t('collection_record_remove_label')} 
              tabIndex={0}>
              <RemoveIcon />
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

CollectionRecord.propTypes = {
};

export default CollectionRecord;
