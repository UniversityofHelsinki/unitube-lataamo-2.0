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

  return (
    <div className={`record-card ${selectedClass}`}>
      <div className="record-card-left"
        role="button"
        onClick={onClick}
        onKeyDown={onKeyDown(onClick)}
        tabIndex={0}
        aria-labelledby={labelId}>
        <Thumbnail record={record} width="160" length="160" altText="record_thumbnail_alt_text"></Thumbnail>
        <div className="record-card-content-row-content px-2">
          <div className="record-card-content-row-content-top">
            <div className="record-card-content-row-content-top-up">
              <CardTags tags={tags} />
            </div>
            <RecordCardDetails labelId={labelId} record={record} deleted={isDeleted} />
          </div>
          <div className="record-card-content-row-content-bottom">
             {!isDeleted ? t('record_card_valid_until', {deletionDate: date})  : null}
          </div>
        </div>
      </div>
      <div className="record-card-right me-2">
        <RecordActions record={record} />
      </div>
    </div>
  );
};

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

export default RecordCard;
