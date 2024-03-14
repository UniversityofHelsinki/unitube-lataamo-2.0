import React from 'react';
import PropTypes from 'prop-types';
import './RecordCardAction.css';
import { Button } from 'react-bootstrap';

const RecordCardAction = ({ icon, label, onClick, showLabel = true, disabled = false }) => {

  const marginClass = (() => {
    if (showLabel) {
      return 'ms-1';
    }
    return '';
  })();

  return (
    <Button variant="link" onClick={onClick} className="record-card-action p-0 m-0" aria-label={label} disabled={disabled}>
      {icon}
      <span className={marginClass}>{showLabel && label}</span>
    </Button>
  );
};

RecordCardAction.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool
};

export default RecordCardAction;
