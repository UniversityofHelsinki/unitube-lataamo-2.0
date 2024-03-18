import React, { useId } from 'react';
import PropTypes from 'prop-types';
import './RecordActions.css';
import useRecordActions from '../../../hooks/record/useRecordCardActions';

const RecordActions = ({ record }) => {
  const actions = useRecordActions(record);
  return (<ul className="record-card-actions">
    {actions.map((Action, i) => 
      <li key={i}>
        <Action />
      </li>)}
    </ul>
  );
};

RecordActions.propTypes = {
  record: PropTypes.object,
};

export default RecordActions;
