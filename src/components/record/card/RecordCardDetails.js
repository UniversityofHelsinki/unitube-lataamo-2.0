import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardDetails.css';
import { useTranslation } from 'react-i18next';
import { CardHighlight } from '../../utilities/Highlight';

const RecordCardDetails = ({ record, labelId, deleted, highlight }) => {
    const { t, i18n } = useTranslation();
    const deletedClass = deleted ? 'record-card-details-deleted' : '';
    const created = new Intl.DateTimeFormat(i18n.language, {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(record.created));
    return (
        <>
            <strong id={labelId} className={deletedClass} title={record.title}>
              <CardHighlight input={record.title} what={highlight} />
            </strong>
            <p className="record-card-details-created" title={record.created}>
              <CardHighlight input={t('record_card_details_created', { created })} what={highlight} />
            </p>
            <div title={record.description}>
              <CardHighlight input={record.description} what={highlight} />
            </div>
        </>
    );
};

RecordCardDetails.propTypes = {
  record: PropTypes.object.isRequired,
  labelId: PropTypes.string,
  deleted: PropTypes.bool,
  highlight: PropTypes.string
};

export default RecordCardDetails;
