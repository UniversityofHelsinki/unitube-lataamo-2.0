import React, {useId} from 'react';
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
import {Badge} from 'react-bootstrap';
import Thumbnail from "../../utilities/Thumbnail";
import { CardHighlight } from '../../utilities/Highlight';

const RecordCard = ({ record, onClick, selected = false, containerRef, highlight, actionsDisabled = false }) => {
  const selectedClass = selected ? 'record-card-selected' : '';
  const [user] = useUser();
  const labelId = useId();
  const { t } = useTranslation();

  const [tags] = useRecordTags([record]);
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const date = record.deletionDate && !isDeleted ? new Intl.DateTimeFormat('fi-FI', options).format(new Date(record.deletionDate)) : null;

  const series = (() => {
    const belongsToDefaultCollection = record.series === `inbox ${user.eppn}`;
    if (isDeleted || belongsToDefaultCollection) {
      return null;
    }
    return (<div className="record-card-badge" title={t('collection_tag', { collection: record.series })}>
      <span className="screenreader-only">{t('collection_prefix')}</span>
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
    return new Intl.DateTimeFormat('fi-FI', options).format(date);
  })() : null;

  return (
    <div className={`record-card ${selectedClass}`}>
      <div className="record-card-details">
        <a className="record-card-content-details"
           href={`?record=${record.identifier}`}
           onClick={handleClick}
           onKeyDown={onKeyDown(handleClick)}
           aria-labelledby={labelId}
           aria-current={selected ? 'page' : false}
        >
          <div className="record-card-content-details-top">
            <CardTags tags={tags} />
            <RecordCardDetails labelId={labelId} record={record} deleted={isDeleted} highlight={highlight} />
          </div>
          <div className="record-card-content-details-bottom">
            {!isDeleted
              ? <p title={t('record_card_content_details_bottom_valid_until')}>
                  <CardHighlight
                    input={t('record_card_valid_until', { deletionDate: date })}
                    what={highlight}
                  />
                </p>
              : <p title={t('record_card_content_details_bottom_restorable_until')}>
                  <CardHighlight
                    input={t('record_card_restorable_until', { realDeletionDate })}
                    what={highlight}
                  />
                </p>

            }
          </div>
        </a>
      </div>
      <div className="record-card-thumbnail">
        <div className="record-card-left-side">
          {series}
          <div className="record-card-duration">
            <span title={t('record_card_duration_title')}>
              <span className="screenreader-only">{t('record_card_duration_title')}: {record.duration}</span>
              <span aria-hidden>
                <CardHighlight input={record.duration} what={highlight} />
              </span>
            </span>
          </div>

          <a
              aria-hidden
              href={`?record=${record.identifier}`}
              onClick={handleClick}
              onKeyDown={onKeyDown(handleClick)}
              tabIndex={-1}
            >
              <div className="record-card-thumbnail-container">
                <Thumbnail record={record} width="160" height="160" altText="record_thumbnail_alt_text" containerRef={containerRef} />
              </div>
            </a>
        </div>
      </div>
      <div className="record-card-actions-list">
        <div>
          <RecordActions record={record} disabled={actionsDisabled} />
        </div>
      </div>
    </div>
  );
};

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  containerRef: PropTypes.object,
  highlight: PropTypes.string,
  actionsDisabled: PropTypes.bool
};

export default RecordCard;
