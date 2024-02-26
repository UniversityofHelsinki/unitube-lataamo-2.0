import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';
import useSearchParams from '../../../hooks/useSearchParams';

const CollectionRecord = ({ record, onRemove, disabled }) => {
  const { t } = useTranslation();
  const id = useId();
  const [_, setSearchParams] = useSearchParams();

  const openRecord = () => {
    if (disabled) {
      return;
    }
    setSearchParams({
      record: record.id
    });
  };

  const removeRecord = (event) => {
    event.stopPropagation();
    if (disabled) {
      return;
    }
    onRemove(event);
  };

  const disabledClass = disabled ? 'collection-record-disabled' : '';


  return (
    <Container className={`collection-record ${disabledClass}`} aria-describedby={id}>
      <Row>
        <Col className="px-0">
          <div className="collection-record-thumbnail">
          </div>
        </Col>
        <Col className="px-0 align-self-center">
          <div className="ps-2 collection-record-details" role="button" onClick={openRecord} onKeyDown={onKeyDown(openRecord)} tabIndex={0} aria-describedby={id} aria-disabled={disabled}>
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
              aria-disabled={disabled}
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
  record: PropTypes.object,
  onRemove: PropTypes.func,
  disabled: PropTypes.bool,
};

export default CollectionRecord;
