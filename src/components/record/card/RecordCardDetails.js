import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import './RecordCardDetails.css';
import { useTranslation } from 'react-i18next';

const RecordCardDetails = ({ record, labelId, deleted }) => {
  const { t, i18n } = useTranslation();

  const deletedClass = deleted ? 'record-card-details-deleted' : '';
  const created = new Intl.DateTimeFormat(i18n.language, {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(new Date(record.created));

  return (
    <>
        <strong id={labelId} className={deletedClass} title={record.title}>
            {record.highlightedTitle ? (
                <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(record.highlightedTitle)}}></p>
            ) : (
                <p>{record.title}</p>
            )}
        </strong>
        <p className="record-card-details-created" title={record.created}>
        {t('record_card_details_created', { created })}
      </p>
      <p title={record.description}>
        {record.description}
      </p>
    </>
  );
};

RecordCardDetails.propTypes = {
  record: PropTypes.object.isRequired,
  labelId: PropTypes.string,
  deleted: PropTypes.bool
};

export default RecordCardDetails;
