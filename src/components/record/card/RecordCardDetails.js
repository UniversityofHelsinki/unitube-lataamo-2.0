import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardDetails.css';

const RecordCardDetails = ({ record, labelId, deleted }) => {

  const deletedClass = deleted ? 'record-card-details-deleted' : '';

  return (
    <>
      <strong id={labelId} className={deletedClass} title={record.title}>
        {record.title}
      </strong>
      <p title={record.description}>{record.description}</p>
    </>
  );
};

RecordCardDetails.propTypes = {
  record: PropTypes.object.isRequired,
  labelId: PropTypes.string,
  deleted: PropTypes.bool
};

export default RecordCardDetails;
