import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordCard.css';
import { Col, Container, Row } from 'react-bootstrap';
import RecordCardDetails from './RecordCardDetails';
import RecordCardThumbnail from './RecordCardThumbnail';
import onKeyDown from '../../accessibility/keydown';
import useRecordTags from '../../../hooks/record/useRecordTags';
import CardTags from '../../utilities/CardTags';
import useUser from '../../../hooks/useUser';
import { DELETED_SERIES_REG_EXP } from '../../../Constants';
import RecordCardActions from './RecordCardActions';

const RecordCard = ({ record, onClick, selected = false }) => {
  const selectedClass = selected ? 'record-card-selected' : '';
  const [user] = useUser();
  const labelId = useId();

  const tags = useRecordTags(record);
  const isDeleted = DELETED_SERIES_REG_EXP(user.eppn).test(record.series);

  return (
    <div className={`record-card ${selectedClass}`}>
      <div className="record-card-left"
        role="button"
        onClick={onClick} 
        onKeyDown={onKeyDown(onClick)}
        tabIndex={0}
        aria-labelledby={labelId}>
        <RecordCardThumbnail record={record} />
        <div className="record-card-content-row-content px-2">
          <div className="record-card-content-row-content-top">
            <div className="record-card-content-row-content-top-up">
              <CardTags tags={tags} />
            </div>
            <RecordCardDetails labelId={labelId} record={record} deleted={isDeleted} />
          </div>
          <div className="record-card-content-row-content-bottom">
            voimassa x asti
          </div>
        </div>
      </div>
      <div className="record-card-right me-2">
        <RecordCardActions record={record} />
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
