import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardDetails.css';

const RecordCardDetails = ({ record, labelId }) => {
  return (
    <ul className="no-padding record-card-details">
      <li>
        <strong id={labelId}>
          {record.title}
        </strong>
      </li>
      <li>{record.description}</li>
    </ul>
  );
};

RecordCardDetails.propTypes = {
  record: PropTypes.object.isRequired,
  labelId: PropTypes.string,
};

export default RecordCardDetails;
