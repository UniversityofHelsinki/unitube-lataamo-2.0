import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordCard.css';
import RecordCardDetails from './RecordCardDetails';
import onKeyDown from '../../accessibility/keydown';
import useRecordTags from '../../../hooks/record/useRecordTags';
import CardTags from '../../utilities/CardTags';
import useUser from '../../../hooks/useUser';
import { DELETED_SERIES_REG_EXP } from '../../../Constants';
import RecordActions from './RecordActions';
import {useTranslation} from "react-i18next";
import { Badge, Col, Container, Row } from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";

const RecordCard = ({ record, onClick, selected = false }) => {
  const selectedClass = selected ? 'record-card-selected' : '';
  const [user] = useUser();
  const labelId = useId();
  const { t, i18n } = useTranslation();

  const tags = useRecordTags(record);
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = record.deletionDate && !isDeleted ? new Intl.DateTimeFormat(i18n.language, options).format(new Date(record.deletionDate)) : null;

  const series = (() => {
    const belongsToDefaultCollection = record.series === `inbox ${user.eppn}`;
    if (isDeleted || belongsToDefaultCollection) {
      return <></>;
    }
    return (<div className="record-card-badge" title={t('collection_tag', { collection: record.series })}>
      <span style={{ display: 'inline-block', width: '0px', height: '0px', overflow: 'hidden '}}>{t('collection_prefix')}</span>
      <Badge bg="primary">
        {record.series}
      </Badge>
    </div>);
  })();

  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  const realDeletionDate = record.realDeletionDate && isDeleted ? (() => {
    const date = new Date(record.realDeletionDate);
    date.setMonth(date.getMonth());
    return new Intl.DateTimeFormat(i18n.language, options).format(date);
  })() : null;

  return (
    <Container className="p-0">
      <Row>
        <Col className={`record-card-right-side-col ps-0 order-2 ${selectedClass}`}>
          <div className="record-card-content ps-1 pe-1">
            <a className="record-card-content-details"
              href={`?record=${record.identifier}`}
              onClick={handleClick}
              onKeyDown={onKeyDown(handleClick)}
              aria-labelledby={labelId}
              aria-current={selected ? 'page' : false}
            >
              <div className="record-card-content-details-top">
                <CardTags tags={tags} />
                <div>
                  <RecordCardDetails labelId={labelId} record={record} deleted={isDeleted} />
                </div>
              </div>
              <div className="record-card-content-details-bottom">
                  {!isDeleted ? t('record_card_valid_until', {deletionDate: date})  : t('record_card_restorable_until', {realDeletionDate: realDeletionDate})}
              </div>
            </a>
            <div className="record-card-content-actions mt-1">
              <RecordActions record={record} />
            </div>
          </div>
        </Col>
        <Col className="record-card-left-side-col pe-0 order-1">
          <div className="record-card-left-side">
            {series}
            <div className="record-card-length">
              <span title={record.duration}>{record.duration}</span>
            </div>
            <div className="record-card-thumbnail">
              <Thumbnail record={record} width="160" length="160" altText="record_thumbnail_alt_text" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default RecordCard;
