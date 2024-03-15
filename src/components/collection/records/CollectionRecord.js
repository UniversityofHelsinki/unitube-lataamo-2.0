import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './CollectionRecord.css';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from '../../accessibility/keydown';
import { useTranslation } from 'react-i18next';
import useSearchParams from '../../../hooks/useSearchParams';
import Thumbnail from "../../utilities/Thumbnail";
import DeleteRecord from '../../record/DeleteRecord';

const CollectionRecord = ({ record, disabled, reloadCollectionOnRemove }) => {
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

  const disabledClass = disabled ? 'collection-record-disabled' : '';


  return (
    <Container className={`collection-record ${disabledClass}`} aria-describedby={id}>
      <Row>
        <Col className="px-0">
          <div className="collection-record-thumbnail">
            <Thumbnail width="80" length="80" record={record} altText={'collection_record_thumbnail_alt_text'}></Thumbnail>
          </div>
        </Col>
        <Col className="px-0 align-self-center">
          <div className="ps-2 collection-record-details" role="button" onClick={openRecord} onKeyDown={onKeyDown(openRecord)} tabIndex={0} aria-describedby={id} aria-disabled={disabled}>
            <span id={id} title={record.title}>{record.title}</span>
          </div>
        </Col>
        <Col className="px-0 text-end collection-record-remove-col">
          <div
            className="collection-record-remove pe-1">
            <DeleteRecord record={record} showLabel={false} disabled={disabled} reloadCollectionOnRemove={reloadCollectionOnRemove} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

CollectionRecord.propTypes = {
  record: PropTypes.object,
  disabled: PropTypes.bool,
  reloadCollectionOnRemove: PropTypes.bool
};

export default CollectionRecord;
