import React, {useEffect, useId, useRef} from 'react';
import PropTypes from 'prop-types';
import './RecordCard.css';
import RecordCardDetails from './RecordCardDetails';
import onKeyDown from '../../accessibility/keydown';
import useRecordTags from '../../../hooks/record/useRecordTags';
import CardTags from '../../utilities/CardTags';
import useUser from '../../../hooks/useUser';
import {DELETED_SERIES_REG_EXP} from '../../../Constants';
import RecordActions from './RecordActions';
import {useTranslation} from "react-i18next";
import {Badge, Col, Container, Row} from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";
import { CardHighlight } from '../../utilities/Highlight';

const RecordCard = ({ record, onClick, selected = false, containerRef, highlight }) => {
  const selectedClass = selected ? 'record-card-selected' : '';
  const [user] = useUser();
  const labelId = useId();
  const { t, i18n } = useTranslation();
  const ref = useRef(null);

  const [tags] = useRecordTags([record]);
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = record.deletionDate && !isDeleted ? new Intl.DateTimeFormat(i18n.language, options).format(new Date(record.deletionDate)) : null;


  useEffect(() => {
  }, []);

  const series = (() => {
    const belongsToDefaultCollection = record.series === `inbox ${user.eppn}`;
    if (isDeleted || belongsToDefaultCollection) {
      return null;
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
      <Container ref={ref} style={{ minHeight: '160px' }} className="border">
        <Row>
          <Col lg={4} className="px-0 text-center" style={{ overflow: 'hidden' }}>
            <div className="record-card-left-side">
              {series}
              <div className="record-card-length">
                <span title={record.duration}>
                  <CardHighlight input={record.duration} what={highlight} />
                </span>
              </div>
              <div className="record-card-thumbnail-container">
                <Thumbnail record={record} width="160" height="160" altText="record_thumbnail_alt_text" containerRef={containerRef} />
              </div>
            </div>
          </Col>
          <Col lg={6} className={`${selectedClass}`}>
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
                  <RecordCardDetails labelId={labelId} record={record} deleted={isDeleted} highlight={highlight} />
                </div>
              </div>
              <div className="record-card-content-details-bottom">
                {!isDeleted 
                  ? <CardHighlight 
                      input={t('record_card_valid_until', { deletionDate: date })} 
                      what={highlight} 
                    />
                  : <CardHighlight
                      input={t('record_card_restorable_until', { realDeletionDate })}
                      what={highlight}
                    />}
              </div>
            </a>
          </Col>
          <Col lg={2} className={`record-card-content-actions text-end p-0 ${selectedClass}`}>
            <RecordActions record={record} />
          </Col>
        </Row>
      </Container>
  );
};

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  containerRef: PropTypes.object,
  highlight: PropTypes.string
};

export default RecordCard;
