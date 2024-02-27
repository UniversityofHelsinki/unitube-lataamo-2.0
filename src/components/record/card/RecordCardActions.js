import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordCardActions.css';
import useRecordCardActions from '../../../hooks/record/useRecordCardActions';

const RecordCardActions = ({ record }) => {
  const actions = useRecordCardActions(record);
  return (<ul className="record-card-actions">
    {actions.map((Action, i) => 
      <li key={i}>
        <Action />
      </li>)}
    </ul>
  );
};

RecordCardActions.propTypes = {
  record: PropTypes.object,
};

export default RecordCardActions;
