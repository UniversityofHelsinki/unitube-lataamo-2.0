import React from 'react';
import PropTypes from 'prop-types';

const RecordCardDetails = ({ record }) => {
  return (
    <ul className="no-padding">
      <li>
        <strong>
          {record.name}
        </strong>
      </li>
      <li>{record.description}</li>
    </ul>
  );
};

RecordCardDetails.propTypes = {
  record: PropTypes.object.isRequired
};

export default RecordCardDetails;
